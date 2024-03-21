import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let {name} = useContext(AuthContext);
  
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            to="/"
            className="text-white hover:text-gray-300 mr-4 font-semibold"
          >
            Home
          </Link>
          
          <Link
            to="/login/"
            className="text-white hover:text-gray-300 font-semibold"
          >
            Login
          </Link>
        </div>
        
        <div>
          <span className="text-white text-xl underline underline-offset-4">hello {name}</span>
        </div>
        
        <div>
          <Link
            to="/about/"
            className="text-white hover:text-gray-300 mr-4 font-semibold"
          >
            About
          </Link>
          <Link
            to="/contact/"
            className="text-white hover:text-gray-300 font-semibold"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
