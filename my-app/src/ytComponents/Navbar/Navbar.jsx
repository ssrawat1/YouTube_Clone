import React from "react";
import "./Navbar.css";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import upload from "../../assets/upload.png";
import more from "../../assets/more.png";
import notification from "../../assets/notification.png";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
 
function Navbar({ setSidebar }) {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-left">
          <img
            className="menu-icon"
            onClick={() =>
              setSidebar((prev) => (prev === false ? true : false))}src={menu} alt=""/>
          <Link to="/"><img className="logo-icon" src={logo} alt="" /></Link>
        </div>
        <div className="nav-middle">
          <input className="input-box" type="text" placeholder="Search" />
          <img className="search-icon" src={search} alt="" />
        </div>
        <div className="nav-right">
          <img className="upload-icon" src={upload} alt="" />
          <img className="more-icon" src={more} alt="" />
          <img className="notification-icon" src={notification} alt="" />
          <img className="profile-icon" src={profile} alt="" />
        </div>
      </nav>
    </>
  );
}
export default Navbar;
