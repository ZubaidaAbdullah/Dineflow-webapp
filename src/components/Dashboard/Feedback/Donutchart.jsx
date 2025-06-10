import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const MyChartComponent = ({ bgWidth, bgHeight }) => {
  useEffect(() => {
    let chart = null; // Declare chart variable

    const options = {
      series: [44, 55, 41, 22, 17], // Update this array with your actual data
      chart: {
        type: 'donut',
        width: 400,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%', // Adjust the thickness here
          },
          expandOnClick: false,
          dataLabels: {
            style: {
              colors: ['#000000'],
            },
          },
        },
      },
      colors: ['#C6DEF1', '#FAEDCB', '#DFAF44', '#F08080', '#ADD8E6'],
      legend: {
        position: 'bottom',
        formatter: function (val, opts) {
          const labels = [
            'Outstanding',
            'Satisfactory',
            'Average',
            'Unsatisfactory',
            'Poor',
          ];
          return labels[opts.seriesIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: 'bottom' },
          },
        },
      ],
    };

    const chartElement = document.querySelector('#chart');
    if (chartElement) {
      chart = new ApexCharts(chartElement, options);
      chart.render();
    }

    // Cleanup function
    return () => {
      if (chart) {
        chart.destroy(); // Destroy chart if it exists
      }
    };
  }, []); // Empty dependency array to run this effect only once

  const bgStyle = {
    width: bgWidth,
    height: bgHeight,
    borderRadius: '8px',
    boxShadow: '0px 4px 8px 0px #0000001F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={bgStyle}>
      <div id="chart"></div>
    </div>
  );
};

export default MyChartComponent;
