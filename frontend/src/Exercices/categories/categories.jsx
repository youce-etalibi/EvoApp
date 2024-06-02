import React, { Fragment, createContext, useContext, useState } from "react";
import "./categories.css";
import PersonalTraining from "./personalTraining/personalTraining";
import MyWorkouts from "./myWorkouts/myWorkouts";
import ArrayExercices from "./arrayExercices/arrayExercices";

const PerformanceContext = createContext();

export const usePerformance = () => {
  return useContext(PerformanceContext);
};

export default function Categories() {
  const [Changed, setChanged] = useState(false);


  console.log(Changed)

  return (
    <Fragment>
      <PerformanceContext.Provider value={{ Changed, setChanged }}>
        <div className="parentCategoriresExercices">
          <MyWorkouts />
          <ArrayExercices />
          <PersonalTraining />
        </div>
      </PerformanceContext.Provider>
    </Fragment>
  );
}
