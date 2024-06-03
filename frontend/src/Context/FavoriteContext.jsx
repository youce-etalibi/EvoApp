import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favoriteExerciseIds, setFavoriteExerciseIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false);

    const idAuth = localStorage.getItem('id_active');

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/favorite-exercice/?id=${idAuth}`);
            const exerciseIds = response.data.map(fav => fav.exercice_id);
            setFavoriteExerciseIds(exerciseIds);
        } catch (error) {
            console.error('Error fetching favorite exercises:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [changed]);

    const toggleFavorite = async (exerciseId) => {
        const isFavorite = favoriteExerciseIds.includes(exerciseId);
        try {
            setLoading(true);
            if (isFavorite) {
                await axios.delete(`http://127.0.0.1:8000/api/favorite-exercice/${idAuth}/${exerciseId}`);
            } else {
                await axios.post(`http://127.0.0.1:8000/api/favorite-exercice`, { user_id: idAuth, exercice_id: exerciseId });
            }
            setChanged(!changed);
        } catch (error) {
            console.error('Error updating favorite exercise:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favoriteExerciseIds, toggleFavorite, loading }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteContext;
