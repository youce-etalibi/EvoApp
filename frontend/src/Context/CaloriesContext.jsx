import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CaloriesContext = createContext();

export const CaloriesProvider = ({ children }) => {
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [addMealPopUp, setAddMealPopUp] = useState(false);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [age, setAge] = useState(0);
  const [goalCalories, setGoalCalories] = useState(0);
  const [proteinsGoal, setProteinsGoal] = useState(0);
  const [consumedProtein, setConsumedProtein] = useState(0);
  const [carbsGoal, setCarbsGoal] = useState(0);
  const [consumedCarbs, setConsumedCarbs] = useState(0);
  const [fatsGoal, setFatsGoal] = useState(0);
  const [consumedFats, setConsumedFats] = useState(0);
  const [achievedGoal, setAchievedGoal] = useState(false);
  const [activityMultiplier, setActivityMultiplier] = useState(1.2);
  const [goalCaloriesAdjustment, setGoalCaloriesAdjustment] = useState(0);
  const [editedMode, setEditMode] = useState(false);

  // State variables for fetched data
  const [weightt, setWeightt] = useState("");
  const [heightt, setHeightt] = useState("");
  const [activity_id, setActivity_id] = useState("");
  const [goal_id, setGoal_id] = useState("");
  const [birthdayy,setBirthdayy]=useState('')
  const [agee, setAgee] = useState("");
  const [caloriesConsumedd,setGoalCaloriesConsumedd]=useState('')

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${localStorage.getItem("id_active")}`);
        const userData = response.data;

        // Update state variables with fetched data
        setWeightt(userData.weight);
        setHeightt(userData.height);
        setActivity_id(userData.activity_id);
        setGoal_id(userData.goal_id);
        setBirthdayy(userData.birthday);
        setGoalCaloriesConsumedd(userData.macros_consumed.calories_consumed);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (caloriesConsumedd >= goalCalories) {
      setAchievedGoal(true);
    } else {
      setAchievedGoal(false);
    }
  }, [caloriesConsumedd, goalCalories]);

  useEffect(() => {
    let clickCount = 0;

    const handleClick = () => {
      clickCount++;
      if (clickCount === 2) {
        setAchievedGoal(false);
        clickCount = 0; // Reset click count after double click
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setProteinsGoal(goalCalories * 0.25 / 4);
    setCarbsGoal(goalCalories * 0.50 / 4);
    setFatsGoal(goalCalories * 0.25 / 9);
  }, [goalCalories]);

  useEffect(() => {
    if (birthdayy) {
      const today = new Date();
      const birthDate = new Date(birthdayy);
      let ageDiff = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        ageDiff--;
      }
      setAge(ageDiff);
    }
  }, [birthdayy]);

  useEffect(() => {
    switch (activity_id) {
      case 1:
        setActivityMultiplier(1.2);
        break;
      case 2:
        setActivityMultiplier(1.375);
        break;
      case 3:
        setActivityMultiplier(1.55);
        break;
      case 4:
        setActivityMultiplier(1.725);
        break;
      default:
        setActivityMultiplier(1.2); // Default to sedentary
    }
  }, [activity_id]);

  useEffect(() => {
    switch (goal_id) {
      case 4:
        setGoalCaloriesAdjustment(-500);
        break;
      case 2:
        setGoalCaloriesAdjustment(500);
        break;
      case 3:
        setGoalCaloriesAdjustment(0);
        break;
      case 1:
        setGoalCaloriesAdjustment(250);
        break;
      default:
        setGoalCaloriesAdjustment(0);
    }
  }, [goal_id]);

  useEffect(() => {
    const calculatedGoalCalories =
      88.362 +
      (13.397 * parseFloat(weightt) || 0) +
      (4.799 * parseFloat(heightt) || 0) -
      (5.677 * age) * activityMultiplier +
      goalCaloriesAdjustment;
    setGoalCalories(parseFloat(calculatedGoalCalories.toFixed(2)));
  }, [weightt, heightt, age, activityMultiplier, goalCaloriesAdjustment]);

  return (
    <CaloriesContext.Provider
      value={{
        birthday,
        setBirthday,
        height,
        setHeight,
        weight,
        setWeight,
        goal,
        setGoal,
        addMealPopUp,
        setAddMealPopUp,
        age,
        goalCalories,
        consumedCalories,
        setConsumedCalories,
        proteinsGoal,
        setProteinsGoal,
        consumedProtein,
        setConsumedProtein,
        carbsGoal,
        setCarbsGoal,
        consumedCarbs,
        setConsumedCarbs,
        fatsGoal,
        setFatsGoal,
        consumedFats,
        setConsumedFats,
        achievedGoal,
        setAchievedGoal,
        activity,
        setActivity,
        activityMultiplier,
        editedMode,
        setEditMode,
        weightt,
        heightt,
        activity_id,
        goal_id,
        agee,
      }}
    >
      {children}
    </CaloriesContext.Provider>
  );
};
