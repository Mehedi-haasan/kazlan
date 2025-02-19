import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts7 = ({ month }) => {
  console.log(month)
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Sales Data"
    },
    axisX: {
      valueFormatString: "DD MMM" // Display day and month
    },
    axisY: {
      prefix: "Tk",
      labelFormatter: addSymbols
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "column",
        name: "Actual Sales",
        showInLegend: false,
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "Tk#,##0",
        dataPoints: month
      },
      {
        type: "line",
        name: "Expected Sales",
        showInLegend: false,
        yValueFormatString: "Tk#,##0",
        dataPoints: month
      },
      {
        type: "area",
        name: "Profit",
        markerBorderColor: "white",
        markerBorderThickness: 2,
        showInLegend: false,
        yValueFormatString: "Tk#,##0",
        dataPoints: month
      }
    ]
  };

  function addSymbols(e) {
    const suffixes = ["", "K", "M", "B"];
    const order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    const suffix = suffixes[Math.min(order, suffixes.length - 1)];
    return CanvasJSReact.CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
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

export default Charts7;
