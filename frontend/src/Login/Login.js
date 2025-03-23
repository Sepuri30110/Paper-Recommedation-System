import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.jpg'
import { errorToast, successToast, warningToast } from '../helpers/toast'
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const [errors, setErrors] = useState("");

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      // setErrors("Please enter both username and password.");
      errorToast("Please enter both username and password.")
      return;
    }
    try {
      await axios.post('http://localhost:3005/login', { formData })
        .then(res => {
          successToast("Signup successful!");
          console.log(res.data)
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("name", formData.username)
          navigate("/user")
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

  return (
    <div style={styles.page}>
      {/* Full-Width Gradient Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        <h1 style={styles.title}>Paper Recommendation System</h1>
      </header>

      {/* Centered Login Form */}
      <div style={styles.container}>
        <h1>Login</h1>
        {/* {errors && <p style={styles.error}>{errors}</p>} */}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
        <p style={{ margin: '1.5vw 0 0 0', display: 'flex', justifyContent: 'end' }}>Don't have an account.<u style={{ cursor: 'pointer', color: '#00F' }} onClick={handleSignup}>SignUp</u></p>
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
    position: "absolute",
    top: "0",
    left: "0",
  },
  logoContainer: {
    position: "absolute",
    left: "2vw",
    display: "flex",
    alignItems: "center",
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
  },
  container: {
    width: "30vw",
    // minWidth: "280px",
    // maxWidth: "400px",
    padding: "2vw",
    textAlign: "center",
    background: "white",
    borderRadius: "1vw",
    boxShadow: "0vw 0vw 0.8vw rgba(0,0,0,0.1)",
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
  button: {
    width: "50%",
    padding: "0.5vw",
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
  error: {
    color: "red",
    fontSize: "2vw",
  },
};

export default LoginForm;
