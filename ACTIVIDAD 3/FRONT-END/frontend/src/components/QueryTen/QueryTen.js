import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from "./QueryTen.module.css"
import {YearContext} from "../../context/YearContext";

const QueryTen = () => {
    const {year} = useContext(YearContext);
    const [consultData, setConsultData] = useState({});

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta4/${year}`)
            .then(response => {
                setConsultData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching Consulta4 data for year ${year}:`, error);
            });
    }, [year]);

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Evento con más fallecidos:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{consultData["tipo_evento_max_fallecidos"]}</label>
            </div>
            <div className={styles.legend}>
                <h2 className={styles.title}>Evento con más heridos:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{consultData["tipo_evento_max_heridos"]}</label>
            </div>
        </div>
    );
};

export default QueryTen;
