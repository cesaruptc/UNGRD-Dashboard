import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from "./QuerySix.module.css"
import {Pie} from "react-chartjs-2";

const QuerySix = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/consulta10')
            .then(response => {
                const data = response.data;
                setChartData({
                    labels: data.years,
                    datasets: [
                        {
                            label: 'Porcentaje de Eventos: ',
                            data: data.percentages,
                            backgroundColor: [
                                '#282568',
                                '#722676',
                                '#375A66',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40'
                            ],
                            hoverBackgroundColor: [
                                '#282568',
                                '#722676',
                                '#375A66',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40'
                            ]
                        }
                    ]
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Consulta10 data:', error);
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Porcentaje eventos por año:</h2>
            </div>
            <div className={styles.report}>
                <div className={styles.chartContainer}>
                    {chartData && <Pie data={chartData} />}
                </div>
            </div>
        </div>
    );
};

export default QuerySix;
