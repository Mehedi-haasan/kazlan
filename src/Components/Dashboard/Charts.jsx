import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Charts = ({text}) => {

    const options = {
        title: {
            text: `${text}`
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Apple", y: 10 },
                { label: "Orange", y: 45 },
                { label: "Banana", y: 25 },
                { label: "Mango", y: 30 },
                { label: "Grape", y: 28 }
            ]
        }]
    };
    return (
        <div>
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
        </div>
    )
}

export default Charts;
