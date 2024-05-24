import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Consulta5.module.css"

const Consulta5 = () => {
    const [department, setDepartment] = useState('');

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/consulta5')
            .then(response => {
                setDepartment(response.data);
            })
            .catch(error => {
                console.error('Error fetching department:', error);
            });
    }, []);

    return (
        <div>
            <h2 className={styles.title}>Consulta 5: Departamento con mayor movimiento de masa:</h2>
            <label>{department}</label>
        </div>
    );
};

export default Consulta5;
