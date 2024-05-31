import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const countDownDate = new Date("Aug 29, 2024 15:37:25").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
      return { expired: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      expired: false,
    };
  }

  return (
    <div className="p-5">
      <div className='countDown'>
        {timeLeft.expired ? (
          <p>EXPIRED</p>
        ) : (
            <div id='timers'>
            
            <div className='counter'>
            <div>
            <div className="countdown-message">{Math.floor(timeLeft.days / 10)}</div>
             <div className="countdown-message">{timeLeft.days % 10}</div>
            </div>
 
            <div className='counter-text'>
            <h3>Days</h3>
            </div>
            </div>
            <div className='counter'>
            <div>
            <div className="countdown-message">{Math.floor(timeLeft.hours / 10)}</div>
             <div className="countdown-message">{timeLeft.hours % 10}</div>
            </div>
 
            <div className='counter-text'>
            <h3>Hours</h3>
            </div>
            </div>
            <div className='counter'>
            <div>
            <div className="countdown-message">{Math.floor(timeLeft.minutes / 10)}</div>
             <div className="countdown-message">{timeLeft.minutes % 10}</div>
            </div>
 
            <div className='counter-text'>
            <h3>Minutes</h3>
            </div>
            </div>
            <div className='counter'>
            <div>
            <div className="countdown-message">{Math.floor(timeLeft.seconds / 10)}</div>
             <div className="countdown-message">{timeLeft.seconds % 10}</div>
            </div>
 
            <div className='counter-text'>
            <h3>Seconds</h3>
            </div>
            </div>
          
            </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
