import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import './Chart.css';

export const Chartex = ({salleproducts}) => {
    useEffect(()=>{
        var bar = document.getElementById('bar');
        bar.height = 400;
        var barConfig = new Chart(bar, {
            type: 'bar', // Use "bar" for horizontal bar charts in Chart.js 3.x
            data: {
                labels: ['Product1', 'Product2', 'Product3'],
                datasets: [{
                    label: '# of data',
                    data: [30, 25, 20, 15, 11, 4, 2],
                    backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(225, 50, 64, 1)', 'rgba(64, 159, 64, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Set indexAxis to 'y' for horizontal bar charts
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
            }
        });
    }, []);

    return (
                        <div className="card-5">
                            <div className="divider">
                            </div>
                            <div className="bar-chart-container">
                                <canvas className="bar-chart" id="bar">
                                </canvas>
                            </div>
                        </div> 
    );
};
