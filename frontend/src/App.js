import React from 'react'

import { Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import Login from './Login/Login'
import Signup from './Login/SignUp';
import Home from './Login/Home';

import PrivateRoute from './routes/PrivateRoute';

import User from './Pages/User';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute/>}>
          <Route exact path="/user" element={<User/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
