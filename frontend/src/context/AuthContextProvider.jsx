import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";
import { useNavigate } from 'react-router-dom';


const AuthContextProvider = ({ children }) => {
  let [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
  let [loading, setLoading] = useState(true)

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
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      alert('something went wrong ...');
    }  
  }
  
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login/');
  }

  let updateToken = async () => {
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'refresh': authTokens?.refresh})
    });
  
    let data = await response.json();

    if(response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      logoutUser();
    }  

    if(loading) {
      setLoading(false);
    }
  }


  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if(loading) {
      updateToken();
    }

    let interval = setInterval(() => {
      if(authTokens) {
        updateToken();
      }
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
