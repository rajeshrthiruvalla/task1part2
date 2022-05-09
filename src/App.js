import React, { useState } from 'react';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from './useToken';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
 const { token, setToken } = useToken();
 const pathname = window.location.pathname;
 if(!pathname.includes('register'))
 {
      if(!token) {
    return <Login setToken={setToken} />
  }
 }
  return (
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
