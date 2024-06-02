import axios from "axios";
import { Fragment, useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './settingsProfile.css';
import FormInfo from "./FormInfo/formInfo";
import FormPassword from "./FormPassword/FormPassword";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SettingsProfile() {
    const idAuth = localStorage.getItem('id_active');
    const { user_db, setuserisauth } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [imageSrc, setImageSrc] = useState(`http://localhost:8000/api/profile-image/?id=${idAuth}&${Date.now()}`);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getuser/?id=${idAuth}`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [idAuth]);

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("id_active");
            localStorage.removeItem("seller_id");
            localStorage.removeItem("isSeller");
            navigate("/auth/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleFileUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        setIsLoading(true);

        try {
            await axios.post(`http://127.0.0.1:8000/api/update-profile-image/?id=${idAuth}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Successfully uploaded!');
            setImageSrc(`http://localhost:8000/api/profile-image/?id=${idAuth}&${Date.now()}`);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };


    const handleRemoveImage = async () => {
        setIsLoading(true);

        try {
            await axios.post(`http://127.0.0.1:8000/api/remove-image/?id=${idAuth}`);
            toast.success('Profile image reset to default!');
            setImageSrc(`http://localhost:8000/api/profile-image/?id=${idAuth}&${Date.now()}`);
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="parentSettingsProfile">
                <div className="NavbarSettingsBar">
                    <Link to='/home'>
                        <div className="brandLogo">
                            <img src="/Evolution.png" alt="Logo" />
                        </div>
                    </Link>
                    <div className="buttonLoginSettings" onClick={handleLogout}>
                        <button><i className='bx bx-log-out' ></i> Logout </button>
                    </div>
                </div>
                <div className="headerSettingsProfile">
                    <h1><Link to='/home'><i className='bx bx-left-arrow-alt' ></i></Link> Settings</h1>
                    <p>home / settings</p>
                </div>
                <div className="parentFormProfileSettings">
                    <div className="headerFormSettings">
                        <div>
                            <span>
                                <div>
                                    <img src={imageSrc} id="imgProfile" alt="Profile" />
                                    <button id="buttonProfileChange" onClick={handleUploadButtonClick}><i className='bx bxs-camera-plus' ></i></button>
                                </div>
                            </span>
                            <span id="parentButtonsProfileChangePoto">
                                <input
                                    type="file"
                                    id="btnUploadInput"
                                    name="image"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    style={{ display: "none" }}
                                />
                                <button id="btnUpload" onClick={handleUploadButtonClick}><i className='bx bx-upload' ></i> Upload Photo</button>
                                <button id="btnRemove" onClick={handleRemoveImage}><i className='bx bxs-trash-alt' ></i> Remove Photo</button>
                            </span>
                        </div>
                        <span className="parentDateCreateUpdate">
                            <h5>
                                <span><i className='bx bxs-calendar-star'></i> Create Account</span>
                                <strong>{user && formatDateTime(user.created_at)}</strong>
                            </h5>
                            <h5>
                                <span><i className='bx bxs-calendar-edit' ></i> Last Update</span>
                                <strong>{user && formatDateTime(user.updated_at)}</strong>
                            </h5>
                        </span>
                    </div>
                    <div className="parentContentProfile">
                        <FormInfo />
                        <FormPassword />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
