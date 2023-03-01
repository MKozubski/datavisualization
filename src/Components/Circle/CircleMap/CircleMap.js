import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import csv from "./CCIN12533_20151217_Pellet_Transects_Data_Cambridge_Bay_2015.csv";

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csv);
      const text = await response.text();
      const rows = text.split("\n");
      const headers = rows[0].split(",");
      const values = rows.slice(1).map((row) => row.split(","));
      const formattedData = headers.reduce(
        (acc, header, index) => ({
          ...acc,
          [header]: values.map((value) => parseFloat(value[index]))
        }),
        {}
      );
      setData(formattedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const chartConfig = {
      type: "line",
      data: {
        labels: data[Object.keys(data)[0]].map((_, index) => index),
        datasets: Object.keys(data).map((header) => ({
          label: header,
          data: data[header],
          fill: false,
          borderColor: getRandomColor()
        }))
      },
      options: {
        responsive: true,
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: "Line Chart"
          },
          tooltip: {
            mode: "index"
          },
          legend: {
            position: "top"
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Sample Index"
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value"
            }
          }
        }
      }
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    const chart = new Chart(ctx, chartConfig);
    return () => chart.destroy();
  }, [data]);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return <canvas id="line-chart" />;
};

export default LineChart;
