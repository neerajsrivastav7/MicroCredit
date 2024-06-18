// Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "./SideBar.css"

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-light  fixed-top NavBarCss">
        <div className="container d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-dark" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png" 
            alt="Man Icon"
            className="img-fluid"
            style={{ height: "40px", borderRadius: "50%", cursor: "pointer" }}
            onClick={toggleSidebar}
          />
        </div>
      </nav>
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
