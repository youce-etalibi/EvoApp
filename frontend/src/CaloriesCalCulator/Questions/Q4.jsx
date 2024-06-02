import React, { useContext } from "react";
import { CaloriesContext } from "../../Context/CaloriesContext";

const Q4 = ({ NextQ4,BackQ4}) => {
  const {goal,setGoal}=useContext(CaloriesContext)

  const handleOptionClick = (option) => {
    setGoal(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(goal !== '') {
      NextQ4()
    } else {
      alert("Please select an option.");
    }
  };


  return (
    <div className="caloriesCalculatorQ2">
      <div className="caloriesCalculatorQ4Form">
        <div className="caloriesCalculatorText" style={{margin:'0'}}>
          <h1>Calorie Calculator - Daily Caloric <br /> Needs</h1>
          <div className="caloriesCalculatorContent4">
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}></div>
            </div>
            <h2 className="caloriesCalculatorContentHeader4" >What is your goal?</h2>
            <div className="options">
              <div className={`optionQ4 ${goal === 'Losing weight' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(1)}>
                Losing weight
              </div>
              <div className={`optionQ4 ${goal === 'Maintaining weight' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(2)}>
                Maintaining weight
              </div>
              <div className={`optionQ4 ${goal === 'Gaining weight' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(3)}>
                Gaining weight
              </div>
              <div className={`optionQ4 ${goal === 'Build muscle' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(4)}>
                Build muscle
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="caloriesCalculatorActions">
                <button onClick={BackQ4} className="Back">Back</button>
                <button type="submit" className="Next">Next</button>
              </div>
            </form>
            <div className="erreorCalculator4   "> *required field</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Q4;
