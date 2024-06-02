import React, { useContext, useEffect, useState } from "react";
import "./ChangeGoal.css";
import ChangeGoalEdit from "./ChangeGoalEdit";
import { Link } from "react-router-dom";
import Footer from "../../LandingPage/footer/footer";
import { CaloriesContext } from "../../Context/CaloriesContext";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

export default function ChangeGoal() {
  const {
    goalCalories,
    proteinsGoal,
    carbsGoal,
    fatsGoal,
    editedMode,
    setEditMode
  } = useContext(CaloriesContext);

  const [goall, setGoall] = useState(null);
  const [heightt, setHeightt] = useState(null);
  const [weightt, setWeightt] = useState(null);
  const [activityy, setActivityy] = useState(null);

  const handleEditedMode = () => {
    setEditMode(true);
  };

  const idAuth = localStorage.getItem("id_active");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/calories-users/?id=${idAuth}`
        );
        const userData = response.data;

        // Update state variables with API response data
        setGoall(userData.goal_id);
        setHeightt(userData.height);
        setWeightt(userData.weight);
        setActivityy(userData.activity_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idAuth]);

  // Helper functions to map IDs to descriptive labels
  const getActivityLabel = (id) => {
    switch (id) {
      case 1:
        return "Sedentary";
      case 2:
        return "Lightly active";
      case 3:
        return "Moderately active";
      case 4:
        return "Very active";
      default:
        return "Unknown activity level";
    }
  };

  const getGoalLabel = (id) => {
    switch (id) {
      case 1:
        return "Losing weight";
      case 2:
        return "Maintaining weight";
      case 3:
        return "Gaining weight";
      case 4:
        return "Build muscle";
      default:
        return "Unknown goal";
    }
  };

  // Helper function to handle potential non-numeric values
  const formatValue = (value) => {
    if (typeof value === "number" && !isNaN(value)) {
      return value.toFixed(2);
    } else {
      return "N/A";
    }
  };

  return (
    <div
      className="change-goal"
      style={{
        height: editedMode && "100vh",
        overflow: editedMode && "hidden",
        width: editedMode && "100vw",
      }}
    >
      {editedMode && <ChangeGoalEdit />}
      <header className="chage-goal-header">
        <Navbar />
      </header>
      <div className="change-goal-main">
        <div className="change-goal-image-container">
          <img
            src="/caloriesCalculator/image.png"
            alt=""
            className="change-goal-main-picture"
          />
        </div>{" "}
        <h1 className="chage-goal-title">Your Fitness Goals</h1>
        <div className="change-goal-content">
          <div className="nutrition-goals">
            <h3 className="Daily-goals-title">Daily Nutrition Goals</h3>
            <p className="">
              This table outlines the recommended daily intake goals for
              essential nutrients to help guide balanced and healthy eating
              habits.
            </p>
            <div className="nutrition-goals-table">
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Calories</div>
                <div className="nutrition-Value">
                  {formatValue(goalCalories)}
                </div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Carbohydrates</div>
                <div className="nutrition-Value">{formatValue(carbsGoal)}</div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Fat</div>
                <div className="nutrition-Value">{formatValue(fatsGoal)}</div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Protein</div>
                <div className="nutrition-Value">
                  {formatValue(proteinsGoal)}
                </div>
              </div>
            </div>
          </div>

          <div className="Objective-goals">
            <h3 className="Daily-goals-title">Informations & Goals</h3>
            <p className="">
              This will help us tailor your calorie intake and macronutrient
              goals according to your specific needs.
            </p>
            <div className="change-goal-edit-container">
              <div className="change-goal-edit--button" onClick={handleEditedMode}>
                EDIT
              </div>
            </div>
            <div className="nutrition-goals-table">
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Weight</div>
                <div className="nutrition-Value">{formatValue(weightt)}</div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Height</div>
                <div className="nutrition-Value">{formatValue(heightt)}</div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Physical Activity</div>
                <div className="nutrition-Value">{getActivityLabel(activityy)}</div>
              </div>
              <div className="nutrition-goals-ligne">
                <div className="nutrition-namme">Goal</div>
                <div className="nutrition-Value">{getGoalLabel(goall)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
