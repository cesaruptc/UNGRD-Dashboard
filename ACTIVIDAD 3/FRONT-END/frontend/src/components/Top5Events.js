// src/Top5Events.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top5Events = () => {
    const [top5Events, setTop5Events] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/events/top5')
            .then(response => {
                setTop5Events(response.data);
            })
            .catch(error => {
                console.error('Error fetching the top 5 events:', error);
            });
    }, []);

    return (
        <div>
            <h1>Top 5 Events</h1>
            <ul>
                {Object.entries(top5Events).map(([department, count]) => (
                    <li key={department}>{department}: {count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Top5Events;
