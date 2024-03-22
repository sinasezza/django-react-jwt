import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";
import { useNavigate } from 'react-router-dom';


const AuthContextProvider = ({ children }) => {
  let [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);

  const navigate = useNavigate();


  let loginUser = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
  
    let response = await fetch("http://localhost:8000/api/token/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
  
    let data = await response.json();

    if(response.status === 200) {
      setAuthToken(data.access);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      alert('something went wrong ...');
    }  
  }
  


  let contextData = {
    user: user,
    loginUser: loginUser,
  };


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
