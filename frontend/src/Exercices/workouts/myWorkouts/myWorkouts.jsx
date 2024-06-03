import React, { Fragment, useState } from 'react';
import { useWorkouts } from '../../../Context/WorkoutsContext';
import axios from 'axios';
import './myWorkouts.css';
import { Link } from 'react-router-dom';
import ModalCreateWO from '../Modal/modal';
import UpdateModal from './UpdateModal/updateModal';

export default function MyWorkouts() {
  const {
    workouts,
    exercises,
    currentPage,
    setCurrentPage,
    workoutsPerPage,
    setWorkoutsPerPage,
    filter,
    setFilter,
    refreshWorkouts
  } = useWorkouts();

  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAllExercises, setShowAllExercises] = useState({});

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openUpdateModal = (workout) => {
    setSelectedWorkout(workout);
    setUpdateModalVisible(true);
    setOpenMenuId(null);
  };
  const closeUpdateModal = () => setUpdateModalVisible(false);
  const formatTime = (time24) => {
    const [hour, minute] = time24.split(':');
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  };

  const toggleExerciseDone = async (workoutId, exercise) => {
    try {
      const updatedDoneStatus = !exercise.done;
      await axios.patch(`http://127.0.0.1:8000/api/workout_exercices/${exercise.id}/done`, { done: updatedDoneStatus });

      refreshWorkouts();
    } catch (error) {
      console.error('Error updating exercise done status:', error);
    }
  };

  const getClassName = (workout) => {
    if (workout.done) {
      return 'parentRowWorkoutSuccess';
    }
    const hasDoneExercise = workout.workout_exercices.some((ex) => ex.done);
    if (hasDoneExercise) {
      return 'parentRowWorkoutSuccess parentRowWorkoutYellow';
    }
    return 'parentRowWorkoutSuccess parentRowWorkoutRed';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/workouts/${id}`);
        refreshWorkouts();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentDate = new Date().toISOString().split('T')[0];

  const filteredWorkouts = workouts.filter((workout) =>
    filter === 'today' ? workout.date === currentDate : true
  );

  const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleShowAllExercises = (workoutId) => {
    setShowAllExercises((prev) => {
      const newShowAll = { ...prev, [workoutId]: !prev[workoutId] };
      const anyOpen = Object.values(newShowAll).some((val) => val);
      setWorkoutsPerPage(anyOpen ? 1 : 2);
      return newShowAll;
    });
  };

  return (
<Fragment>
  <div className="parentComposantPersonalTraining">
    <div>
      <span className="spanHEaderWorkout">
        <h3>My workouts</h3>
      </span>
      <ul>
        <li>
          <button id="clearAllBtn" onClick={() => setFilter('history')}>
            History
          </button>
        </li>
        <li>
          <button id={filter === 'today' ? 'activeBtnPersonalTraining' : ''} onClick={() => setFilter('today')}>
            Today
          </button>
        </li>
      </ul>
      {filter === 'today' && filteredWorkouts.length === 0 && workouts.length > 0 ? (
        <div className="addWorkoutNotExiste">
          <button onClick={openModal}>
            <i className="bx bx-add-to-queue"></i>
            <h4>Add workout</h4>
          </button>
        </div>
      ) : (
        currentWorkouts.map((workout) => (
          <div key={workout.id} className={getClassName(workout)}>
            <button
              id="buttonMoreToolWO"
              onClick={() => setOpenMenuId(openMenuId === workout.id ? null : workout.id)}
            >
              {openMenuId === workout.id ? <i className="bx bx-x"></i> : <i className="bx bx-dots-vertical-rounded"></i>}
            </button>
            {openMenuId === workout.id && (
              <div className="MenuButtonMoreToolWO">
                <ul>
                  <li>
                    <button onClick={() => openUpdateModal(workout)}>
                      <i className="bx bxs-edit-alt"></i> Update
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleDelete(workout.id)}>
                      <i className="bx bxs-trash-alt"></i> Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <header className="headerWorkout">
              <span>{workout.date}</span>
              <p>Exercises, {workout.workout_exercices.length}</p>
            </header>
            {workout.done ? (
              <p id="successWorkout">
                <strong>
                  <i className="bx bx-check-circle"></i> Workout Completed!
                </strong>
              </p>
            ) : (
              <p id="successWorkout">
                <strong>
                  <i className="bx bx-x-circle"></i> The exercise is not complete!
                </strong>
              </p>
            )}
            <div className="parentRowWorkout">
              <span>
                <p>
                  <i className="bx bxs-cuboid"></i> {workout.name}
                </p>
                <p id="levelWorkOut">
                  <i className="bx bx-radio-circle-marked"></i> {workout.level.label}
                </p>
              </span>
              <p>
                <i className="bx bxs-alarm-add"></i> {formatTime(workout.alarm)}
              </p>
            </div>
            <div>
              {workout.workout_exercices.length > 0 ? (
                workout.workout_exercices
                  .slice(0, showAllExercises[workout.id] ? workout.workout_exercices.length : 1)
                  .map((we) => {
                    const exercise = exercises[we.exercice_work_out_api.api_id];
                    return exercise ? (
                      <div key={we.id} className="RowExerciceWorkout">
                        <div className="elementInfoImgExerciceWorkout">
                          {exercise.images && exercise.images.length > 0 && (
                            <div id="parentImgExWorkout">
                              <img
                                src={`https://ik.imagekit.io/yuhonas/${exercise.images[0]}`}
                                alt={exercise.name}
                              />
                            </div>
                          )}
                          <div className="infoRowExercice">
                            <p>{exercise.category}</p>
                            <h4>{exercise.name}</h4>
                          </div>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            checked={we.done}
                            onChange={() => toggleExerciseDone(workout.id, we)}
                            id={`inputCheckExercice_${we.id}`}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor={`inputCheckExercice_${we.id}`} id="labelCheckExercice">
                            {we.done ? <i className="bx bx-check"></i> : <i className="bx bx-checkWhite"></i>}
                          </label>
                        </div>
                      </div>
                    ) : (
                      <p key={we.id}>
                        <span className="loader"></span>
                      </p>
                    );
                  })
              ) : (
                <div className="noExercises">
                  <p>No exercises available</p>
                  <Link to={`/add-exercise/${workout.id}`}>
                    <button className="addExerciseButton">
                      <i className="bx bx-plus"></i> Add Exercises
                    </button>
                  </Link>
                </div>
              )}
              {workout.workout_exercices.length > 1 && (
                <button
                  onClick={() => toggleShowAllExercises(workout.id)}
                  className="showMoreExercisesButton"
                >
                  {showAllExercises[workout.id] ? (
                    <><i class='bx bx-chevrons-up'></i>Show Less</>
                  ) : (
                    <><i class='bx bx-chevrons-down'></i>Show More Exercises</>
                  )}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
    <div id="paginationPersonalTraining">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} id="btnPaginate">
        {'<'}
      </button>
      <span>{currentPage}</span>
      <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastWorkout >= filteredWorkouts.length} id="btnPaginate">
        {'>'}
      </button>
    </div>
  </div>
  {modalVisible && <ModalCreateWO closeModal={closeModal} />}
  {updateModalVisible && (
    <UpdateModal
      closeModal={closeUpdateModal}
      workout={selectedWorkout}
      refreshWorkouts={refreshWorkouts}
    />
  )}
</Fragment>

);
}
