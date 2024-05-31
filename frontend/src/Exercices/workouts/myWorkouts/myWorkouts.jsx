import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./myWorkouts.css";
import { Link } from "react-router-dom";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(2);

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

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = workouts.slice(
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
          </span>
          <ul>
            <li>
              <button id="clearAllBtn">History</button>
            </li>
            <li>
              <button>today</button>
            </li>
          </ul>

          {currentExercises.map((workout) => (
            <div key={workout.id} className={getClassName(workout)}>
              <header className="headerWorkout">
                <span>{workout.date}</span> Exercices,{" "}
                {workout.workout_exercices.length}
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
                    <i className="bx bx-x-circle"></i> The exercise is not
                    complete!
                  </strong>
                </p>
              )}
              <div className="parentRowWorkout">
                <span>
                  <p>
                    <i className="bx bxs-cuboid"></i> {workout.name}
                  </p>
                  <p id="levelWorkOut">
                    <i className="bx bx-radio-circle-marked"></i>{" "}
                    {workout.level.label}
                  </p>
                </span>
                <p>
                  <i className="bx bxs-alarm-add"></i>{" "}
                  {formatTime(workout.alarm)}
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
                          <label
                            htmlFor={`inputCheckExercice_${we.id}`}
                            id="labelCheckExercice"
                          >
                            {we.done ? (
                              <i className="bx bx-check"></i>
                            ) : (
                              <i className="bx bx-checkWhite"></i>
                            )}
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
                    <Link to={`/`}>
                      <button className="addExerciseButton">
                        <i className='bx bx-add-to-queue'></i> Add Exercises
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
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
            disabled={indexOfLastExercise >= workouts.length}
          >
            &gt;
          </button>
        </div>
      </div>
    </Fragment>
  );
}
