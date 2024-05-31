import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./dataProfile.css";
import { Link } from "react-router-dom";

export default function DataProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/1')
      .then(response => {
        setUser(response.data[0]);
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
              <img src={user.profile} alt="Profile" onError={(e) => e.target.src = '/assets/references/profile.png'} />
              <div className="namesProfile">
                <h5>{user.fullname}</h5>
                <p>{user.fullname}</p>
              </div>
            </div>
            <div>
                <Link to='/'>
                    <button>
                        <i className='bx bxs-cog'></i>
                    </button>
                </Link>
            </div>
          </div>
          <div className="bodyDataProfile">
            <ul>
                <li>
                    <span>Name</span>
                    <span>{user.fullname}</span>
                </li>
                <li>
                    <span>Weight</span>
                    <span>{user.weight}Kg</span>
                </li>
                <li>
                    <span>Height</span>
                    <span>{user.height}cm</span>
                </li>
                <li>
                    <span>Fat</span>
                    <span>{user.fat}%</span>
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
