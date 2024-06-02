import React, { useContext, useEffect, useState } from 'react';
import './ChangeGoal.css';
import axios from 'axios'; // Import Axios library

import { FaTimes } from "react-icons/fa";
import { CaloriesContext } from '../../Context/CaloriesContext';

export default function ChangeGoalEdit() {
  const { setEditMode, setWeight, setHeight, setGoal, setActivity } = useContext(CaloriesContext);
  const [editedWeight, setEditedWeight] = useState('');
  const [editedHeight, setEditedHeight] = useState('');
  const [editedGoal, setEditedGoal] = useState('');
  const [editedActivity, setEditedActivity] = useState('');

  const [heightt, setHeightt] = useState('');
  const [weightt, setWeightt] = useState('');
  const [goall, setGoall] = useState('');
  const [activityy, setActivityy] = useState('');

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

        // Set edited values to match fetched data initially
        setEditedWeight(userData.weight.toString()); // Assuming weight is numeric
        setEditedHeight(userData.height.toString()); // Assuming height is numeric
        setEditedGoal(userData.goal_id.toString()); // Assuming goal_id is numeric
        setEditedActivity(userData.activity_id.toString()); // Assuming activity_id is numeric
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idAuth]);

  const handleEditGoal = () => {
    // Make a PUT request to update user info
    axios.put(`http://127.0.0.1:8000/api/calories-users/${idAuth}`, {
      weight: editedWeight,
      height: editedHeight,
      goal_id: editedGoal,
      activity_id: editedActivity
    })
    .then(response => {
      // Update context state with new values
      setWeight(editedWeight);
      setHeight(editedHeight);
      setGoal(editedGoal);
      setActivity(editedActivity);

      // Exit edit mode
      setEditMode(false);
    })
    .catch(error => {
      console.error('Error updating user info:', error);
      // Handle error if needed
    });
  }

  const handleCancelEdit = () => {
    // Reset edited values to original ones
    setEditedWeight(weightt);
    setEditedHeight(heightt);
    setEditedGoal(goall);
    setEditedActivity(activityy);

    // Exit edit mode
    setEditMode(false);
  }

  return (
    <div className='editModeBackground'>
      <div className="editedModeContainer">
        <div className="editHeader">
          <h2 className='editModeTitle'> Info & Goals</h2>
          <FaTimes onClick={handleCancelEdit} className="addMealClosePopUp" />
        </div>
        <div className="editForm">
          <label>Weight (kg):</label>
          <input
            className="editInput"
            type="number"
            value={editedWeight}
            onChange={(e) => setEditedWeight(e.target.value)}
          />
          <label>Height (cm):</label>
          <input
            className="editInput"
            type="number"
            value={editedHeight}
            onChange={(e) => setEditedHeight(e.target.value)}
          />
          <label>Goal:</label>
          <select
            className="editSelect"
            value={editedGoal}
            onChange={(e) => setEditedGoal(e.target.value)}
          >
            <option value="1">Losing weight</option>
            <option value="2">Maintaining weight</option>
            <option value="3">Gaining weight</option>
            <option value="4">Build muscle</option>
          </select>
          <label>Activity Level:</label>
          <select
            className="editSelect"
            value={editedActivity}
            onChange={(e) => setEditedActivity(e.target.value)}
          >
            <option value="1">Sedentary</option>
            <option value="2">Lightly active</option>
            <option value="3">Moderately active</option>
            <option value="4">Very active</option>
          </select>
        </div>
        <div className="editButtons">
          <button className="editButton" onClick={handleEditGoal}>Save</button>
          <button className="editButton" onClick={handleCancelEdit}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
