import { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { MenuContext } from "../../Context/MenuContext";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {profile, setProfile,user,setUser} =useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({
      emailError: "",
      passwordError: "",
    });
  
    let isValid = true;
  
    if (!validateEmail(formData.email)) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Format d'email invalide",
      }));
      isValid = false;
    }

  
    if (!validatePassword(formData.password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Le mot de passe doit contenir au moins 1 caractère",
      }));
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signin",
        formData
      );
      console.log(response.data.user);
    
      const token = response.data.token;
      const userid = response.data.userid;
      const user = response.data.user;
      const idseller = response.data.idseller;
    
      // Convert user data to a JSON string
      var userData = JSON.stringify(user);
    
      // Store data in localStorage
      localStorage.setItem('user', userData);
      localStorage.setItem('token', token);
      localStorage.setItem('id_active', userid);
      localStorage.setItem('seller_id', idseller);
    
      // Navigate to the store page
      navigate('/home');
    } catch (error) {
      console.log(error.response.data);
    }
  
  }
    

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setUser(codeResponse)},
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then(async (res) => {
          const User = res.data;
          try {
            const checkResponse = await axios.post('http://127.0.0.1:8000/api/check-user', {
              email: User.email
            });
         
            if (checkResponse.data.exists) {
              var userDataString = JSON.stringify(User);
             const token = checkResponse.data.token;
             const idseller = checkResponse.data.idseller;
              const userid = checkResponse.data.userid;
              localStorage.setItem('user', userDataString);
              localStorage.setItem('token', token);
              localStorage.setItem('id_active', userid);
               localStorage.setItem('seller_id', idseller);
               
              navigate('/home');
            } else {
              console.error('User not registered');
              alert('User not registered');
            }
          } catch (error) {
            console.error('Error checking user registration:', error);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  

  function ShowHidePassword() {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
      const input = document.getElementById("password");
      if (input) {
        toggle ? (input.type = "text") : (input.type = "password");
      }
    }, [toggle]);

    return (
      <>
        <button
          className="showBtn"
          type="button"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? (
            <i className="bx bx-hide"></i>
          ) : (
            <i className="bx bx-show-alt"></i>
          )}
        </button>
      </>
    );
  }

  return (
    <Fragment>
      <div className="parentLogin">
        <div className="parentImage">
          <div className="parentChild">
            <div className="parentCicleImages">
              <img
                src={require("../assests/LoginImages/Gym__Fits_for_Mens_-_Green_and_Black-removebg-preview.png")}
                className="LoginImg1"
                alt=""
              />
              <img
                src={require("../assests/LoginImages/Man_Runner_Training_Fitness_Dress_Shoes_PNG-removebg-preview (1).png")}
                className="LoginImg2"
                alt=""
              />
              <img
                src={require("../assests/LoginImages/Evolution.png")}
                className="LoginImg3"
                alt=""
              />
              <h1>Login Interface</h1>
            </div>
          </div>
        </div>
        <div className="parentForm">
          <form action="" className="formLogin" onSubmit={handleSubmit}>
            <h1>Member Access</h1>
            <div className="box">
              <div className="input-box">
                <label htmlFor="email">
                  Email <i className="bx bxs-user-circle"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="example_123"
                  
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="password">
                  Password <i className="bx bxs-lock-alt"></i>
                </label>
                <input

                  type="password"
                  name="password"
                  id="password"
                  placeholder="password..."
                 
                  value={formData.password}
                  onChange={handleChange}

                />
                <ShowHidePassword />
                <br />
              </div>
              <div className="parentline">
                <div className="cookies">
                  <input
                    type="checkbox"
                    name="coockie-remember"
                    id="rememberMeCheckbox"
                  />
                  <label htmlFor="rememberMeCheckbox" id="labelCheckboxCoockies">Remember me</label>
                </div>
              </div>
              <div className="submit-box">
                <button type="submit" className="submitBtn">
                  Login
                </button>
              </div>
              <div className="forget-box">
                <a href="#">Forget password ?</a>
              </div>
              <div className="submit-box">
                <button type="button" onClick={() => login()} className="googleBtn">
                  <i className="bx bxl-google"></i> Connecte with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
