import ReactApexChart from "react-apexcharts";

const AreaChart = () => {
  const months = [
    "Ja",
    "Fe",
    "Ma",
    "Ap",
    "Ma",
    "Ju",
    "Ju",
    "Au",
    "Se",
    "Oc",
    "No",
    "De",
  ];

  const seriesData = [
    100, 340, 550, 660, 655, 666, 120, 780, 900, 1000, 560, 330,
  ];

  const options = {
    chart: {
      type: "area",
      height: 200,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 4,
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        gradientToColors: ["#e1ffeb99"],
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    markers: {
      size: 4,
      colors: ["#e1ffeb99"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Monthly Data",
      data: seriesData,
    },
  ];

  return (
    <div className="area-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        // height={350}
      />
    </div>
  );
};

export default AreaChart;
