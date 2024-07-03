import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styles from "./Consulta3.module.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Consulta3 = () => {
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
        axios.get('https://ceesar1703.pythonanywhere.com/consulta1')
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
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top 5 Departments by Number of Events',
            },
        },
    };

    return (
        <div>
            <h1 className={styles.title}>Consulta 3: Gráfico top 5 de eventos</h1>
            {loading ? <p>Loading...</p> : <Bar data={chartData} options={options} />}
        </div>
    );
};

export default Consulta3;
