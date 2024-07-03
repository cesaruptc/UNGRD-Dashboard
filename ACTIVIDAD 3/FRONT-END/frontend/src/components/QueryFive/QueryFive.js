import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from "./QueryFive.module.css"
import Chart from "react-apexcharts";

const QueryFive = () => {
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
            categories: Object.keys(eventCounts),
            labels: {
                style: {
                    colors: '#B8B8CF'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#B8B8CF'
                }
            }
        },
        colors: ['#1F3075'],

    };

    const series = [{
        name: `Eventos: `,
        data: Object.values(eventCounts)
    }];

    return (
        <div className={styles.reportContent}>
            <div className={styles.legend}>
                <h2 className={styles.title}>Eventos por año:</h2>
            </div>
            <div className={styles.report}>
                <Chart options={options} series={series} type="line" height={200} />
            </div>
        </div>
    );
};

export default QueryFive;
