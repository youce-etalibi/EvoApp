import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { MenuContext } from "../../Context/MenuContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { GoGoal } from "react-icons/go";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <Link to="/CaloriesCalculator/change-goal" style={{textDecoration:'none'}}><li><GoGoal style={{color:'black',marginRight:"10px",textDecoration:"none"}} />Goal</li></Link>
        <li><FaUserCircle style={{color:"black",marginRight:"10px" ,marginTop:"0"}} />Profile</li>
      </ul>
    </div>
  );
};

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user_db, setuserisauth } = useContext(AuthContext);


  const isAuth = localStorage.getItem('id_active');


  const handleProfileButtonClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };



  const handleLogout = async () => {
    try {
      axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id_active");

      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [userMenuActive, setUserMenuActive] = useState(false);
  const { isactive, setisactive } = useContext(MenuContext);
  const userMenuRef = useRef(null);

  const handleMenu = () => {
    setisactive(!isactive);
  };

  const handleUserClick = () => {
    setUserMenuActive(!userMenuActive);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Calories-navbar">
      <div className="leftCalories-navbar">
        <div>
          <i className="bx bx-menu-alt-left" onClick={handleMenu}></i>
        </div>
        <div className="storelogo">
          <Link to="/Home">
            <img src="/Evolution.png" alt="Evolution" title="Evolution" />
          </Link>
        </div>
      </div>
      <ul className="parentULnavbar">
            <li>
              <button
                className={`profileHome ${isProfileMenuOpen ? "profileHome profileHomeActive" : ""}`}
                onClick={handleProfileButtonClick}
              >
                <img
                  src={`http://localhost:8000/api/profile-image/?id=${isAuth}`}
                  className="imgProfileHeader"
                  alt="Profile"
                />
                <h4>{user_db.name ? user_db.name : ""} <i className='bx bx-down-arrow'></i></h4>
              </button>
              {isProfileMenuOpen && (
                <ul className="ULprofileHome">
                  <li>
                    <Link to='/settings'>
                      <button><i className='bx bx-cog'></i> Settings</button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/CaloriesCalculator/change-goal'>
                      <button><i className='bx bx-cog'></i> Change goal</button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}><i className='bx bx-log-out'></i> Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
    </div>
  );
}
