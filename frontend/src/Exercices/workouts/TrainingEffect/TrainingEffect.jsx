import React, { useState, useEffect, Fragment } from "react";
import "./TrainingEffect.css";

export default function TrainingEffect() {
  const [workouts, setWorkouts] = useState([]);
  const [progressZone, setProgressZone] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch('http://127.0.0.1:8000/api/workouts');
      const data = await response.json();
      setWorkouts(data);
      determineProgressZone(data);
    }

    fetchWorkouts();
  }, []);

  const determineProgressZone = (workouts) => {
    const currentWeek = getCurrentWeek();
    const workoutsThisWeek = workouts.filter(workout => {
      const workoutDate = new Date(workout.date);
      return isDateInCurrentWeek(workoutDate, currentWeek);
    });

    console.log("Workouts this week:", workoutsThisWeek);

    const daysWithWorkouts = new Set();
    let completedExercisesCount = 0;

    workoutsThisWeek.forEach(workout => {
      const workoutDate = new Date(workout.date).toDateString();
      if (workout.done === 1) {
        daysWithWorkouts.add(workoutDate);
        completedExercisesCount += workout.workout_exercices.filter(exercise => exercise.done === 1).length;
      }
    });

    console.log("Days with workouts:", daysWithWorkouts.size);
    console.log("Completed exercises count:", completedExercisesCount);

    const numberOfDaysWithWorkouts = daysWithWorkouts.size;
    let zone = 'RecoveryPart';

    if (numberOfDaysWithWorkouts >= 7) {
      zone = 'OverreachingPart';
    } else if (numberOfDaysWithWorkouts === 6) {
      zone = 'ImprovingPart';
    } else if (numberOfDaysWithWorkouts >= 4) {
      zone = 'HighlyImporovingPart';
    } else if (numberOfDaysWithWorkouts >= 2) {
      zone = 'MaintainingPart';
    } else if (numberOfDaysWithWorkouts >= 1) {
      zone = 'MinorPart';
    }

    setProgressZone(zone);
    console.log("Progress zone set to:", zone);  // Moved inside to reflect the new state value
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
    const endOfWeek = new Date(now.setDate(now.getDate() + 6)); // Sunday
    return { startOfWeek, endOfWeek };
  };

  const isDateInCurrentWeek = (date, currentWeek) => {
    return date >= currentWeek.startOfWeek && date <= currentWeek.endOfWeek;
  };

  return (
    <Fragment>
      <div className="parenttrainingEffect">
        <h3>Training Effect</h3>
        <h5>Recovery</h5>
        <div className="progressBarTrainingEffect">
          <div className="MinorPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'MinorPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
          <div className="MaintainingPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'MaintainingPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
          <div className="HighlyImporovingPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'HighlyImporovingPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
          <div className="RecoveryPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'RecoveryPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
          <div className="ImprovingPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'ImprovingPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
          <div className="OverreachingPart">
            <span className="pointofPosistion">.</span>
            {progressZone === 'OverreachingPart' && <i className='bx bxs-down-arrow'></i>}
          </div>
        </div>
        <div className="keysOfTrainingEffect">
          <ul>
            <li>
              <i className="bx bxs-circle Minor"></i> <span>Minor</span>
            </li>
            <li>
              <i className="bx bxs-circle Maintaining"></i> <span>Maintaining</span>
            </li>
            <li>
              <i className="bx bxs-circle HighlyImproving"></i> <span>Highly improving</span>
            </li>
          </ul>
          <ul>
            <li>
              <i className="bx bxs-circle Recovery"></i> <span>Recovery</span>
            </li>
            <li>
              <i className="bx bxs-circle Improving"></i> <span>Improving</span>
            </li>
            <li>
              <i className="bx bxs-circle Overreaching"></i> <span>Overreaching</span>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
