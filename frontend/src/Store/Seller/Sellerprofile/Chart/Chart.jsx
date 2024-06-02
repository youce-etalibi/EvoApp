import React from 'react';
import './Chart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Chartex = ({ salleproducts }) => {
    const sortedProducts = [...salleproducts].sort((a, b) => b.count - a.count);

    const productNames = sortedProducts.map(product => product.product.title);
    const quantities = sortedProducts.map(product => product.count);

    const backgroundColors = sortedProducts.map((_, index) => {
        const colors = [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
        ];
        return colors[index % colors.length]; // Repeat colors if there are more than the available colors
    });

    const data = {
        labels: productNames,
        datasets: [
            {
                label: 'Top Product',
                data: quantities,
                backgroundColor: backgroundColors,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Data by Count',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
            },
        },
    };

    return (
        <div className='card-5'>
            <Bar data={data} options={options} />
        </div>
    );
};
