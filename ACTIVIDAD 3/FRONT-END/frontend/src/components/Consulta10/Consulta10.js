// src/components/Consulta10.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Consulta10 = () => {
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
        <div>
            <h2>Consulta 10 - Porcentaje de Eventos por Año Reportados por la UNGRD</h2>
            <div style={{ width: '50%', margin: '0 auto' }}>
                {chartData && <Pie data={chartData} />}
            </div>
        </div>
    );
};

export default Consulta10;
