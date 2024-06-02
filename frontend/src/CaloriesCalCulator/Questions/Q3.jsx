import React, { useContext } from "react";
import { CaloriesContext } from "../../Context/CaloriesContext";

const Q3 = ({ BackQ3,NextQ3}) => {
  const {weight,setWeight}=useContext(CaloriesContext)

  const handleChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(weight) < 1) {
      alert("Weight cannot be negative or neutral.");
    }else {
      NextQ3()
  };}


  return (
    <div className="caloriesCalculatorQ2">
      <div className="caloriesCalculatorQ2Form">
        <div className="caloriesCalculatorText">
          <h1>Calorie Calculator - Daily Caloric <br /> Needs</h1>
          <div className="caloriesCalculatorContent2">
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>
            <h2 className="caloriesCalculatorContentHeader" >What is your weight?</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={weight}
                placeholder="kg"
                className="inputQ2"
                onChange={handleChange}
                required
              />
              <div className="caloriesCalculatorActions"><button onClick={BackQ3} className="Back">Back</button><button type="submit" className="Next">Next</button> </div>
              
            </form>
            <div className="erreorCalculator2 "> *required field</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Q3;
