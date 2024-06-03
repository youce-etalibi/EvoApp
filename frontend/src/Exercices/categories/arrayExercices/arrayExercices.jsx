import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ExerciseContext } from '../../../Context/ExerciseContext';
import Modal from './modal/modal';
import { toast } from 'react-toastify';
import './arrayExercices.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function ArrayExercices() {
  const { exercises, favoriteExerciseIds, loading, toggleFavorite } = useContext(ExerciseContext);
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [muscles, setMuscles] = useState(['All']);
  const exercisesPerPage = filterMenuOpen ? 5 : 7;

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'); // Replace with your API endpoint
        const muscleGroups = response.data.map(muscle => muscle.primaryMuscles).flat();
        setMuscles(['All', ...new Set(muscleGroups)]);
      } catch (error) {
        console.error('Error fetching muscle groups:', error);
      }
    };

    fetchMuscles();
  }, []);

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
    await toggleFavorite(exerciseId);
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
                            {favoriteExerciseIds.includes(exercise.id) ? 
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
            <div id="paginationPersonalTraining">
              <button 
                onClick={() => handlePageChange(-1)} 
                disabled={currentPage === 1}
                id="btnPaginate"
              >
                &lt;
              </button>
              <span>{currentPage} of {totalPages}</span>
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === totalPages}
                id="btnPaginate"
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
