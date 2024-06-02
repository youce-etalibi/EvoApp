import { Fragment, useState, useEffect } from "react";
import './FormPassword.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const idAuth = localStorage.getItem('id_active');
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setErrors({ currentPassword: "", newPassword: "" });
        let hasErrors = false;

        if (!currentPassword) {
            setErrors(prev => ({ ...prev, currentPassword: 'Current password is required' }));
            hasErrors = true;
        }

        if (!newPassword) {
            setErrors(prev => ({ ...prev, newPassword: 'New password is required' }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        setIsLoading(true);

        try {
            const verifyResponse = await axios.post(`http://127.0.0.1:8000/api/verify-password`, {
                id: idAuth,
                current_password: currentPassword,
            });

            if (verifyResponse.status === 200) {
                const updateResponse = await axios.post(`http://127.0.0.1:8000/api/update-password/?id=${idAuth}`, {
                    new_password: newPassword,
                });

                if (updateResponse.data.message) {
                    toast.success('Password updated successfully!');
                    setCurrentPassword("");
                    setNewPassword("");
                    navigate('/home')
                }
            } else {
                setErrors(prev => ({ ...prev, currentPassword: 'Current password is incorrect' }));
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error('Error updating password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="parentFormPasswordProfile">
                <div className="headerPasswrodChange">
                    <Link to='/store/profile'>
                        <div className="ProfileEco">
                            <h3>Store Profile</h3>
                            <p>Go to Show your profile in store</p>
                            <img src="/assets/toolsPNGS/illustrator2.png" alt="Store Profile" />
                        </div>
                    </Link>
                    <Link to='/exercices/profile'>
                        <div className="ProfileEco">
                            <h3>Exercices Profile</h3>
                            <p>Go to Show your profile in exercices</p>
                            <img src="/assets/toolsPNGS/illustrator1.png" alt="Exercices Profile" />
                        </div>
                    </Link>
                </div>
                <div className="formChangePassword">
                    <h3>Change Your Password</h3>
                    <form onSubmit={handlePasswordChange}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="currentPassword">Current Password</label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            value={currentPassword}
                                            onChange={(e) => {
                                                setCurrentPassword(e.target.value);
                                                setErrors(prev => ({ ...prev, currentPassword: "" }));
                                            }}
                                            required
                                        />
                                        {errors.currentPassword && <p className="error"><i className='bx bxs-error'></i> {errors.currentPassword}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="newPassword">New Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setErrors(prev => ({ ...prev, newPassword: "" }));
                                            }}
                                            required
                                        />
                                        {errors.newPassword && <p className="error"><i className='bx bxs-error'></i> {errors.newPassword}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button type="submit" disabled={isLoading}>
                                            {isLoading ? 'Updating...' : 'Change Password'}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
