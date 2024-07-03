import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from "./QueryOne.module.css"
import {YearContext} from "../../context/YearContext";

const QueryOne = () => {
    const [department, setDepartment] = useState('');
    const {year} = useContext(YearContext);

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta5/${year}`)
            .then(response => {
                setDepartment(response.data);
            })
            .catch(error => {
                console.error('Error fetching department:', error);
            });
    }, [year]);

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Departamento con mayor movimiento de masa:</h2>
            </div>
            <div className={styles.report}>
                <label className={styles.department_name}>{department}</label>
            </div>
        </div>
    );
};

export default QueryOne;
