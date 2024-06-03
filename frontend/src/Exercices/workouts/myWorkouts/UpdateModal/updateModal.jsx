import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './updateModal.css';
import { useWorkouts } from '../../../../Context/WorkoutsContext';

export default function UpdateModal({ workout, closeModal }) {
  const [name, setName] = useState(workout.name);
  const [level, setLevel] = useState(workout.level.id);
  const [alarm, setAlarm] = useState(workout.alarm);
  const [date, setDate] = useState(workout.date);
  const [message, setMessage] = useState(workout.message);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [woExercises, setWoExercises] = useState([]);
  const { refreshWorkouts } = useWorkouts();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json'
        );
        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const fetchWorkoutExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/workouts/${workout.id}/exercises`);
        setWoExercises(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workout exercises:', error);
        setLoading(false);
      }
    };

    fetchWorkoutExercises();
  }, [workout.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/api/workouts/${workout.id}`, {
        name,
        level_id: level,
        alarm,
        date,
        time: '00:00',
        message,
      });

      closeModal();
      refreshWorkouts();
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleExerciseUpdate = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/workouts/${workout.id}/exercises`, {
        workoutId: workout.id,
        memberId: workout.memberId,
        exercises: woExercises,
      });
    } catch (error) {
      console.error('Error updating workout exercises:', error);
    }
  };

  const handleExerciseChange = (updatedExercises) => {
    setWoExercises(updatedExercises);
  };

  return (
    <Fragment>
      <div className="parentModalUpdateWO">
        <div className="modalupdateContent">
          <span>
            <h4>Update Workout</h4>
            <button onClick={closeModal}>
              <i className="bx bx-x"></i>
            </button>
          </span>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">Name:</label>
                  </td>
                  <td>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="level">Level:</label>
                  </td>
                  <td>
                    <select
                      id="level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      required
                    >
                      <option value="1">beginner</option>
                      <option value="2">intermediate</option>
                      <option value="3">expert</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="alarm">Alarm:</label>
                  </td>
                  <td>
                    <input
                      id="alarm"
                      type="time"
                      value={alarm}
                      onChange={(e) => setAlarm(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="date">Date:</label>
                  </td>
                  <td>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="message">Message:</label>
                  </td>
                  <td>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" id="updateBtnWO">
              Update
            </button>
            <button type="button" id="cancelBtnWO" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
