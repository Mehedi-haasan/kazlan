import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const { CanvasJSChart } = CanvasJSReact;

const DailySalse = ({ hourSales }) => {

  const options = {
    animationEnabled: true,
    title: {
      text: "Daily Sales Data",
    },
    axisX: {
      // title: "Time",
      valueFormatString: "hh TT",
      interval: 1,
      intervalType: "hour",
    },
    axisY: {
      // title: "Sales ($)",
      valueFormatString: "#,##0",
      prefix: "Tk ",
    },
    data: [
      {
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        markerSize: 5,
        xValueFormatString: "hh TT",
        yValueFormatString: "$#,##0",
        dataPoints: hourSales,
      },
    ],
  };



  return (
    <div className='border rounded-xl overflow-hidden border-l-4 border-b-4 border-blue-500'>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DailySalse;
