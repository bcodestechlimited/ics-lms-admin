import { useGetUserCourseAnalytics } from "../hooks/useUser";
import Loader from "./loader";

const Card = ({ title, value, color, loading }) => {
  return (
    <div
      className="flex gap-x-2 p-3 rounded-lg items-baseline border justify-start text-[#0B2239]"
      style={{ backgroundColor: color, width: "100%", height: "88px" }}
    >
      <div className="text-[32px] font-medium text-black">
        {loading ? (
          <div className="h-6 w-6">
            <Loader />
          </div>
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-gray-700">{title}</div>
    </div>
  );
};

const CardList = ({ userId }) => {
  const { data, isLoading } = useGetUserCourseAnalytics(userId);
  const response = data?.responseObject?.data;
  const Arr = [
    { title: "Total Courses", value: response?.totalCourses || "0" },
    { title: "In-progress", value: response?.enrolledCourses || "0" },
    { title: "Completed", value: response?.completedCourses || "0" },
    { title: "Certificates earned", value: response?.certifiedCourses || "0" },
  ];

  const colors = [
    "#04A7A714",
    "#F182D914",
    // "#0269D014",
    "#00C54314",
    "#00B7D014",
  ];

  return (
    <div className="grid grid-cols-4 justify-between gap-x-[24px]">
      {Arr.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          value={item.value}
          color={colors[index]}
          loading={isLoading}
        />
      ))}
    </div>
  );
};

export default CardList;
