import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
              <Link to="/overview" className="Link">
                <button
                  className={
                    location.pathname == "overview"
                      ? "btnNavbarExercicesOverview"
                      : "btnNavbarExercices"
                  }
                >
                  <i className="bx bxs-binoculars"></i> <span>Overview</span>
                </button>
              </Link>
            </li>
            <li>
              <div className="parentSearchBarExercices">
                <i className="bx bx-search-alt"></i>
                <input type="text" />
              </div>
            </li>
            <li>
              <button className="btnNotification">
                <i className="bx bxs-bell"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="parentNavbarMenu">
        <div className="leftMenuExercices">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <i className="bx bx-x" id={menuOpen ? "closeBtnWhite" : null}></i>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </button>
          {menuOpen && (
            <div className="menuLinks">
              <ul>
                <li>
                  <Link to="/overview" className="Link" onClick={toggleMenu}>
                    <button
                      className={
                        location.pathname == "overview"
                          ? "btnNavbarExercicesOverview"
                          : "btnNavbarExercices"
                      }
                    >
                      <i className="bx bxs-binoculars"></i>{" "}
                      <span>Overview</span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="centerMenu">
          <Link to="/home">
            <span>
              <img
                src="/assets/logos/logoRM.png"
                alt="Evolution"
                title="Evolution"
                id={menuOpen ? "imgBrand" : null}
              />
            </span>
          </Link>
        </div>
        <div className="rightMenuExercices">
          <button className="btnNotification" id={menuOpen ? "notificationMenuExercices" : null}>
            <i className="bx bxs-bell"></i>
          </button>
        </div>
      </div>
        <div className="parentSerachBarMenu" style={{display: window.innerWidth <= 820 ? 'block' : 'none'}}>
          <div className="parentFormSearchBarMenu">
            <input type="text" placeholder="Search Something"/>
            <button><i className='bx bx-search-alt'></i></button>
          </div>
        </div>
    </Fragment>
  );
}
