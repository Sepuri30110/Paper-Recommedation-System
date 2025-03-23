import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.jpg'
import { errorToast, successToast, warningToast } from '../helpers/toast'
import axios from 'axios'

const SignupForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "mobile")
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.name === "mobile" && e.target.value.length > 10)
      e.target.value = e.target.value.substring(0, 10);
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      errorToast("Invalid Mobile No.")
      return;
    } else if (formData.password !== formData.confirmPassword) {
      errorToast("Passwords do not match!")
      return;
    }
    console.log("Form Submitted", formData);
    try {
      await axios.post('http://localhost:3005/signup', { formData })
        .then(res => {
          successToast("Signup successful!");
          navigate("/login")
        })
        .catch(err => {
          console.log(err)
          errorToast(err.response.data)
        })
    } catch (err) {
      console.log(err)
      errorToast("Error")
    }
  };

  useEffect(() => {
    try {
      function fetchData() {
        localStorage.clear()
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <div style={styles.page}>
      {/* Full-Width Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <h1 style={styles.title}>Paper Recommendation System</h1>
      </header>

      <div style={styles.container}>
        <h1 style={{ margin: "1vw 0" }}>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="mobile" style={styles.label}>
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
        <p style={{ margin: '1.5vw 0 0 0', display: 'flex', justifyContent: 'end' }}>Already have an account.<u style={{ cursor: 'pointer', color: '#00F' }} onClick={handleLogin}>Login</u></p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f4",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    height: "6vw",
    background: "linear-gradient(to bottom, #0056b3, #0099ff)", // Stronger gradient
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
    // marginBottom:'2vw'
  },
  logoContainer: {
    marginLeft: '2vw'
  },
  logo: {
    width: "4vw",
    height: "4vw",
    maxWidth: "40px",
    maxHeight: "40px",
  },
  title: {
    fontSize: "2vw",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    margin: '0 auto'
  },
  container: {
    width: "30vw",
    padding: "2vw",
    textAlign: "center",
    background: "white",
    borderRadius: "1vw",
    boxShadow: "0vw 0vw 0.8vw rgba(0,0,0,0.1)",
    margin: '2vw 0'
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1vw",
    textAlign: "left",
  },
  label: {
    fontSize: "1.5vw",
    fontStyle: 'italic',
    marginBottom: "0.5vw",
  },
  input: {
    fontSize: "1.5vw",
    fontStyle: 'italic',
    padding: "0.5vw",
    border: "1px solid #ccc",
    borderRadius: "0.5vw",
    marginBottom: "0.5vw",
  },
  error: {
    color: "red",
    fontSize: "2vw",
  },
  button: {
    width: "50%",
    padding: "0.75vw 0.5vw",
    fontSize: "1.5vw",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "0.8vw",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "1vh",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default SignupForm;
