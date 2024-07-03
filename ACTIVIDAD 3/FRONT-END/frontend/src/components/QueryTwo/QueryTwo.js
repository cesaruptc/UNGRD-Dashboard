import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from "./QueryTwo.module.css"
import {YearContext} from "../../context/YearContext";

const QueryTwo = () => {
    const {year} = useContext(YearContext);
    const [consultData, setConsultData] = useState({});

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta9/${year}`)
            .then(response => {
                setConsultData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching Consulta9 data for year ${year}:`, error);
            });
    }, [year]);

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Familias afectadas:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{consultData["max_familias_affected"]}</label>
            </div>
        </div>
    );
};

export default QueryTwo;
