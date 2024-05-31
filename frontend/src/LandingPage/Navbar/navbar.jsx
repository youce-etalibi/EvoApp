import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
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
                        <li>
                            <Link to='/auth/signup'>
                                <button className="btnSignup">Sign up</button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/auth/login'>
                                <button className="btnLogin">Log in</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
