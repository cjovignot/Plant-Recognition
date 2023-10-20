import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function Donut({ series }) {
    console.log("series =>", series)

    const options = {
        labels: ['Correct', 'False'],
        chart: {
            type: 'donut',
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
        }],
    };

    const [chartData, setChartData] = useState({
        options: options,
        series: series,
    });

    return (
        <div className="donut">
            <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
        </div>
    );
}

export default Donut;