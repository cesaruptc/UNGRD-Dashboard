import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Consulta7.module.css"

const Consulta7 = () => {
    const [year, setYear] = useState(2019); // Año inicial
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
        <div>
            <h1 className={styles.title}>Consulta 7 - Evento con más recursos ejecutados en el año {year}</h1>
            <div>
                <label className={styles.subtitle} htmlFor="year-select">Selecciona un año:</label>
                <select className={styles.select} id="year-select" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                </select>
            </div>
            <div>
                <h2 className={styles.subtitle}>Evento con más recursos ejecutados:</h2>
                <p>{consultaData.evento_max_recursos}</p>
            </div>
            <div>
                <h2 className={styles.subtitle}>Total de recursos ejecutados:</h2>
                <p>{consultaData.max_recursos ? formatResources(consultaData.max_recursos) : 'N/A'}</p>
            </div>
        </div>
    );
};

export default Consulta7;
