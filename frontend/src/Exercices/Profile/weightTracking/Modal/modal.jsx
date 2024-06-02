import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import './modal.css';

export default function Modal({ onClose, onAddWeightTracking }) {

  const idAuth = localStorage.getItem('id_active');

  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [weightError, setWeightError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [animationClass, setAnimationClass] = useState('in:square:hesitate');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setWeightError('');
    setDateError('');
    setTimeError('');

    let hasError = false;

    if (!weight) {
      setWeightError('Weight is required.');
      hasError = true;
    } else if (isNaN(weight)) {
      setWeightError('Weight must be a numeric value.');
      hasError = true;
    } else if (weight < 20) {
      setWeightError('Weight must be at least 20 kg.');
      hasError = true;
    }

    if (!date) {
      setDateError('Date is required.');
      hasError = true;
    }

    if (!time) {
      setTimeError('Time is required.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/weight-tracking/${idAuth}`, {
        weight,
        date,
        time,
      });
      onAddWeightTracking(response.data);
      setWeight('');
      setDate('');
      setTime('');
      handleClose();
    } catch (error) {
      console.error("There was an error adding the weight tracking data!", error);
    }
  };

  const handleClose = () => {
    setAnimationClass('out:square:hesitate');
    setTimeout(onClose, 1500); 
  };

  useEffect(() => {
    setAnimationClass('in:square:hesitate');
  }, []);

  return (
    <Fragment>
      <div className={`parentModalWeightTracking`} transition-style={animationClass}>
        <div className="formWeightTracking">
          <header>
            <h3>Add Weight Tracking</h3>
            <button onClick={handleClose} id="btnCloseModalTracking"><i className='bx bx-x'></i></button>
          </header>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="weight">Weight </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      id="weight"
                      placeholder="Weight..."
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    {weightError && <div className="errorModal"><i className='bx bxs-error'></i> {weightError}</div>}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="date">Date </label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {dateError && <div className="errorModal"><i className='bx bxs-error'></i> {dateError}</div>}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="time">Time </label>
                  </td>
                  <td>
                    <input
                      type="time"
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    {timeError && <div className="errorModal"><i className='bx bxs-error'></i> {timeError}</div>}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td id="tdOfSubmitButtonEWight">
                    <button type="submit" id="submitOfWeightTracking">Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
