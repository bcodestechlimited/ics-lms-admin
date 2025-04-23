import { PenIcon } from "lucide-react";
import ReactApexChart from "react-apexcharts";

export const ChartDisplay = ({ type, data, onEdit }) => {
  return (
    <div className="relative w-full h-[400px] border rounded-lg p-4">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type={type}
        height="100%"
        width="100%"
      />
      <button
        onClick={onEdit}
        className="absolute top-4 right-[60px] p-1 bg-white rounded-md shadow-sm hover:bg-gray-50"
      >
        <PenIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
