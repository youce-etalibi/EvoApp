import { Fragment } from "react";
import MyWorkouts from "./myWorkouts/myWorkouts";
import CheckWorkouts from "./checkDaysWork/checkWorkouts";
import TrainingEffect from "./TrainingEffect/TrainingEffect";

export default function Workouts(){
    return (
        <Fragment>
            <MyWorkouts />
            <div>
                <CheckWorkouts />
                <TrainingEffect />
            </div>
        </Fragment>
    )
}