import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import styles from './Consulta2.module.css'

const Consulta2 = () => {
    const [eventData, setEventData] = useState([]);
    const [eventCounts, setEventCounts] = useState({});

    useEffect(() => {
        axios.get('https://ceesar1703.pythonanywhere.com/events')
            .then(response => {
                setEventData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const counts = {};
        eventData.forEach(event => {
            const year = event.Año;
            counts[year] = (counts[year] || 0) + 1;
        });
        setEventCounts(counts);
    }, [eventData]);

    useEffect(() => {
        console.log("EventCounts: ", eventCounts);
    }, [eventCounts]);

    const options = {
        chart: {
            type: 'line'
        },
        xaxis: {
            categories: Object.keys(eventCounts)
        },
        colors: ['#1F3075'],

    };

    const series = [{
        name: `Eventos: `,
        data: Object.values(eventCounts)
    }];

    return (
        <div>
            <h1 className={styles.title}>Consulta 2: Eventos por año</h1>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default Consulta2;
