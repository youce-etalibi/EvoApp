import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import './arrayExercices.css';
import Modal from './modal/modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePerformance } from "../categories";

export default function ArrayExercices() {
  const muscles = ['abdominals', 'shoulders', 'glutes', 'quadriceps', 'biceps', 'forearms', 'triceps', 'chest', 'lower back', 'traps', 'lats', 'middle back', 'calves'];
  const [exercises, setExercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [memberId] = useState(1); // Assume the member ID is 1 for this example
  const exercisesPerPage = filterMenuOpen ? 5 : 7;
  const [loading, setLoading] = useState(true); // Loading state
  const { Changed } = usePerformance();

  // Fetch exercises
  const fetchData = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
      setExercises(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Fetch favorites
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/favorite-exercice/${memberId}`);
      const favorites = response.data.map(favorite => favorite.exercice_id);
      setExercises(prevExercises => prevExercises.map(exercise => ({
        ...exercise,
        isFavorite: favorites.includes(exercise.id)
      })));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFavorites();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [Changed]);

  const handleFilterClick = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
    setFilterMenuOpen(false);
    setCurrentPage(1); 
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => prevPage + direction);
  };

  const handleInfoClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  const handleAddRemoveFavorite = async (exerciseId) => {
    try {
      const exerciseIndex = exercises.findIndex(exercise => exercise.id === exerciseId);
      const isFavorite = exercises[exerciseIndex].isFavorite;

      if (isFavorite) {
        await axios.delete(`http://127.0.0.1:8000/api/favorite-exercice/${memberId}/${exerciseId}`);
        toast.success('Exercise removed from favorites', {
          position: "bottom-center"
        });
      } else {
        await axios.post('http://127.0.0.1:8000/api/favorite-exercice', {
          membre_id: memberId,
          exercice_id: exerciseId
        });
        toast.success('Exercise added to favorites', {
          position: "bottom-center"
        });
      }

      await fetchData();
      await fetchFavorites();
    } catch (error) {
      console.error('Error adding/removing favorite:', error);
      toast.error('Failed to add/remove exercise from favorites', {
        position: "bottom-center"
      });
    }
  };

  const filteredExercises = selectedMuscle === 'All' 
    ? exercises 
    : exercises.filter(exercise => exercise.primaryMuscles.includes(selectedMuscle));

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

  return (
    <Fragment>
      {loading ? (
        <div>
          <span className="loaderfavorites"></span>
          <span className="loaderfavorites"></span>
        </div>
      ) : (
        <div className="parentComposantPersonalTraining">
          <div>
            <h3>Exercises</h3>
            <ul id="ulExercicesCategories">
              <li>
                <button onClick={() => setSelectedMuscle('All')} id="clearAllBtn">All Exercises</button>
              </li>
              <li>
                <button onClick={handleFilterClick} id={filterMenuOpen ? "activeBtnPersonalTraining" : null}>
                  <i className={!filterMenuOpen ? 'bx bx-filter' : 'bx bx-exit-fullscreen'}></i> Filter
                </button>
              </li>
              <div className="menuOfFilter" style={{ display: filterMenuOpen ? 'block' : 'none' }}>
                <ul>
                  {muscles.map((muscle, index) => (
                    <li key={index}>
                      <button onClick={() => handleMuscleClick(muscle)}>{muscle}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </ul>
            <div>
              <h6>{selectedMuscle}</h6>
              <ul className="ulArrayExercices">
                {currentExercises.map((exercise, index) => (
                  <li key={index}>
                    <div className="infoExercicesCategories">
                      <img src={`https://ik.imagekit.io/yuhonas/${exercise.images[0]}`} className="imgExercicesCategories" alt={exercise.name} />
                      <span>
                        <p>{exercise.name}</p>
                        <h4>{exercise.equipment}</h4>
                      </span>
                    </div>
                    <div>
                      <ul id="buttonsExercicesCategories">
                        <li>
                          <button onClick={() => handleAddRemoveFavorite(exercise.id)}>
                            {exercise.isFavorite ? 
                              <i className='bx bxs-heart'></i> :
                              <i className='bx bx-heart'></i>
                            }
                          </button>
                          <button onClick={() => handleInfoClick(exercise)}><i className='bx bx-info-circle'></i></button>
                        </li>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(-1)} 
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span>{currentPage} of {totalPages}</span>
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && selectedExercise && (
        <Modal exercise={selectedExercise} onClose={handleCloseModal} />
      )}
    </Fragment>
  );
}
