import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'
import HeaderHome from "./headerHome/headerHome";
import ContentHome from "./contentHome/contentHome";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home(){

    // State to store user data
    const [user, setUser] = useState(null);
    const [toastShown, setToastShown] = useState(false); // State to track whether the toast has been shown

    // Retrieve the id_active from localStorage
    const idAuth = localStorage.getItem('id_active');

    // Fetch user data from the API when the component mounts or idAuth changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getuser/?id=${idAuth}`);
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [idAuth]); 

    // useEffect(() => {
    //     // Check if any of the required fields are missing or set to default values
    //     if (user && (!user.firstName || !user.lastName || !user.gender || user.profile === 'profile.png')) {
    //         // Generate the toast message with placeholders for missing information
    //         const firstNameText = user.firstName ? "" : "firstname";
    //         const lastNameText = user.lastName ? "" : "lastname";
    //         const genderText = user.gender ? "" : "gender";
    //         const profileText = user.profile === 'profile.png' ? "" : "photo";
            
    //         // Show toast message with link only if toast has not been shown before
    //         if (!toastShown) {
    //             toast.info(
    //                 `Go to Settings to update your profile: ${firstNameText}, ${lastNameText}, ${genderText}, ${profileText}`, 
    //                 {
    //                     autoClose: 3000,
    //                     position: "top-center",
    //                     className: 'blue-toast'
    //                 }
    //             );
    //             setToastShown(true); 
    //         }
    //     }
    // }, [user, toastShown]); 

    return (
        <Fragment>
            <HeaderHome />
            <ContentHome />
            <ToastContainer />
        </Fragment>
    )
}
