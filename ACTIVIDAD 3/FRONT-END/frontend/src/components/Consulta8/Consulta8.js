// src/components/EventsLineChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Consulta8 = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "Events",
            data: []
        }],
        options: {
            chart: {
                type: 'line',
                height: 350
            },
            title: {
                text: 'Events Over Time',
                align: 'left'
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Month'
                }
            },
            yaxis: {
                title: {
                    text: 'Number of Events'
                }
            },
            stroke: {
                curve: 'smooth'
            }
        }
    });

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/consulta8')
            .then(response => {
                const data = response.data;
                const seriesData = Object.values(data);
                const categories = Object.keys(data);

                setChartData({
                    series: [{
                        name: "Events",
                        data: seriesData
                    }],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            categories: categories
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Events Over Time</h2>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default Consulta8;
