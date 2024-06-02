import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const idAuth = localStorage.getItem('id_active');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/workouts/?id=${idAuth}`)
            .then(response => {
                setNotifications(response.data);
                scheduleNotifications(response.data);
            })
            .catch(error => {
                console.error("Error fetching workouts:", error);
            });
    }, []);

    const scheduleNotifications = (workouts) => {
        console.log("Scheduling notifications...");
        const currentDateTime = new Date().getTime();
        
        workouts.forEach(workout => {
            const { name, date, alarm } = workout;
            const alarmDateTime = new Date(`${date} ${alarm}`).getTime();
    
            // Check if the current time matches the alarm time exactly
            if (currentDateTime === alarmDateTime) {
                console.log(`Scheduling notification for ${name}`);
                displayNotification(name);
            }
        });
    };
    
    
    
    

    const displayNotification = (workoutName) => {
        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(`It's time for your workout: ${workoutName}`);
                }
            });
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
