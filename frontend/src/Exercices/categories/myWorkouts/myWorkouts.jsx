import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./myWorkouts.css";
import { Link } from "react-router-dom";
import ModalCreateWO from "../../workouts/Modal/modal";
import UpdateModal from "./UpdateModal/updateModal";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(2);
  const [filter, setFilter] = useState("history");

  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null); 

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openUpdateModal = (workout) => {
    setSelectedWorkout(workout);
    setUpdateModalVisible(true);
    setOpenMenuId(null); 
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
    setSelectedWorkout(null);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/workouts")
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.error("Error fetching workouts:", error));

    axios
      .get(
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
      )
      .then((response) => {
        const exercisesMap = {};
        response.data.forEach((exercise) => {
          exercisesMap[exercise.id] = exercise;
        });
        setExercises(exercisesMap);
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

  const formatTime = (time24) => {
    const [hour, minute] = time24.split(":");
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${ampm}`;
  };

  const toggleExerciseDone = (workoutId, exercise) => {
    const updatedDoneStatus = !exercise.done;

    axios
      .patch(
        `http://127.0.0.1:8000/api/workout_exercices/${exercise.id}/done`,
        { done: updatedDoneStatus }
      )
      .then((response) => {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  workout_exercices: workout.workout_exercices.map((ex) =>
                    ex.id === exercise.id
                      ? { ...ex, done: updatedDoneStatus }
                      : ex
                  ),
                  done: workout.workout_exercices.every((ex) =>
                    ex.id === exercise.id ? updatedDoneStatus : ex.done
                  ),
                }
              : workout
          )
        );
      })
      .catch((error) =>
        console.error("Error updating exercise done status:", error)
      );
  };

  const getClassName = (workout) => {
    if (workout.done) {
      return "parentRowWorkoutSuccess";
    }

    const hasDoneExercise = workout.workout_exercices.some((ex) => ex.done);
    if (hasDoneExercise) {
      return "parentRowWorkoutSuccess parentRowWorkoutYellow";
    }

    return "parentRowWorkoutSuccess parentRowWorkoutRed";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/workouts/${id}`)
        .then((response) => {
          setWorkouts(workouts.filter((workout) => workout.id !== id));
        })
        .catch((error) => console.error("Error deleting workout:", error));
    }
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentDate = new Date().toISOString().split("T")[0];

  const filteredWorkouts = workouts.filter((workout) =>
    filter === "today" ? workout.date === currentDate : true
  );

  const currentExercises = filteredWorkouts.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <div className="parentComposantPersonalTraining">
        <div>
          <span className="spanHEaderWorkout">
            <h3>My workouts</h3>
            <button onClick={openModal}>
              <i className="bx bxs-add-to-queue"></i>
            </button>
          </span>
          <ul>
            <li>
              <button id="clearAllBtn" onClick={() => setFilter("history")}>
                History
              </button>
            </li>
            <li>
              <button
                id={filter === "today" ? "activeBtnPersonalTraining" : ""}
                onClick={() => setFilter("today")}
              >
                Today
              </button>
            </li>
          </ul>

          {filter === "today" && filteredWorkouts.length === 0 && workouts.length > 0 ? (
            <div className="addWorkoutNotExiste">
              <button onClick={openModal}>
                <i className="bx bx-add-to-queue"></i>
                <h4>Add workout</h4>
              </button>
            </div>
          ) : (
            currentExercises.map((workout) => (
              <div key={workout.id} className={getClassName(workout)}>
                <button
                  id="buttonMoreToolWO"
                  onClick={() => setOpenMenuId(openMenuId === workout.id ? null : workout.id)} // Toggle menu visibility for specific workout
                >
                  {openMenuId === workout.id ? <i className="bx bx-x"></i> : <i className="bx bx-dots-vertical-rounded"></i>}
                </button>
                {openMenuId === workout.id && ( // Render menu only if openMenuId matches workout id
                  <div className="MenuButtonMoreToolWO">
                    <ul>
                      <li>
                        <button onClick={() =>openUpdateModal(workout)}>
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
                  <p>Exercices, {workout.workout_exercices.length}</p>
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
                    workout.workout_exercices.map((we) => {
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
                              style={{ display: "none" }}
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
                </div>
              </div>
            ))
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastExercise >= filteredWorkouts.length}
          >
            &gt;  
          </button>
        </div>
      </div>
      {modalVisible && <ModalCreateWO closeModal={closeModal} />}
      {updateModalVisible && (
        <UpdateModal
          closeModal={closeUpdateModal}
          workout={selectedWorkout}
          updateWorkout={(updatedWorkout) => {
            setWorkouts((prevWorkouts) =>
              prevWorkouts.map((workout) =>
                workout.id === updatedWorkout.id ? updatedWorkout : workout
              )
            );
          }}
        />
      )}
    </Fragment>
  );
}
