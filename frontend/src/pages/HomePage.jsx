import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";


const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch('http://localhost:8000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      },
    });

    const data = await response.json();
    
    if(response.status === 200) {
      setNotes(data);
    } else if(response.statusText === 'Unauthorized') {
      logoutUser();
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Home Page</h1>
      <ul className="list-disc list-inside">
        {notes.map(note => (
          <li key={note.id} className="mb-2">{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
