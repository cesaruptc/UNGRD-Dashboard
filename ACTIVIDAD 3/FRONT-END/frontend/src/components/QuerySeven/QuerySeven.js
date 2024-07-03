import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./QuerySeven.module.css";
import {YearContext} from "../../context/YearContext";

const Consulta1 = () => {
    const {year} = useContext(YearContext);
    const [top5Events, setTop5Events] = useState([]);

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta1/${year}`)
            .then(response => {
                setTop5Events(response.data);
            })
            .catch(error => {
                console.error('Error fetching the top 5 events:', error);
            });
    }, [year]);

    return (
        <div>
            <div className={styles.legend}>
                <h2 className={styles.title}>Top Departamentos por número de eventos:</h2>
            </div>
            <ul>
                {Object.entries(top5Events).map(([department, count]) => (
                    <li className={styles.elements} key={department}>{department}: {count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Consulta1;
