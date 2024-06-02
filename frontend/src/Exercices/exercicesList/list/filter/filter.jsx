import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./filter.css";

export default function Filter({ exercises, onFilterChange }) {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const levels = [...new Set(exercises.map((exercise) => exercise.level))];
  const categories = [...new Set(exercises.map((exercise) => exercise.category))];
  const muscles = [...new Set(exercises.flatMap((exercise) => exercise.primaryMuscles.concat(exercise.secondaryMuscles)))];
  const equipment = [...new Set(exercises.map((exercise) => exercise.equipment))];

  const applyFilters = () => {
    const filters = {
      level: selectedLevel,
      category: selectedCategory,
      muscle: selectedMuscle,
      equipment: selectedEquipment
    };
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setSelectedLevel("");
    setSelectedCategory("");
    setSelectedMuscle("");
    setSelectedEquipment("");
    applyFilters(); 
  };

  return (
    <Fragment>
      <div className="parentFilterExercicesSection">
        <h3>
          <i className="bx bx-filter"></i> Filter
        </h3>
        <div>
          <label>Level</label>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              id={selectedLevel === level ? "activeBtnPersonalTraining" : ""}
            >
              {level}
            </button>
          ))}
        </div>
        <div>
          <label>Category</label>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              id={selectedCategory === category ? "activeBtnPersonalTraining" : ""}
            >
              {category}
            </button>
          ))}
        </div>
        <div>
          <label>Muscle</label>
          {muscles.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              id={selectedMuscle === muscle ? "activeBtnPersonalTraining" : ""}
            >
              {muscle}
            </button>
          ))}
        </div>
        <div>
          <label>Equipment</label>
          {equipment.map((equip) => (
            <button
              key={equip}
              onClick={() => setSelectedEquipment(equip)}
              id={selectedEquipment === equip ? "activeBtnPersonalTraining" : ""}
            >
              {equip}
            </button>
          ))}
        </div>
        <div className="parentButtonsFilter">
          <button onClick={resetFilters} id="ResetFilters">Reset Filters</button>
          <button onClick={applyFilters} id="ApplyFilters">Apply Filters</button>
        </div>
      </div>
    </Fragment>
  );
}
