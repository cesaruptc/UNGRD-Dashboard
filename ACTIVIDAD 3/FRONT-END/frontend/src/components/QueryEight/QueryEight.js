import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styles from "./QueryEight.module.css"
import {YearContext} from "../../context/YearContext";
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const QueryEight = () => {
    const {year} = useContext(YearContext);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Events',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta1/${year}`)
            .then(response => {
                const data = response.data;
                const labels = Object.keys(data);
                const counts = Object.values(data);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Number of Events',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the top 5 events:', error);
                setLoading(false);
            });
    }, [year]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                label: {
                    color: '#B8B8CF',
                }
            },
            title: {
                display: false,
                text: 'Top 5 Departments by Number of Events',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#B8B8CF',
                },
            },
            y: {
                ticks: {
                    color: '#B8B8CF',
                },
            },
        },

    };

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h1 className={styles.title}>Departamentos por N° de eventos</h1>
            </div>
            <div className={styles.report}>
                <div className={styles.reportGraphic}>
                    {loading ? <p>Loading...</p> : <Bar data={chartData} options={options} height={'210'} />}
                </div>
            </div>
        </div>
    );
};

export default QueryEight;
