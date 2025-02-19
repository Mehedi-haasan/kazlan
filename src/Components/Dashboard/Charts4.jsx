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
        { y: 450, name: "Rent" },
        { y: 120, name: "Insurance" },
        { y: 300, name: "Travelling" },
        { y: 800, name: "Staf Cost" },
        { y: 150, name: "Electricity bill" },
        { y: 150, name: "Shopping" },
        { y: 250, name: "Others" }
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
