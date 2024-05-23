import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consulta5 = () => {
    const [department, setDepartment] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/events/movimientos_en_masa')
            .then(response => {
                setDepartment(response.data);
            })
            .catch(error => {
                console.error('Error fetching department:', error);
            });
    }, []);

    return (
        <div>
            <h2>Department with Most Mass Movements:</h2>
            <label>{department}</label>
        </div>
    );
};

export default Consulta5;
