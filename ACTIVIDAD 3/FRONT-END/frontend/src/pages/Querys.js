// src/components/Dashboard.js
import React from 'react';
import styles from "./Querys.module.css";
import Consulta1 from "../components/Consultas/Consulta1/Consulta1";
import Consulta2 from "../components/Consultas/Consulta2/Consulta2";
import Consulta3 from "../components/Consultas/Consulta3/Consulta3";
import Consulta4 from "../components/Consultas/Consulta4/Consulta4";
import Consulta5 from "../components/Consultas/Consulta5/Consulta5";
import Consulta6 from "../components/Consultas/Consulta6/Consulta6";
import Consulta7 from "../components/Consultas/Consulta7/Consulta7";
import Consulta9 from "../components/Consultas/Consulta9/Consulta9";
import Consulta10 from "../components/Consultas/Consulta10/Consulta10";
import Consulta8 from "../components/Consultas/Consulta8/Consulta8";


const Querys = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>UNGRD-DASHBOARD</h1>
            <div className={styles.reports}>

                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta1/>
                    </div>
                    <div className={styles.report}>
                        <Consulta2/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta3/>
                    </div>
                    <div className={styles.report}>
                        <Consulta4/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta5></Consulta5>
                    </div>
                    <div className={styles.report}>
                        <Consulta6></Consulta6>
                    </div>
                </div>


                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta7/>
                    </div>
                    <div className={styles.report}>
                        <Consulta8/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.report}>
                        <Consulta9/>
                    </div>
                    <div className={styles.report}>
                        <Consulta10/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Querys;
