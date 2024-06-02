import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./headerHome.css";
import Profile from "../../Components/Profile/Profile";

export default function HeaderHome() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user_db, setuserisauth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileButtonClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

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
      <div className="parentNavbar">
        <div className="leftNavbar">
          <Link to="/">
            <span>
              <img
                src="/assets/logos/logoRM.png"
                alt="Evolution"
                title="Evolution"
              />
            </span>
          </Link>
        </div>
        <div className="parentCircleHome">
          <div className="circleHome"></div>
        </div>
        <div className="RightNavbar">
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
        </div>
      </div>
    </Fragment>
  );
}
