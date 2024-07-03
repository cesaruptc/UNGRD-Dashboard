// src/components/Dashboard.js
import React, {useContext} from 'react';
import styles from "./Dashboard.module.css";
import QueryOne from "../../components/QueryOne/QueryOne";
import {YearContext} from "../../context/YearContext";
import QueryTwo from "../../components/QueryTwo/QueryTwo";
import QueryThree from "../../components/QueryThree/QueryThree";
import QueryFour from "../../components/QueryFour/QueryFour";
import QueryFive from "../../components/QueryFive/QueryFive";
import QuerySix from "../../components/QuerySix/QuerySix";
import QuerySeven from "../../components/QuerySeven/QuerySeven";
import QueryEight from "../../components/QueryEight/QueryEight";
import QueryNine from "../../components/QueryNine/QueryNine";
import QueryTen from "../../components/QueryTen/QueryTen";
import QueryEleven from "../../components/QueryEleven/QueryEleven";


const Dashboard = () => {
    const {year, setYear} = useContext(YearContext);
    const handleChangeYear = (event) => {
        setYear(parseInt(event.target.value, 10));
    };

    return (
        <div className={styles.dashboard}>
            <center><h1 className={styles.title}>UNGRD-DASHBOARD</h1></center>
            <div className={styles.year}>
                <div className={styles.date_box}>
                    <div className={styles.label_year}>
                        Año:
                    </div>
                    <select className={styles.select} id="year" value={year} onChange={handleChangeYear}>
                        <option value={2019}>2019</option>
                        <option value={2020}>2020</option>
                        <option value={2021}>2021</option>
                    </select>
                </div>
            </div>
            <div className={styles.querys}>
                <div className={styles.first_querys}>
                    <div className={styles.query_first_line}>
                        <QueryOne/>
                    </div>
                    <div className={styles.query_first_line}>
                        <QueryTwo/>
                    </div>
                    <div className={styles.query_first_line}>
                        <QueryThree/>
                    </div>
                    <div className={styles.query_first_line}>
                        <QueryFour/>
                    </div>
                </div>
                <div className={styles.second_line}>
                    <div className={styles.query_top_five}>
                        <QuerySeven/>
                    </div>
                    <div className={styles.graphics}>
                        <div className={styles.graphics_line_one}>
                            <div className={styles.report_graphic}>
                                <QueryFive/>
                            </div>
                            <div className={styles.report_graphic}>
                                <QuerySix/>
                            </div>
                            <div className={styles.report_graphic}>
                                <QueryTen/>
                            </div>
                        </div>
                        <div className={styles.graphics_line_two}>
                            <div className={styles.report_graphic}>
                                <QueryEight/>
                            </div>
                            <div className={styles.report_graphic}>
                                <QueryNine/>
                            </div>
                            <div className={styles.report_graphic}>
                                <QueryEleven/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className={styles.footerContent}>
                    <div className={styles.line}></div>
                    <div className={styles.contactContent}>
                        <div className={styles.contact}>
                            <p className={styles.info}>Elaborado por</p>
                            <p className={styles.name}>César Augusto Moreno Cano</p>
                            <p className={styles.info}>cesar.moreno04@uptc.edu.co</p>
                        </div>
                        <div className={styles.github}>
                            <a href="https://github.com/cesaruptc" target="_blank" rel="noreferrer">
                                <img className={styles.imagegit} src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png" alt="Github" width="60" height="60" />
                            </a>
                        </div>
                    </div>
                    <div className={styles.lastInfo}>
                        <div className={styles.infoUNGRD}>Dashboard: Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD). 2024</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
