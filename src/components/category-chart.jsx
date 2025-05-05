import React from "react";
import ChartWrapper from "./chart-wrapper";
import {useGetCoursesByCategory} from "../hooks/useAnalytics";

export default function CategoryChart() {
  const {data = [], isLoading, error} = useGetCoursesByCategory();

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error loading data</div>;

  const options = {
    labels: data.map((d) => d._id),
    title: {text: "Courses by Category", align: "center"},
  };
  const series = data.map((d) => d.count);

  return <ChartWrapper type="pie" options={options} series={series} />;
}
