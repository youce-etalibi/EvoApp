import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./dataProfile.css";
import { Link } from "react-router-dom";

export default function DataProfile() {

  const idAuth = localStorage.getItem('id_active');

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [weightTracking, setWeightTracking] = useState(null);
  const [goal, setGoal] = useState(null);


  console.log(user)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/weight-tracking/?id=${idAuth}`)
      .then(response => {
        setUser(response.data.user);
        setUserInfo(response.data.user_info);
        setWeightTracking(response.data.weightTracking);
        setGoal(response.data.goal);
      })
      .catch(error => {
        console.error("There was an error fetching the user's weight data!", error);
      });
  }, []);

  if (!user) {
    return <div>
      <span class="loaderProfile"></span>
      <span class="loaderProfile"></span>
    </div>;
  }

  return (
    <Fragment>
      <div className="parentDataProfile">
        <div className="dataProfile">
          <div className="headerDataProfile">
            <div>
              <img src={`http://localhost:8000/api/profile-image/?id=${idAuth}`} alt="Profile"  />
              <div className="namesProfile">
                <h5>{user.lastName} {user.firstName}</h5>
                <p>{user.firstName}</p>
              </div>
            </div>
            <div>
                <Link to='/settings'>
                    <button>
                        <i className='bx bxs-cog'></i>
                    </button>
                </Link>
            </div>
          </div>
          <div className="bodyDataProfile">
            <ul>
                <li>
                    <span>Fullname</span>
                    <span>{user.lastName} {user.firstName}</span>
                </li>
                <li>
                    <span>Weight</span>
                    <span>{userInfo.weight}Kg</span>
                </li>
                <li>
                    <span>Height</span>
                    <span>{userInfo.height}cm</span>
                </li>
                <li>
                    <span>Fat</span>
                    <span>{userInfo.fat}%</span>
                </li>
            </ul>
          </div>
        </div>
        <div className="SendEmailForTeam">
            <h4>Subscribe to our Newsletter</h4>
            <p>Subscribe to our Newsletter for the latest updates</p>
            <div className="parentInputParent">
                <i className='bx bx-envelope'></i>
                <input type="text" placeholder="Email Address"/>
            </div>
            <div className="parentbtnSubscribe">
              <button>Subscribe<i className='bx bxl-telegram'></i></button>
            </div>
        </div>
      </div>
    </Fragment>
  );
}
