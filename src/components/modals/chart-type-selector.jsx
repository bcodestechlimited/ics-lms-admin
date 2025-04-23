import { BarChart, LineChart, PieChart } from "lucide-react";

export const ChartTypeSelector = ({ onSelect, position }) => {
  const chartTypes = [
    { type: "bar", icon: BarChart, label: "Bar Chart" },
    { type: "line", icon: LineChart, label: "Line Chart" },
    // { type: "pie", icon: PieChart, label: "Pie Chart" },
  ];

  return (
    <div
      className="absolute bg-white shadow-lg rounded-md p-2 z-10"
      style={{ top: position.y, left: position.x }}
    >
      <div className="space-y-2">
        {chartTypes.map(({ type, icon: Icon, label }) => (
          <div
            key={type}
            onClick={() => onSelect(type)}
            className="flex items-center gap-x-3 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default chart data for each type
export const defaultChartData = {
  bar: {
    series: [
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60],
      },
    ],
    options: {
      chart: { type: "bar" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  },
  line: {
    series: [
      {
        name: "Views",
        data: [10, 41, 35, 51, 49, 62],
      },
    ],
    options: {
      chart: { type: "line" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  },
  pie: {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: { type: "pie" },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
  },
};
