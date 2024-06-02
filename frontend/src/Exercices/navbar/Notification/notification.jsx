import React, { useContext } from 'react';
import { NotificationContext } from '../../../Context/NotificationContext';

export default function Notification() {
    const { notifications } = useContext(NotificationContext);

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        {notification.name} - Date: {notification.date}, Time: {notification.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}
