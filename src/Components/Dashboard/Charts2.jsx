import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts2 = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const getDataPointsFromCSV = (csv) => {
      const csvLines = csv.split(/[\r?\n|\r|\n]+/);
      const points = csvLines.map(line => {
        if (line.length > 0) {
          const point = line.split(",");
          return {
            x: new Date(
              parseInt(point[0].split("-")[0]),
              parseInt(point[0].split("-")[1]) - 1, // Months are 0-based in JS
              parseInt(point[0].split("-")[2])
            ),
            y: [
              parseFloat(point[1]),
              parseFloat(point[2]),
              parseFloat(point[3]),
              parseFloat(point[4])
            ]
          };
        }
        return null;
      }).filter(point => point !== null);

      setDataPoints(points);
    };

    fetch("https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv")
      .then(response => response.text())
      .then(csv => getDataPointsFromCSV(csv));
  }, []);

  const options = {
    animationEnabled: true,
    theme: "light2",
    exportEnabled: true,
    title: {
      text: "Stock Price in 2024"
    },
    subtitles: [{
      text: "Weekly Averages"
    }],
    axisX: {
      interval: 1,
      valueFormatString: "MMM"
    },
    axisY: {
      prefix: "$",
      title: "Price"
    },
    toolTip: {
      content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
    },
    data: [{
      type: "candlestick",
      yValueFormatString: "$##0.00",
      dataPoints: dataPoints
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts2;
