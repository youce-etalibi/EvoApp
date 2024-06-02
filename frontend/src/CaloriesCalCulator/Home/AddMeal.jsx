import React, { useState, useContext, useEffect } from "react";
import { CaloriesContext } from "../../Context/CaloriesContext";
import { FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

export default function AddMeal({ title }) {
  const [nutritionName, setNutritionName] = useState("");
  const [nutritionQuantity, setNutritionQuantity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    setAddMealPopUp,
    consumedCalories,
    setConsumedCalories,
    consumedProtein,
    setConsumedProtein,
    consumedCarbs,
    setConsumedCarbs,
    consumedFats,
    setConsumedFats,
  } = useContext(CaloriesContext);

  const idAuth = localStorage.getItem("id_active");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${idAuth}`);
        const userData = response.data.macros_consumed;
        setConsumedCalories(userData.calories_consumed);
        setConsumedProtein(userData.proteins_consumed);
        setConsumedCarbs(userData.carbs_consumed);
        setConsumedFats(userData.fats_consumed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idAuth]);

  const handleNutritionNameChange = (e) => {
    setNutritionName(e.target.value);
  };

  const handleNutritionQuantityChange = (e) => {
    setNutritionQuantity(e.target.value);
  };

  const handleDone = async () => {
    const newConsumedCalories = parseFloat(consumedCalories) + parseFloat(totalCalories);
    const newConsumedProteins = parseFloat(consumedProtein) + parseFloat(totalProteins);
    const newConsumedCarbs = parseFloat(consumedCarbs) + parseFloat(totalCarbs);
    const newConsumedFats = parseFloat(consumedFats) + parseFloat(totalFats);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/macros/${idAuth}`,
        {
          proteins_consumed: newConsumedProteins,
          fats_consumed: newConsumedFats,
          carbs_consumed: newConsumedCarbs,
          calories_consumed: newConsumedCalories
        }
      );
      console.log(response.data); // Log the response from the backend
      setConsumedCalories(newConsumedCalories);
      setConsumedProtein(newConsumedProteins);
      setConsumedCarbs(newConsumedCarbs);
      setConsumedFats(newConsumedFats);
      handleClosePopup();
    } catch (error) {
      setError("An error occurred while updating consumed macros");
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${nutritionName}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "vvBq2s9HqMkoDLa2vkp0jg==eUhiy9FYL9smUkga",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResult(data);

        const quantity = parseFloat(nutritionQuantity);
        const cal = parseFloat(data[0].calories); // Calories
        const proteins = parseFloat(data[0].protein_g); // Proteins
        const carbs = parseFloat(data[0].carbohydrates_total_g); // Carbohydrates
        const fats = parseFloat(data[0].fat_total_g); // Fats

        if (!isNaN(quantity) && !isNaN(cal)) {
          const calculatedCalories = (quantity / 100) * cal;
          setTotalCalories(totalCalories + calculatedCalories);
          setTotalProteins(totalProteins + (quantity / 100) * proteins);
          setTotalCarbs(totalCarbs + (quantity / 100) * carbs);
          setTotalFats(totalFats + (quantity / 100) * fats);

          // Reset input values after adding
          setNutritionName("");
          setNutritionQuantity("");
        }
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setAddMealPopUp(false);
  };

  return (
    <div className="AddMeal">
      <div className="AddMealContent">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{title}</h2>
          <FaTimes onClick={handleClosePopup} className="addMealClosePopUp" />
        </div>
        <div>
          <label htmlFor="nutritionName">Nutrition Name:</label>
          <input
            type="text"
            id="nutritionName"
            value={nutritionName}
            placeholder="name"
            onChange={handleNutritionNameChange}
          />
        </div>
        <div>
          <label htmlFor="nutritionQuantity">Nutrition Quantity:</label>
          <input
            type="number" // Change input type to number
            id="nutritionQuantity"
            value={nutritionQuantity}
            onChange={handleNutritionQuantityChange}
            placeholder="grams"
            pattern="[0-9]*" // Allow only numeric input
            inputMode="numeric"
          />
        </div>
        <div className="addMealButtons">
          <button onClick={handleAdd} className="AddButt">
            Add
          </button>
          <button className="DoneButt" onClick={handleDone}>
            Done
          </button>
        </div>
        {loading && (
          <div className="loader">
            <FaSpinner className="spinner" /> Loading...
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Total Calories</th>
              <th>Total Proteins</th>
              <th>Total Carbs</th>
              <th>Total Fats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalCalories.toFixed(2)}</td>
              <td>{totalProteins.toFixed(2)}</td>
              <td>{totalCarbs.toFixed(2)}</td>
              <td>{totalFats.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    </div>
  );
}
