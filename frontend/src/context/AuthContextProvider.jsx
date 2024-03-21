import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(null);
  let [user, setUser] = useState(null);


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
      // setUser(data.username);
    } else {
      alert('something went wrong ...');
    }
  
    console.log(`data is`, data);
  }
  

  let contextData = {
    loginUser: loginUser,
  };


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
