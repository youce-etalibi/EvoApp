import { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();

  return (
    <Fragment>
      <div className="parentNavbar">
        <div className="leftNavbar">
          <Link to='/'>
            <span>
              <img src="/assets/logos/logoRM.png" alt="Evolution" title="Evolution"/>
            </span>
          </Link>
        </div>
        <div className="RightNavbar">
          <ul className="parentULnavbar">
            {location.pathname !== '/auth/signup' && (
              <li>
                <Link to='/auth/signup'>
                  <button className="btnSignup">Sign up</button>
                </Link>
              </li>
            )}
            {location.pathname !== '/auth/login' && (
              <li>
                <Link to='/auth/login'>
                  <button className="btnLogin">Log in</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Outlet/>
    </Fragment>
  );
}
