import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function Donut({ series }) {
    console.log("series =>", series)

    const correct = series[0];
    const incorrect = series[1];
    const ratio = `${correct}/${incorrect}`;

    const options = {
        labels: ['Validé', 'A revoir'],
        chart: {
            type: 'donut',
        },
        colors: ['#49a14c', '#f35b5b'],
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            pie: {
                customScale: 0.8,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: '#373d3f',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: '#373d3f',
                            offsetY: 16,
                            formatter: function (val) {
                                return val;
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#373d3f',
                            formatter: function (w) {
                                return ratio;
                            }
                        }
                    }
                }
            }
        },
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