// src/components/ResourcePieChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './Consulta6.module.css'

const Consulta6 = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'pie',
            },
            labels: [],
            title: {
                text: 'Resource Distribution',
                align: 'center'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    });

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/consulta6')
            .then(response => {
                const data = response.data;
                const series = Object.values(data);
                const labels = Object.keys(data);

                setChartData({
                    series: series,
                    options: {
                        ...chartData.options,
                        labels: labels
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2 className={styles.title}>Consulta 6: Distribución de recursos</h2>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                width="500"
            />
        </div>
    );
};

export default Consulta6;
