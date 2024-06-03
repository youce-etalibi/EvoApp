import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import './checkWorkouts.css';
import BtnAdd from "../buttonAddWorkOut/btnAdd";
import { useWorkouts } from "../../../Context/WorkoutsContext"; // Import the context hook

export default function CheckWorkouts(){
    const [workouts, setWorkouts] = useState([]);
    const idAuth = localStorage.getItem('id_active');
    const { refreshWorkouts } = useWorkouts(); // Get the refreshWorkouts function from context

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/workouts/?id=${idAuth}`)
            .then((response) => setWorkouts(response.data))
            .catch((error) => console.error("Error fetching workouts:", error));
    }, [refreshWorkouts]); // Include refreshWorkouts in the dependency array

    const getFirstDayOfWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); 
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
        return firstDayOfWeek.toISOString().slice(0, 10); 
    };

    const getDateOfNthDayOfWeek = (n) => {
        const firstDayOfWeek = new Date(getFirstDayOfWeek());
        const nthDayOfWeek = new Date(firstDayOfWeek);
        nthDayOfWeek.setDate(firstDayOfWeek.getDate() + n);
        return nthDayOfWeek.toISOString().slice(0, 10);
    };

    const getDayOfMonth = (dateString) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <Fragment>
            <BtnAdd /> 
            <div className="parentCheckWorkouts">
                <ul className="ulKeysChecks">
                    <li>
                        <span><i className='bx bxs-key' ></i> Day</span>
                    </li>
                    <li>
                        <span><i className='bx bxs-key' ></i> a movement</span>
                    </li>
                    <li>
                        <span><i className='bx bxs-key' ></i> Exercices</span>
                    </li>
                </ul>
                <ul>
                    {daysOfWeek.map((day, index) => {
                        const date = getDateOfNthDayOfWeek(index);
                        const workoutsForDay = workouts.filter(workout => workout.date === date);
                        const isDayCompleted = workoutsForDay.some(workout => workout.workout_exercices.some(ex => ex.done));
                        return (
                            <li key={index}>
                                <span>{getDayOfMonth(date)}</span>
                                <span>
                                    <i className={isDayCompleted ? 'bx bxs-check-circle' : 'bx bx-circle'}></i>
                                </span>
                                <span>
                                    {workoutsForDay.reduce((totalExercises, workout) => totalExercises + workout.workout_exercices.length, 0)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Fragment>
    )
}
