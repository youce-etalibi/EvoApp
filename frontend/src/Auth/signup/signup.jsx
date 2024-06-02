import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './signup.css';
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useGoogleLogin } from '@react-oauth/google';

export default function Signup() {
  const navigate = useNavigate();
  const { setProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (formData.name.trim() === '') {
      validationErrors.name = "The username is required";
    }
    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email must be valid";
    }
    if (formData.password.trim() === '') {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 7) {
      validationErrors.password = "At least 7 characters";
    }

    setErrors(validationErrors);
    setHasErrors(Object.keys(validationErrors).length > 0);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup', formData);
      const { token, userid, user, idseller } = response.data;

      var userData = JSON.stringify(user);
      localStorage.setItem('user', userData);
      localStorage.setItem('token', token);
      localStorage.setItem('id_active', userid);
      localStorage.setItem('seller_id', idseller);

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const signup = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        });
        const googleUser = res.data;

        console.log(googleUser)

        const response = await axios.post('http://127.0.0.1:8000/api/google-signup', {
          name: googleUser.name,
          email: googleUser.email
        });

        const { token, user, userid } = response.data;
        setProfile(user);

        var userData = JSON.stringify(user);
        localStorage.setItem('user', userData);
        localStorage.setItem('token', token);
        localStorage.setItem('id_active', userid);

        navigate('/home');
      } catch (error) {
        console.error('Google signup error:', error);
      }
    },
    onError: (error) => console.log('Signup Failed:', error)
  });

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
      <div className={`parentLogin`}>
        <div className="parentImage">
          <div className="parentChild">
            <div className={`parentCicleImages ${hasErrors ? 'errorParentCircle' : ''}`} >
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
                src="/Evolution.png"
                className="LoginImg3"
                alt=""
              />
              <h1 id="signupH1">Sign up Interface</h1>
            </div>
          </div>
        </div>
        <div className="parentForm">
          <form action="" className={`formLogin ${hasErrors ? 'errorParent' : ''}`} onSubmit={handleSignup}>
            <h1>Member Access</h1>
            <div className="box">
              <div className="input-box">
                <label htmlFor="name">
                  Name <i className="bx bxs-user-circle"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="example_123"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error"><i className='bx bxs-error'></i> {errors.name}</p>}
                <br />
                <label htmlFor="email">
                  Email <i className="bx bxs-envelope"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error"><i className='bx bxs-error'></i> {errors.email}</p>}
                <br />
                <div className="parentPasswordInput">
                  <label htmlFor="password">
                    Password <i className="bx bxs-lock-alt"></i>
                  </label>
                  <span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password..."
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <ShowHidePassword />
                  </span>
                </div>
                {errors.password && <p className="error"><i className='bx bxs-error'></i> {errors.password}</p>}
                <br />
              </div>
              <div className="submit-box">
                <button type="submit" id="submitBtnLogin">
                  Sign Up
                </button>
              </div>
              <div className="submit-box">
                <button onClick={() => signup()} type="button" id="submitBtnLogin">
                  <i className="bx bxl-google"></i> Sign up with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
