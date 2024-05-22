// src/components/Querys.js
import React from 'react';
import Consulta2 from "../components/Consulta2/Consulta2";
import styles from "./Querys.module.css";
import Consulta4 from "../components/Consulta4/Consulta4";
const Querys = () => {
    return (
        <div>
            <h1>UNGRD-DASHBOARD</h1>
            <div className={styles.reports}>
                <div className={styles.report}>
                    <Consulta2/>
                </div>
                <div className={styles.report}>
                    <Consulta4/>
                </div>
            </div>
        </div>
    );
};

export default Querys;
