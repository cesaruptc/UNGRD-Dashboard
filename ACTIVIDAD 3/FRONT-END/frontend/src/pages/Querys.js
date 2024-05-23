// src/components/Querys.js
import React from 'react';
import Consulta2 from "../components/Consulta2/Consulta2";
import styles from "./Querys.module.css";
import Consulta4 from "../components/Consulta4/Consulta4";
import Consulta7 from "../components/Consulta7/Consulta7";
import Consulta10 from "../components/Consulta10/Consulta10";
import Consulta9 from "../components/Consulta9/Consulta9";

const Querys = () => {
    return (
        <div className={styles.container}>
            <h1>UNGRD-DASHBOARD</h1>
            <div className={styles.reports}>
                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta2/>
                    </div>
                    <div className={styles.report}>
                        <Consulta4/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta7/>
                    </div>
                    <div className={styles.report}>
                        <Consulta9/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta10/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Querys;
