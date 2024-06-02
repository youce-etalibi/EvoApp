import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import './formInfo.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormInfo(){

    const idAuth = localStorage.getItem('id_active');
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        birthday: "",
        gender: "",
        weight: "",
        height: "",
        goal: "",
        activity: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get-user-info/?id=${idAuth}`);
                const user = response.data.user;
                const caloriesUser = response.data.caloriesUser;
    
                // Check if caloriesUser exists
                if (caloriesUser) {
                    setUserData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        name: user.name,
                        email: user.email,
                        birthday: caloriesUser.birthday,
                        gender: user.gendre,
                        weight: caloriesUser.weight,
                        height: caloriesUser.height,
                        goal: caloriesUser.goal_id,
                        activity: caloriesUser.activity_id
                    });
                } else {
                    // If caloriesUser does not exist, set default values
                    setUserData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        name: user.name,
                        email: user.email,
                        birthday: "", 
                        gender: user.gendre,
                        weight: "", 
                        height: "",
                        goal: "", 
                        activity: "" 
                    });
                }
            } catch (error) {
                console.error("Error fetching user information:", error);
            }
        };
        fetchUserData();
    }, [idAuth]);
    

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/update-user-info`, {
                id: idAuth,
                firstName: userData.firstName,
                lastName: userData.lastName,
                name: userData.name,
                email: userData.email,
                birthday: userData.birthday,
                gendre: userData.gender,
                weight: userData.weight,
                height: userData.height,
                goal_id: userData.goal,
                activity_id: userData.activity
            });
            toast.success('Profile updated successfully!');
            navigate('/home')
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Fragment>
            <div className="parentFormInfoProfile">
                <h3>Change les informations</h3>
                <table id="TableParentFormInfoProfile">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="">First name *</label>
                                <input type="text" name="firstName" placeholder="First name" value={userData.firstName} onChange={handleChange}/>
                            </td>
                            <td>
                                <label htmlFor="">Last name *</label>
                                <input type="text" name="lastName" placeholder="Last name" value={userData.lastName} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Username *</label>
                                <input type="text" name="name" placeholder="Username" value={userData.name} onChange={handleChange}/>
                            </td>
                            <td>
                                <label htmlFor="">Email *</label>
                                <input type="text" name="email" placeholder="Email" value={userData.email} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Birthday *</label>
                                <input type="date" name="birthday" placeholder="Birthday" value={userData.birthday} onChange={handleChange}/>
                            </td>
                            <td>
                                <label htmlFor="">Gender *</label>
                                <select name="gender" value={userData.gender} onChange={handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Weight *</label>
                                <input type="number" name="weight" placeholder="Weight" value={userData.weight} onChange={handleChange}/>
                            </td>
                            <td>
                                <label htmlFor="">Height *</label>
                                <input type="text" name="height" placeholder="Height" value={userData.height} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="">Goal *</label>
                                <select name="goal" value={userData.goal} onChange={handleChange}>
                                    <option value="1">Losing weight</option>
                                    <option value="2">Maintaining weight</option>
                                    <option value="3">Gaining weight</option>
                                    <option value="4">Build muscle</option>
                                </select>
                            </td>
                            <td>
                                <label htmlFor="">Activity *</label>
                                <select name="activity" value={userData.activity} onChange={handleChange}>
                                    <option value="1">Sedentary</option>
                                    <option value="2">Lightly active</option>
                                    <option value="3">Moderately active</option>
                                    <option value="4">Very active</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button id="btnSaveChanges" onClick={handleSaveChanges}><i className='bx bx-save' ></i> Save Changes</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
