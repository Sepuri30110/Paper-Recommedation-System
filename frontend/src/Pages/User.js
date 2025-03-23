import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { errorToast, successToast, warningToast } from '../helpers/toast'

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  headerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
  },
  headerFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#1f2937',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1f2937',
  },
  profileIcon: {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  main: {
    maxWidth: '80%',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '2rem',
  },
  searchInputContainer: {
    position: 'relative',
    flex: 1,
  },
  searchInput: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    outline: 'none',
    width: '100%'
  },
  dropdown: {
    position: 'relative',
    minWidth: '15%',

  },
  dropdownButton: {
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
  },
  dropdownPanel: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '150%',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    marginTop: '0.25rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    maxHeight: '1000%', // Set the max height for the dropdown
    overflowY: 'auto', // Enable vertical scrolling when content exceeds maxHeight
  },
  checkboxItem: {
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backgroundColor: 'transparent',
  },
  checkboxItemHover: {
    backgroundColor: '#f3f4f6',
  },
  paperList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  paperItem: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  paperTitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '0.25rem',
  },
  paperId: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  paperAbstract: {
    color: '#4b5563',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '500px',
    maxWidth: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '1.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
}

// Static data for papers

function User() {
  const [papers, setPapers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [selectedPaper, setSelectedPaper] = useState(null);


  const navigate = useNavigate()

  const [filters, setFilters] = useState([])

  useEffect(() => {
    try {
      async function fetchData() {
        await axios.get('http://localhost:3005/user/getFilters')
          .then(res => {
            const keys = res.data.map(obj => Object.keys(obj)[0]);
            const uniqueKeys = [...new Set(keys)]; // Remove duplicates
            setFilters(uniqueKeys);
          })
          .catch(err => {
            console.log(err)
            errorToast("Error")
          })
      }
      fetchData()
    } catch (err) {
      console.log(err)
      errorToast("Error")
    }
  }, [])

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
    console.log(selectedFilters)
  }

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    const target = event.target
    if (!target.closest('[data-dropdown]')) {
      setIsDropdownOpen(false)
    }
  }

  // Add click outside listener
  useState(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = localStorage.getItem("name")
    await axios.post("http://localhost:3005/user/recommend", { name, query: searchTerm })
      .then(res => {
        console.log(res.data)
        setPapers(res.data.recommendation)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const PaperModal = ({ paper, onClose }) => {
    if (!paper) return null;

    return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
          <h2>{paper.title}</h2>
          <div>ID: {paper.id}</div>
          <p>{paper.abstract}</p>
          <p>
            DOI: <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">{paper.doi}</a>
          </p>
          
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerFlex}>
            <div style={styles.logoContainer}>
              <div style={styles.logo}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 style={styles.title}>Paper Recommendation System</h1>
            </div>
            <div style={styles.profileIcon} onClick={() => { navigate('/profile') }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.searchContainer}>
          <div style={styles.searchInputContainer}>
            <form id='form' onSubmit={handleSubmit}>
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* <div style={styles.dropdown} data-dropdown>
            <button
              style={styles.dropdownButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedFilters.length === 0 ? 'Select filters' : `${selectedFilters.length} selected`}
            </button>
            {isDropdownOpen && (
              <div style={styles.dropdownPanel}>
                {filters.map((filter) => (
                  <label
                    key={filter}
                    style={{
                      ...styles.checkboxItem,
                      ...(hoveredItem === filter ? styles.checkboxItemHover : {})
                    }}
                    onMouseEnter={() => setHoveredItem(filter)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => toggleFilter(filter)}
                    />
                    {filter}
                  </label>
                ))}
              </div>
            )}
          </div> */}
        </div>

        <div style={styles.paperList}>
          {papers.map(paper => (
            <div
              key={paper.id}
              style={styles.paperItem}
              onClick={() => setSelectedPaper(paper)}
            >
              <h2 style={styles.paperTitle}>{paper.title}</h2>
              <div style={styles.paperId}>ID: {paper.id}</div>
              <p style={styles.paperAbstract}>{paper.abstract}</p>
            </div>
          ))}
        </div>
      </main>
      <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </div>
  )
}

export default User