import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CaloriesContext } from "../../Context/CaloriesContext";
import { useNavigate } from "react-router-dom";

const Q1 = ({ NextQ1 }) => {
  const navigate = useNavigate();
  const [birth, setBirth] = useState('');
  const [wei, setWei] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${localStorage.getItem("id_active")}`);
        const userData = response.data;
        setBirth(userData.birthday);
        setWei(userData.weight);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const { birthday, setBirthday } = useContext(CaloriesContext);

  const handleChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(birthday) > new Date()) {
      alert("Birthday cannot be in the future.");
    } else {
      NextQ1();
    }
  };

  useEffect(() => {
    if (birth && wei) {
      navigate("/CaloriesCalculator/Home");
    }
  }, [birth, wei, navigate]);

  return (
    <div className="caloriesCalculatorQ1">
      <div className="caloriesCalculatorQ1Form">
        <div className="caloriesCalculatorText">
          <h1>Calorie Calculator - Daily Caloric <br /> Needs</h1>
          <div className="caloriesCalculatorContent">
            <div className="progress-bar">
              <div className="progress" style={{ width: "20%" }}></div>
            </div>
            <h2 className="caloriesCalculatorContentHeader">What is your birth day?</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="date"
                value={birthday}
                onChange={handleChange}
                required
              />
              <button type="submit" className="nexttt">Next</button>
            </form>
            <div className="erreorCalculator2"> *required field</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Q1;
