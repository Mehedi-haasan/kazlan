import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts5 = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Server CPU Utilization vs Active Users"
    },
    axisX: {
      title: "Active Users"
    },
    axisY: {
      title: "CPU Utilization",
      suffix: "%"
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      type: "scatter",
      name: "Server 1",
      showInLegend: true,
      toolTipContent: "<span style=\"color:#4F81BC \">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%",
      dataPoints: [
        { x: 100, y: 10 },
        { x: 110, y: 15 },
        { x: 130, y: 17 },
        { x: 140, y: 19 },
        { x: 145, y: 21 },
        { x: 400, y: 25 },
        { x: 430, y: 27 },
        { x: 444, y: 30 },
        { x: 460, y: 29 },
        { x: 490, y: 35 },
        { x: 500, y: 40 },
        { x: 510, y: 50 },
        { x: 600, y: 30 },
        { x: 700, y: 35 },
        { x: 800, y: 40 },
        { x: 900, y: 45 },
        { x: 1000, y: 47 },
        { x: 1200, y: 55 },
        { x: 1230, y: 51 },
        { x: 1300, y: 60 },
        { x: 1330, y: 65 },
        { x: 1400, y: 70 },
        { x: 1450, y: 71 },
        { x: 1500, y: 69 },
        { x: 1530, y: 75 },
        { x: 1590, y: 79 },
        { x: 1600, y: 62 },
        { x: 1620, y: 80 },
        { x: 1640, y: 85 },
        { x: 1700, y: 81 },
        { x: 1790, y: 89 },
        { x: 1800, y: 91 },
        { x: 1950, y: 93 },
        { x: 1980, y: 88 },
        { x: 2000, y: 90 }
      ]
    },
    {
      type: "scatter",
      name: "Server 2",
      showInLegend: true,
      markerType: "triangle",
      toolTipContent: "<span style=\"color:#C0504E \">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%",
      dataPoints: [
        { x: 100, y: 25 },
        { x: 110, y: 35 },
        { x: 130, y: 35 },
        { x: 140, y: 40 },
        { x: 145, y: 45 },
        { x: 400, y: 42 },
        { x: 430, y: 32 },
        { x: 444, y: 35 },
        { x: 460, y: 43 },
        { x: 490, y: 50 },
        { x: 500, y: 57 },
        { x: 510, y: 67 },
        { x: 600, y: 40 },
        { x: 700, y: 46 },
        { x: 800, y: 50 },
        { x: 900, y: 60 },
        { x: 1000, y: 66 },
        { x: 1200, y: 79 },
        { x: 1230, y: 60 },
        { x: 1300, y: 75 },
        { x: 1330, y: 80 },
        { x: 1400, y: 82 },
        { x: 1450, y: 88 },
        { x: 1500, y: 87 },
        { x: 1530, y: 88 },
        { x: 1590, y: 90 },
        { x: 1600, y: 80 },
        { x: 1620, y: 93 },
        { x: 1640, y: 91 },
        { x: 1700, y: 92 },
        { x: 1790, y: 93 },
        { x: 1800, y: 90 },
        { x: 1950, y: 91 },
        { x: 1980, y: 93 },
        { x: 2000, y: 95 }
      ]
    }]
  };

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts5;
