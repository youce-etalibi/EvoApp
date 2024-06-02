import { Fragment, useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import './exercices.css';
import Notification from "./navbar/Notification/notification";
    
export default function Exercices(){

    const location = useLocation();
    const [path, setPath] = useState('');


    useEffect(() => {
        if (location.pathname === '/exercices/overview') {
            setPath('overview');
        } else if (location.pathname === '/exercices/profile') {
            setPath('profile'); 
        } else if (location.pathname === '/exercices/list') {
            setPath('list exercices'); 
        } else if (location.pathname === '/exercices/my-workouts') {
            setPath('my workouts'); 
        }
    }, [location.pathname]);


    return(
        <Fragment>
            <Navbar /> 
            {/* <Notification /> */}
            <div className="parentTitleExercicesChemin">
                <h1>Exercices</h1>
                <p><span> exercices / </span> {path}</p>
            </div>
            <div className="parentContentExercices">
                <Sidebar />
                <Outlet />
            </div>
        </Fragment>
    )
}