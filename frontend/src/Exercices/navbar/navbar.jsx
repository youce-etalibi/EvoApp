import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user_db, setuserisauth } = useContext(AuthContext);
  const navigate = useNavigate();

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



  return (
    <Fragment>
      <div className="parentNavbar" id="parentNavbarExercices">
        <div className="leftNavbar">
          <Link to="/home">
            <span>
              <img
                src="/assets/logos/logoRM.png"
                alt="Evolution"
                title="Evolution"
                id="imgBrand"
              />
            </span>
          </Link>
        </div>
        <div className="RightNavbar">
          <ul className="parentULnavbar">
            <li>
            <ul className="parentULnavbar">
            <li>
              <button
                className={`profileHome ${isProfileMenuOpen ? "profileHome profileHomeActive" : ""}`}
                onClick={handleProfileButtonClick}
              >
                <img
                  src={`http://localhost:8000/api/profile-image/?id=1`}
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
                    <button onClick={handleLogout}><i className='bx bx-log-out'></i> Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
