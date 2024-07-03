import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './QueryNine.module.css'
import {YearContext} from "../../context/YearContext";

const QueryNine = () => {
    const {year} = useContext(YearContext)
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'pie',
            },
            labels: [],
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
            }],
            colors: ['#282568', '#722676', '#375A66', '#4BC0C0', '#9966FF', '#FF9F40'],
            tooltip: {
                y: {
                    formatter: function (value) {
                        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
                    }
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        style: {
                            colors: ['#B8B8CF']
                        }
                    }
                }
            },
            legend: {
                labels: {
                    colors: '#B8B8CF'
                }
            },
        }
    });

    useEffect(() => {
        axios.get(`https://ceesar1703.pythonanywhere.com/consulta6/${year}`)
            .then(response => {
                const data = response.data;
                const series = Object.values(data);

                setChartData({
                    series: series,
                    options: {
                        ...chartData.options,
                        labels: Object.keys(data).map(label => capitalizeFirstLetter(label))
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [chartData.options, year]);

    console.log("DATA: ", chartData)
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Distribución de recursos</h2>
            </div>
            <div className={styles.report}>
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                    width="350"
                />
            </div>
        </div>
    );
};

export default QueryNine;
