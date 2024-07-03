// src/Consulta1.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Consulta1.module.css";

const Consulta1 = () => {
    const [top5Events, setTop5Events] = useState([]);

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/consulta1')
            .then(response => {
                setTop5Events(response.data);
            })
            .catch(error => {
                console.error('Error fetching the top 5 events:', error);
            });
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Consulta 1: Top 5 de eventos</h1>
            <ul>
                {Object.entries(top5Events).map(([department, count]) => (
                    <li className={styles.elements} key={department}>{department}: {count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Consulta1;
