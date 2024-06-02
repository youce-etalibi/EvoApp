import React, { useContext, useState } from 'react';
import "./CaloriesCalCulator.css";
import Q1 from "./Questions/Q1";
import Q2 from "./Questions/Q2";
import Q3 from "./Questions/Q3";
import Q4 from "./Questions/Q4";
import Q5 from "./Questions/Q5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaloriesContext } from '../Context/CaloriesContext';

export default function CaloriesCalCulator() {


  const idAuth = localStorage.getItem("id_active");


  const { birthday, height, weight, goal, activity } = useContext(CaloriesContext);
  const [Q1Display, setQ1Display] = useState(true);
  const [Q2Display, setQ2Display] = useState(false);
  const [Q3Display, setQ3Display] = useState(false);
  const [Q4Display, setQ4Display] = useState(false);
  const [Q5Display, setQ5Display] = useState(false);
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();

  const NextQ1 = () => { setQ1Display(false); setQ2Display(true); }
  const NextQ2 = () => { setQ2Display(false); setQ3Display(true); }
  const NextQ3 = () => { setQ3Display(false); setQ4Display(true); }
  const NextQ4 = () => { setQ4Display(false); setQ5Display(true); }

  const NextQ5 = async () => {
    console.log(birthday, height, weight, goal, activity);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/calories-users/`, {
        user_id : idAuth,
        birthday,
        height,
        weight,
        goal_id : goal,
        activity_id :activity,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log('Data saved:', response.data);
      navigate("/CaloriesCalculator/Home");
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Content:', error.response.data);
        setMessageError(error.response.data.error || 'An error occurred');
      }
    }
  };
  
  const BackQ2 = () => { setQ2Display(false); setQ1Display(true); }
  const BackQ3 = () => { setQ3Display(false); setQ2Display(true); }
  const BackQ4 = () => { setQ4Display(false); setQ3Display(true); }
  const BackQ5 = () => { setQ5Display(false); setQ4Display(true); }

  return (
    <>
      <div>
        {Q1Display && <Q1 NextQ1={NextQ1} />}
        {Q2Display && <Q2 NextQ2={NextQ2} BackQ2={BackQ2} />}
        {Q3Display && <Q3 NextQ3={NextQ3} BackQ3={BackQ3} />}
        {Q4Display && <Q4 NextQ4={NextQ4} BackQ4={BackQ4} />}
        {Q5Display && <Q5 NextQ5={NextQ5} BackQ5={BackQ5} />}
        {messageError && <p className="error">{messageError}</p>}
      </div>
    </>
  );
}
