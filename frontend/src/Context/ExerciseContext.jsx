// src/context/ExerciseContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [favoriteExerciseIds, setFavoriteExerciseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const idAuth = localStorage.getItem('id_active');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/favorite-exercice/?id=${idAuth}`);
        const exerciseIds = response.data.map(fav => fav.exercice_id);
        setFavoriteExerciseIds(exerciseIds);
      } catch (error) {
        console.error('Error fetching favorite exercises:', error);
      }
    };

    fetchExercises();
    fetchFavorites();
  }, [idAuth, changed]);

  const toggleFavorite = async (exerciseId) => {
    const isFavorite = favoriteExerciseIds.includes(exerciseId);

    try {
      if (isFavorite) {
        await axios.delete(`http://127.0.0.1:8000/api/favorite-exercice/${idAuth}/${exerciseId}`);
        setFavoriteExerciseIds(prevIds => prevIds.filter(id => id !== exerciseId));
      } else {
        await axios.post(`http://127.0.0.1:8000/api/favorite-exercice`, { user_id: idAuth, exercice_id: exerciseId });
        setFavoriteExerciseIds(prevIds => [...prevIds, exerciseId]);
      }
      setChanged(prev => !prev);
    } catch (error) {
      console.error('Error updating favorite exercise:', error);
    }
  };

  return (
    <ExerciseContext.Provider value={{ exercises, favoriteExerciseIds, loading, toggleFavorite }}>
      {children}
    </ExerciseContext.Provider>
  );
};
