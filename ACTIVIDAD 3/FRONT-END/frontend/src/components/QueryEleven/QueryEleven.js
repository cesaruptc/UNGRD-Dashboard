import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from "./QueryEleven.module.css"
import {YearContext} from "../../context/YearContext";

const QueryEleven = () => {
    const {year} = useContext(YearContext);
    const [consultaData, setConsultaData] = useState({});

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta7/${year}`)
            .then(response => {
                setConsultaData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching Consulta7 data for year ${year}:`, error);
            });
    }, [year]);

    const formatResources = (value) => {
        return value.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    };

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Evento con más recursos ejecutados:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{consultaData.evento_max_recursos}</label>
            </div>
            <div className={styles.legend}>
                <h2 className={styles.title}>Total de recursos ejecutados:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{consultaData.max_recursos ? formatResources(consultaData.max_recursos) : 'N/A'}</label>
            </div>
        </div>
    );
};

export default QueryEleven;
