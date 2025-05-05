import React from "react";
import Chart from "react-apexcharts";

export default function ChartWrapper({type, options, series, height}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Chart
        options={options}
        series={series}
        type={type}
        height={height || 400}
      />
    </div>
  );
}
