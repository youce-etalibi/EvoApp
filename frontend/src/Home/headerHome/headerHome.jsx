import { Fragment } from "react";
import { Link } from "react-router-dom";
import './headerHome.css'

export default function HeaderHome() {
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
                <button className="profileHome">
                  <img
                    src=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/references/profile.png";
                    }}
                    className="imgProfileHeader"
                    alt="Profile"
                  />
                  <span>
                    Username 
                  </span>
                </button>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
