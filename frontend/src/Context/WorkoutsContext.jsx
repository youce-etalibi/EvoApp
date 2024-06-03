import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const WorkoutsContext = createContext();

export const useWorkouts = () => useContext(WorkoutsContext);

export const WorkoutsProvider = ({ children }) => {
  const idAuth = localStorage.getItem('id_active');

  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [workoutsPerPage, setWorkoutsPerPage] = useState(2);
  const [filter, setFilter] = useState('history');

  useEffect(() => {
    fetchWorkouts();
    fetchExercises();
  }, [idAuth]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/workouts/?id=${idAuth}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
      const exercisesMap = {};
      response.data.forEach((exercise) => {
        exercisesMap[exercise.id] = exercise;
      });
      setExercises(exercisesMap);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const refreshWorkouts = () => {
    fetchWorkouts();
  };

  return (
    <WorkoutsContext.Provider value={{
      workouts,
      exercises,
      currentPage,
      setCurrentPage,
      workoutsPerPage,
      setWorkoutsPerPage,
      filter,
      setFilter,
      refreshWorkouts
    }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
