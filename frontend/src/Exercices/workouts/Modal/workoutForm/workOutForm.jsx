import React, { Fragment, useState } from "react";
import axios from "axios";
import "./workOutForm.css";
import { useWorkouts } from "../../../../Context/WorkoutsContext";

export default function WorkOutForm({ cartExercises, onClose }) {
    const idAuth = localStorage.getItem('id_active');
    const { refreshWorkouts } = useWorkouts();

    const [workoutName, setWorkoutName] = useState("");
    const [level, setLevel] = useState("");
    const [date, setDate] = useState("");
    const [alarm, setAlarm] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!workoutName) {
            errors.workoutName = "Workout name is required";
        }
        if (!level) {
            errors.level = "Level is required";
        }
        if (!date) {
            errors.date = "Date is required";
        } else if (new Date(date) <= new Date()) {
            errors.date = "Date must be in the future";
        }
        if (!alarm) {
            errors.alarm = "Alarm is required";
        } else if (new Date(`${date}T${alarm}`) <= new Date()) {
            errors.alarm = "Alarm must be in the future";
        }
        return errors;
    };

    const handleWorkoutSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/workouts", {
                name: workoutName,
                level_id: level,
                user_id: idAuth,
                date: date,
                time: "00:00", // Set a default value for time
                alarm: alarm,
                message: message,
                exercises: cartExercises
            });

            if (response.status === 201) {
                onClose();
                refreshWorkouts(); // Refresh workouts after adding a new one
                console.log("Workout added successfully");
            } else {
                console.error("Failed to add workout");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="parentWorkOutForm">
                <h2>Custom workout</h2>
                <p>Record every completed workout to track your fitness program</p>
                <input
                    type="text"
                    placeholder="Workout name"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    id="inputNameWO"
                />
                {errors.workoutName && <span className="errorCW"><i className='bx bxs-error' ></i> {errors.workoutName}</span>}
                <h4><i className='bx bxs-square-rounded'></i> Choose Level</h4>
                <div className="parentBtnsLevelWO">
                    <button 
                        className={`btnLevelCWO ${level === "1" && "btnLevelCWOActive"}`} 
                        onClick={() => setLevel("1")} 
                    >
                        <h3>Beginner</h3>
                    </button>
                    <button 
                        className={`btnLevelCWO ${level === "2" && "btnLevelCWOActive"}`}
                        onClick={() => setLevel("2")}
                    >
                        <h3>Intermediate</h3>
                    </button>
                    <button 
                        className={`btnLevelCWO ${level === "3" && "btnLevelCWOActive"}`}
                        onClick={() => setLevel("3")}
                    >
                        <h3>Expert</h3>
                    </button>
                </div>
                {errors.level && <span className="errorCW"><i className='bx bxs-error' ></i> {errors.level}</span>}
                <h4><i className='bx bxs-square-rounded'></i> Choose Date</h4>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id="inputDateWO"
                />
                {errors.date && <span className="errorCW"><i className='bx bxs-error' ></i> {errors.date}</span>}
                <div className="parentTimeInputsCW">
                    <span>
                        <h4><i className='bx bxs-square-rounded'></i> Choose Alarm</h4>
                        <input
                            type="time"
                            value={alarm}
                            onChange={(e) => setAlarm(e.target.value)}
                            id="inputTimeWO"
                        />
                        {errors.alarm && <span className="errorCW"><i className='bx bxs-error' ></i> {errors.alarm}</span>}
                    </span>
                </div>
                <h4><i className='bx bxs-square-rounded'></i> Message</h4>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="inputMsgWO"
                />
                <button onClick={handleWorkoutSubmit} id="inputSubmitCW" disabled={loading}>
                    {loading ? <span className="loader"></span> : <>Create Workout <i className='bx bx-add-to-queue'></i></>}
                </button>
            </div>
        </Fragment>
    );
}
