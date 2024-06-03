import React, { useState, useEffect, Fragment } from "react";
import "./TrainingEffect.css";
import { useWorkouts } from "../../../Context/WorkoutsContext";

export default function TrainingEffect() {
  const { workouts } = useWorkouts();
  const [progressZone, setProgressZone] = useState(null);
  const [noActivity, setNoActivity] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    determineProgressZone(workouts);
  }, [workouts]);

  const determineProgressZone = (workouts) => {
    const currentWeek = getCurrentWeek();
    const workoutsThisWeek = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return isDateInCurrentWeek(workoutDate, currentWeek);
    });

    if (workoutsThisWeek.length === 0) {
      setNoActivity(true);
      return;
    }

    const daysWithWorkouts = new Set();
    let completedExercisesCount = 0;

    workoutsThisWeek.forEach((workout) => {
      const workoutDate = new Date(workout.date).toDateString();
      if (workout.done === 1) {
        daysWithWorkouts.add(workoutDate);
        completedExercisesCount += workout.workout_exercices.filter(
          (exercise) => exercise.done === 1
        ).length;
      }
    });

    const numberOfDaysWithWorkouts = daysWithWorkouts.size;
    let zone = "RecoveryPart";

    if (numberOfDaysWithWorkouts >= 7) {
      zone = "OverreachingPart";
    } else if (numberOfDaysWithWorkouts === 6) {
      zone = "ImprovingPart";
    } else if (numberOfDaysWithWorkouts >= 4) {
      zone = "HighlyImporovingPart";
    } else if (numberOfDaysWithWorkouts >= 2) {
      zone = "MaintainingPart";
    } else if (numberOfDaysWithWorkouts >= 1) {
      zone = "MinorPart";
    }

    setProgressZone(zone);
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const endOfWeek = new Date(now.setDate(now.getDate() + 6));
    return { startOfWeek, endOfWeek };
  };

  const isDateInCurrentWeek = (date, currentWeek) => {
    return date >= currentWeek.startOfWeek && date <= currentWeek.endOfWeek;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Fragment>
      <div className="parenttrainingEffect">
        <h3>
          <span>Training Effect</span>
          <button id="DetailKeys" onClick={togglePopup}>
            <i className="bx bxs-info-circle"></i>
          </button>
        </h3>
        <h5>Recovery</h5>
        <div className="progressBarTrainingEffect">
  {noActivity && (
    <div className="NoActivity">
      <span className="pointofPosistion">.</span>
      {/* <i className="bx bxs-down-arrow"></i> */}
    </div>
  )}
  <div className="MinorPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "MinorPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
  <div className="MaintainingPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "MaintainingPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
  <div className="HighlyImporovingPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "HighlyImporovingPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
  <div className="RecoveryPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "RecoveryPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
  <div className="ImprovingPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "ImprovingPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
  <div className="OverreachingPart">
    <span className="pointofPosistion">.</span>
    {progressZone === "OverreachingPart" && (
      <i className="bx bxs-down-arrow"></i>
    )}
  </div>
</div>

        <div className="keysOfTrainingEffect">
          <ul>
            <li>
              <i className="bx bxs-circle Minor"></i> <span>Minor</span>
            </li>
            <li>
              <i className="bx bxs-circle Maintaining"></i>{" "}
              <span>Maintaining</span>
            </li>
            <li>
              <i className="bx bxs-circle HighlyImproving"></i>{" "}
              <span>Highly improving</span>
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
              <i className="bx bxs-circle Overreaching"></i>{" "}
              <span>Overreaching</span>
            </li>
          </ul>
        </div>
      </div>
      {showPopup && (
        <div className="popupTrainingEffect">
          <div className="content">
            <div className="header">
              <h5>
                <i className="bx bxs-info-circle"></i> Keys TrainingEffect
              </h5>
              <button onClick={togglePopup}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            <br />
            <div className="keysOfTrainingEffect">
              <ul>
                <li>
                  <i className="bx bxs-circle Minor"></i>{" "}
                  <span>
                    <strong>Minor :</strong> At least one day with a workout.
                  </span>
                </li>
                <li>
                  <i className="bx bxs-circle Maintaining"></i>{" "}
                  <span>
                    <strong>Maintaining :</strong> At least two days with
                    workouts.
                  </span>
                </li>
                <li>
                  <i className="bx bxs-circle HighlyImproving"></i>{" "}
                  <span>
                    <strong>Highly improving :</strong> At least four days with
                    workouts.
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <i className="bx bxs-circle Recovery"></i>{" "}
                  <span>
                    <strong>Recovery :</strong> No condition specified, it
                    serves as the default zone if none of the other conditions
                    are met.
                  </span>
                </li>
                <li>
                  <i className="bx bxs-circle Improving"></i>{" "}
                  <span>
                    <strong>Improving :</strong> Exactly six days with workouts.
                  </span>
                </li>
                <li>
                  <i className="bx bxs-circle Overreaching"></i>{" "}
                  <span>
                    <strong>Overreaching :</strong> At least seven days with
                    workouts. Improving: Exactly six days with workouts.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
