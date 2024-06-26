import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Consulta4.module.css"

const Consulta4 = () => {
    const [consultaData, setConsultaData] = useState({});
    const [selectedYear, setSelectedYear] = useState(2019); // Inicialmente seleccionamos el año 2019

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta4/${selectedYear}`)
            .then(response => {
                setConsultaData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching consulta5 data for year ${selectedYear}:`, error);
            });
    }, [selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div>
            <h1 className={styles.title}>Consulta 4: Datos del año {selectedYear}</h1>
            <div>
                <label className={styles.subtitle} htmlFor="year-select">Selecciona un año:</label>
                <select className={styles.select} id="year-select" value={selectedYear} onChange={handleYearChange}>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                </select>
            </div>
            <div>
                <h2 className={styles.subtitle}>Tipo de evento con más fallecidos en {selectedYear}:</h2>
                <p>{consultaData.tipo_evento_max_fallecidos}</p>
            </div>
            <div>
                <h2 className={styles.subtitle}>Tipo de evento con más heridos en {selectedYear}:</h2>
                <p>{consultaData.tipo_evento_max_heridos}</p>
            </div>
            <div>
                <h2 className={styles.subtitle}>Evento con mayor cantidad de hectáreas afectadas en {selectedYear}:</h2>
                <p>{consultaData.tipo_evento_max_hectareas}</p>
            </div>
        </div>
    );
};

export default Consulta4;
