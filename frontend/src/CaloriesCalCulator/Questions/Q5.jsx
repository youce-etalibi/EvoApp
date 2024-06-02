import React, { useContext, useState } from "react";
import { CaloriesContext } from "../../Context/CaloriesContext";

const Q5 = ({ NextQ5, BackQ5 }) => {
  const { activity, setActivity } = useContext(CaloriesContext);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setActivity(option);
    setSelectedOption(option);
  };
  console.log(activity)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption !== '') {
      NextQ5();
    } else {
      alert("Please select an activity level.");
    }
  };

  return (
    <div className="caloriesCalculatorQ2">
      <div className="caloriesCalculatorQ4Form">
        <div className="caloriesCalculatorText">
          <h1>Calorie Calculator -  Level of Physical Activity </h1>
          <div className="caloriesCalculatorContent4">
            <div className="progress-bar">
              <div className="progress" style={{ width: "100%" }}></div>
            </div>
            <h2 className="caloriesCalculatorContentHeader4">What is your activity level?</h2>
            <div className="options">
              <div className={`optionQ4 ${selectedOption === 'Sedentary' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(1)}>
                Sedentary 
              </div>
              <div className={`optionQ4 ${selectedOption === 'Lightly active' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(2)}>
                Lightly active 
              </div>
              <div className={`optionQ4 ${selectedOption === 'Moderately active' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(3)}>
                Moderately active 
              </div>
              <div className={`optionQ4 ${selectedOption === 'Very active' ? 'selectedQ4' : ''}`} onClick={() => handleOptionClick(4)}>
                Very active 
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="caloriesCalculatorActions">
                <button onClick={BackQ5} className="Back">Back</button>
                <button type="submit" className="Next" disabled={selectedOption === ''}>Next</button>
              </div>
            </form>
            <div className="erreorCalculator4">* Required field</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Q5;
