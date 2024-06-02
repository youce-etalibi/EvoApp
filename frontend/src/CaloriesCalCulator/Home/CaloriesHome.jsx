import React, { useContext, useState, useEffect } from "react";
import { CaloriesContext } from "../../Context/CaloriesContext";
import { MenuContext } from "../../Context/MenuContext";
import { FaMinus } from "react-icons/fa";
import { TiEquals } from "react-icons/ti";
import axios from "axios";

const CaloriesHome = () => {
  const idAuth = localStorage.getItem("id_active");

  const [macrosUser, setMacrosUser] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("macros");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${idAuth}`);
        setMacrosUser(response.data.macros_consumed);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchData();
  }, [idAuth]); 

  const { isactive } = useContext(MenuContext);
  const { proteinsGoal, carbsGoal, fatsGoal } = useContext(CaloriesContext);

  return (
    <div className={isactive ? "caloriesHome-active" : "caloriesHome-inActive"}>
      <div className="menu-calories">
        <button
          onClick={() => setSelectedMenu("macros")}
          className={selectedMenu === "macros" ? "active" : ""}
        >
          Macros
        </button>
        <button
          onClick={() => setSelectedMenu("calories")}
          className={selectedMenu === "calories" ? "active" : ""}
        >
          Calories
        </button>
      </div>
      <div className="content-calories">
        {selectedMenu === "macros" && <MacrosContent macrosUser={macrosUser} proteinsGoal={proteinsGoal} carbsGoal={carbsGoal} fatsGoal={fatsGoal} />}
        {selectedMenu === "calories" && <CaloriesContent macrosUser={macrosUser} />}
      </div>
    </div>
  );
};

function MacrosContent({ macrosUser, proteinsGoal, carbsGoal, fatsGoal }) {
  const proteinPercentage = (macrosUser?.proteins_consumed / proteinsGoal) * 100;
  const fatPercentage = (macrosUser?.fats_consumed / fatsGoal) * 100;
  const carbsPercentage = (macrosUser?.carbs_consumed / carbsGoal) * 100;
  
  return (
    <div className="MacrosContent">
      <div className="macro-content">
        <div className="prot-rectangle"></div>
        <span className="macro-text" style={{ color: "#007bff" }}>
          PROTEIN
        </span>
        <div className="prot-progress-bar">
          <div
            className="prot-bar"
            style={{
              width: `${proteinPercentage}%`,
              backgroundColor: "#007bff",
              color: "white",
              textAlign: "center",
            }}
          >
            {`${proteinPercentage.toFixed(2)}%`}
          </div>
        </div>
      </div>
      <div className="macro-content">
        <div className="fat-rectangle"></div>
        <span className="macro-text" style={{ color: "#ffc93f" }}>
          FAT
        </span>
        <div className="fat-progress-bar">
          <div
            className="fat-bar"
            style={{
              width: `${fatPercentage}%`,
              backgroundColor: "#ffc93f",
              color: "white",
              textAlign: "center",
            }}
          >
            {`${fatPercentage.toFixed(2)}%`}
          </div>
        </div>
      </div>
      <div className="macro-content">
        <div className="carbs-rectangle"></div>
        <span className="macro-text" style={{ color: "#ff3f9b" }}>
          CARBS
        </span>
        <div className="carbs-progress-bar">
          <div
            className="carbs-bar"
            style={{
              width: `${carbsPercentage}%`,
              backgroundColor: "#ff3f9b",
              color: "white",
              textAlign: "center",
            }}
          >
            {`${carbsPercentage.toFixed(2)}%`}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaloriesContent({ macrosUser }) {
  const { goalCalories } = useContext(CaloriesContext);
  const netCalories = goalCalories - macrosUser?.calories_consumed;
  const [positiveNet, setPositiveNet] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (macrosUser?.calories_consumed > goalCalories) {
      setWarningMessage(
        "Warning! You've exceeded your target calories. Time to reassess your intake."
      );
      setPositiveNet(false);
    } else {
      setWarningMessage(
        "Congratulations! You're staying below your target calories. Keep going!"
      );
    }
  }, [macrosUser?.calories_consumed, goalCalories]);

  const progressPercentage = (macrosUser?.calories_consumed / goalCalories) * 100;

  return (
    <div className="caloriesContentSection">
      <div className="caloriesFormule">
        <div className="CaloriesGoal" style={{textAlign:"center"}}>
          <div className="caloriesGoalNumber">{goalCalories}</div>
          <span className="caloriesGoalText">Goal</span>
        </div>
        <FaMinus className="caloriesFormuuleMinus" />
        <div className="caloriesFood" style={{textAlign:"center"}}>
          <div className="caloriesFoodNumber">{macrosUser?.calories_consumed.toFixed(2)}</div>
          <span className="caloriesFoodText">Consumed</span>
        </div>
        <TiEquals className="caloriesFormuuleEqual" />
        <div className="caloriesNet" style={{textAlign:"center"}}>
          <div
            className="caloriesNetNumber"
            style={{ color: !positiveNet && "red" }}
          >
            {netCalories.toFixed(2)}
          </div>
          <span className="caloriesNetText">Net</span>
        </div>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progressPercentage.toFixed(2)}%
        </div>
      </div>
      <div
        className="CaloriesWarningMessage"
        style={{ color: positiveNet ? "green" : "red" }}
      >
        {warningMessage}
      </div>
    </div>
  );
}

export default CaloriesHome;
