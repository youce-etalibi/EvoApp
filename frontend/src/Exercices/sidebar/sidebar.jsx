import { Fragment } from "react";
import './sidebar.css'
import { Link, useLocation } from "react-router-dom";

export default function Sidebar(){

    const location = useLocation();

    return (
        <Fragment>
            <div className="parentSideBarExercices">
                <ul>
                    <li>
                        <Link to='/exercices/overview' className="Link">
                            <button id={location.pathname == '/exercices/overview' ? "btnSideBarActive" : null}>
                                <span>
                                <i className='bx bxs-category-alt' ></i> <span>Overview</span>
                                </span>
                            <i className='bx bx-right-arrow-alt' id="arrowSideBarExercices"></i>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/exercices/profile' className="Link">
                            <button id={location.pathname == '/exercices/profile' ? "btnSideBarActive" : null}>
                                <span>
                                <i className='bx bxs-user-detail'></i> <span>Profile</span>
                                </span>
                            <i className='bx bx-right-arrow-alt' id="arrowSideBarExercices"></i>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/exercices/list' className="Link">
                            <button id={location.pathname == '/exercices/list' ? "btnSideBarActive" : null}>
                                <span>
                                <i className='bx bx-dumbbell'></i> <span>Exercices</span>
                                </span>
                                <i className='bx bx-right-arrow-alt' id="arrowSideBarExercices"></i>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/exercices/my-workouts' className="Link">
                            <button id={location.pathname == '/exercices/my-workouts' ? "btnSideBarActive" : null}>
                                <span>
                                    <i className='bx bxs-timer'></i> <span>My workouts</span>
                                </span>
                                <i className='bx bx-right-arrow-alt' id="arrowSideBarExercices"></i>
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}