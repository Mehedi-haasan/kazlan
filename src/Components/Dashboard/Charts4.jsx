import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts4 = () => {
  const options = {
    theme: "dark2",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Monthly Expense"
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "doughnut",
      innerRadius: 90,
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: [
        { y: 12000, name: "Rent" },
        { y: 2000, name: "Insurance" },
        { y: 3000, name: "Travelling" },
        { y: 800, name: "Staf Cost" },
        { y: 1500, name: "Electricity bill" },
        { y: 3000, name: "Breakfast" },
        { y: 30000, name: "Staff Bill" }
      ]
    }]
  };

  function explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts4;
