import { Fragment, useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setProfile } = useContext(AuthContext);
  const [user, setUser] = useState(null); 

  const [messageInvalide, setMsgInvalide] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [hasErrors, setHasErrors] = useState(false);

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
        emailError: "Invalid email format",
      }));
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Password must contain at least 1 character",
      }));
      isValid = false;
    }

    setHasErrors(!isValid);

    if (!isValid) {
      return;
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
      const adminCheck = response.data.user.idAdmin;
      const idseller = response.data.idseller;

      // Convert user data to a JSON string
      var userData = JSON.stringify(user);

      // Store data in localStorage
      localStorage.setItem('user', userData);
      localStorage.setItem('token', token);
      localStorage.setItem('id_active', userid);
      localStorage.setItem('seller_id', idseller);

      // Navigate to the store page
      adminCheck ? navigate('/store/admin/products') : navigate('/home')
      ;
    } catch (error) {
      console.log(error.response.data);
      setMsgInvalide(error.response.data.message)
      
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
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
      <div className={`parentLogin`}>
        <div className="parentImage">
          <div className="parentChild">
            <div className={`parentCicleImages ${hasErrors ? 'errorParentCircle' : ''}`}>
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
                src='/Evolution.png'
                className="LoginImg3"
                alt=""
              />
              <h1>Login Interface</h1>
            </div>
          </div>
        </div>
        <div className="parentForm">
          <form action="" className={`formLogin ${hasErrors ? 'errorParent' : ''}`} onSubmit={handleSubmit}>
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
                {errors.emailError && <p className="error"><i className='bx bxs-error'></i> {errors.emailError}</p>}
                <br />
                <span className="parentPasswordInput">
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
                </span>
                {errors.passwordError && <p className="error"><i className='bx bxs-error'></i> {errors.passwordError}</p>}
                <br />
              </div>
              <div className="submit-box">
                <button type="submit" id="submitBtnLogin">
                  Login
                </button>
              </div>
              <div className="submit-box">
                <button type="button" onClick={() => login()} id="submitBtnLogin">
                  <i className="bx bxl-google"></i> Connect with Google
                </button>
                <center><p>{messageInvalide && <><i className='bx bxs-error' ></i> {messageInvalide} </>}</p></center>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
