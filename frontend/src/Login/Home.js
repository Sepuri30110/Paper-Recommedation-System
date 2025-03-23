import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.jpg'

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #4A148C, #303F9F, #212121)",
    color: "#E0E0E0",
    padding: "1rem",
  },
  header: {
    width: "100%",
    background: "linear-gradient(to right, #1976D2, #7B1FA2)",
    color: "white",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    borderBottom: "1px solid #555",
  },
  logo: {
    height: "3rem",
    borderRadius: "50%",
    boxShadow: "0px 2px 6px rgba(255, 255, 255, 0.4)",
    border: "2px solid white",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    textTransform: "uppercase",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    marginTop: "2.5rem",
    width: "100%",
    padding: "1rem",
  },
  contentBox: {
    width: "100%",
    maxWidth: "48rem",
    background: "linear-gradient(to right, #424242, #616161)",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    marginBottom: "1.5rem",
    border: "1px solid #555",
    transition: "transform 0.3s ease-in-out",
  },
  contentTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  },
  contentText: {
    color: "#BDBDBD",
    fontSize: "1rem",
    textAlign: "center",
    fontStyle: "italic",
  },
  list: {
    marginTop: "1.5rem",
    color: "#E0E0E0",
    fontSize: "1rem",
    listStyleType: "none",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 2rem",
    borderRadius: "9999px",
    fontWeight: "bold",
    color: "white",
    border: "2px solid white",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out, background 0.3s ease",
  },
  loginButton: {
    background: "linear-gradient(to right, #1E88E5, #3949AB)",
  },
  signUpButton: {
    background: "linear-gradient(to right, #43A047, #00897B)",
  },
  footer: {
    width: "100%",
    background: "linear-gradient(to right, #424242, #212121)",
    color: "#BDBDBD",
    textAlign: "center",
    padding: "1rem",
    marginTop: "2.5rem",
    borderTop: "1px solid #555",
  },
};

const HomePage = () => {

  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Paper Recommendation System</h1>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Content Section */}
        <div style={styles.contentBox}>
          <h2 style={styles.contentTitle}>Discover the Best Research Papers</h2>
          <p style={styles.contentText}>
            Unlock a world of knowledge with personalized research paper recommendations. Stay informed, stay inspired, and take your academic journey to the next level!
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}><span>✔</span> Get AI-powered paper recommendations.</li>
            <li style={styles.listItem}><span>✔</span> Stay updated with the latest research in your field.</li>
            <li style={styles.listItem}><span>✔</span> Save and organize papers for future reference.</li>
            <li style={styles.listItem}><span>✔</span> Connect with a community of researchers.</li>
          </ul>
        </div>

        {/* Login and Sign Up Buttons */}
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.loginButton }} onClick={() => navigate('/login')}>Login</button>
          <button style={{ ...styles.button, ...styles.signUpButton }} onClick={() => navigate('/signUp')}>Sign Up</button>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Paper Recommendation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
