// src/components/Consulta9.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Consulta9.module.css"

const Consulta9 = () => {
    const [year, setYear] = useState(2019);
    const [consultaData, setConsultaData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(`https://ceesar1703.pythonanywhere.com/consulta9/${year}`)
            .then(response => {
                setConsultaData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching Consulta9 data for year ${year}:`, error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, [year]);

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    return (
        <div>
            <h1>Consulta 9 - Lugar con mayor cantidad de familias afectadas en el año {year}</h1>
            <label htmlFor="year">Select Year: </label>
            <select className={styles.select} id="year" value={year} onChange={handleChangeYear}>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
            </select>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    <div>
                        <h2>Municipio:</h2>
                        <p>{consultaData.municipio_max_familias}</p>
                    </div>
                    <div>
                        <h2>Departamento:</h2>
                        <p>{consultaData.departamento_max_familias}</p>
                    </div>
                    <div>
                        <h2>Total de familias afectadas:</h2>
                        <p>{consultaData.max_familias_affected}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Consulta9;
