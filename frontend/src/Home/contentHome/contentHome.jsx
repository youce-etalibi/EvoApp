import { Fragment, useContext, useEffect, useState } from "react";
import "./contentHome.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function ContentHome() {
  const { user_db } = useContext(AuthContext); // Assuming you're using user_db from AuthContext

  const idAuth = localStorage.getItem("id_active");

  const [caloriesUser, setcaloriesUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${idAuth}`);
        setcaloriesUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idAuth]); 

  console.log(caloriesUser)

  return (
    <Fragment>
      <div className="parentContentHome">
        <div className="leftContent">
          <div className="textContentHome">
            <h1>
              Welcome, {user_db.name ? user_db.name : ""}{" "}
              <img src="/assets/references/handHi.png" className="handHi" alt="Hi" />
            </h1>
            <p>
              Evolution is a fitness website with a passion for helping people
              achieve their health and wellness goals. You can provide workout
              routines, nutrition tips, and exercise techniques.
            </p>
          </div>
          <div className="parentLinksHome">
            <Link to='/exercices/overview'>
              <div className="LinkHome1">
                <span>
                  <h2>
                    <i className="bx bx-dumbbell"></i> Exercices
                  </h2>
                </span>
                <p>
                  Click to see more <i className="bx bx-right-arrow-alt"></i>
                </p>
              </div>
            </Link>
            <Link to={caloriesUser ? '/CaloriesCalculator/Home' : '/CaloriesCalculator'}>
              <div className="LinkHome2">
                <span>
                  <h2>
                    <i className="bx bx-dumbbell"></i> Calories
                  </h2>
                </span>
                <p>
                  Click to see more <i className="bx bx-right-arrow-alt"></i>
                </p>
              </div>
            </Link>
            <Link to='/store' className="LinkHome3">
              <span>
                <h2>
                  <i className="bx bx-dumbbell"></i> Store
                </h2>
              </span>
              <p>
                Click to see more <i className="bx bx-right-arrow-alt"></i>
              </p>
            </Link>
          </div>
        </div>
        <div className="rightParent">
          <img src="/assets/homePages/man.png"  id="imgPersonHome"/>
        </div>
      </div>
    </Fragment>
  );
}
