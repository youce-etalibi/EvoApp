import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "./exercicesList.css";
import List from "./list/list";
import Filter from "./list/filter/filter";
import axios from "axios";

export default function ExercicesList() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
        setExercises(response.data);
        setFilteredExercises(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters) => {
    let filteredData = exercises.filter((exercise) => {
      return (
        (!filters.level || exercise.level === filters.level) &&
        (!filters.category || exercise.category === filters.category) &&
        (!filters.muscle || exercise.primaryMuscles.includes(filters.muscle) || exercise.secondaryMuscles.includes(filters.muscle)) &&
        (!filters.equipment || exercise.equipment === filters.equipment)
      );
    });
    setFilteredExercises(filteredData);
  };

  return (
    <Fragment>
      <div className="parentCategoriresExercices parentCategoriresExercicesSecond">
        <List exercises={filteredExercises} />
        <Filter exercises={exercises} onFilterChange={handleFilterChange} />
      </div>
    </Fragment>
  );
}
