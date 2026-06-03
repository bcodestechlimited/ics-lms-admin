import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MainBtn } from "../../components/button";
import ChartWrapper from "../../components/chart-wrapper";
import Loader from "../../components/loader";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {
  useGetCoursesByCategory,
  useGetCoursesCreatedOverTime,
  useGetEnrollmentCounts,
  useGetSkillLevelDistribution,
  useGetTopEnrolledCourses,
  useGetUserGrowth,
  useGetUserEngagement,
  useGetUserEnrollmentStats,
} from "../../hooks/useAnalytics";

const KPICard = ({ title, value, loading }) => (
  <div className="p-5 border rounded-2xl bg-white shadow-sm flex flex-col justify-center">
    <h3 className="text-sm font-medium text-gray-500 satoshi">{title}</h3>
    {loading ? (
      <div className="mt-2 h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
    ) : (
      <h4 className="text-3xl font-bold text-skyblue mt-1">
        {value?.toLocaleString() || 0}
      </h4>
    )}
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();

  // --- Course Queries ---
  const { data: overTimeRes, isLoading: loadingOverTime } =
    useGetCoursesCreatedOverTime();
  const { data: byCategoryRes, isLoading: loadingCategory } = useGetCoursesByCategory();
  const { data: skillRes, isLoading: loadingSkill } = useGetSkillLevelDistribution();
  const { data: enrollRes, isLoading: loadingEnroll } = useGetEnrollmentCounts();
  const { data: topEnrolledRes, isLoading: loadingTop } = useGetTopEnrolledCourses();

  // --- User Queries ---
  const { data: userGrowthRes, isLoading: loadingUserGrowth } = useGetUserGrowth();
  const { data: engagementRes, isLoading: loadingEngagement } = useGetUserEngagement();
  const { data: statsRes, isLoading: loadingStats } = useGetUserEnrollmentStats();

  // Extract raw data (Fallback to 'data' if 'responseObject' isn't used by the new endpoints)
  const engagementData = engagementRes?.responseObject || engagementRes?.data;
  const learningStats = statsRes?.responseObject || statsRes?.data;

  // --- Data Processing (Memoized for Performance) ---
  const courseOverTime = useMemo(() => {
    const raw = overTimeRes?.responseObject ?? [];
    const filtered = raw.filter((d) => d.date != null && d.count != null);
    return {
      categories: filtered.map((d) => String(d.date)),
      series: filtered.map((d) => Number(d.count)),
    };
  }, [overTimeRes]);

  const userGrowth = useMemo(() => {
    const raw = userGrowthRes?.responseObject || userGrowthRes?.data || [];
    const filtered = raw.filter((d) => d.date != null && d.count != null);
    return {
      categories: filtered.map((d) => String(d.date)),
      series: filtered.map((d) => Number(d.count)),
    };
  }, [userGrowthRes]);

  const categoryData = useMemo(() => {
    const raw = byCategoryRes?.responseObject ?? [];
    const filtered = raw.filter((d) => d._id != null && d.count != null);
    return {
      labels: filtered.map((d) => String(d._id)),
      series: filtered.map((d) => Number(d.count)),
    };
  }, [byCategoryRes]);

  const skillData = useMemo(() => {
    const raw = skillRes?.responseObject ?? [];
    const filtered = raw.filter((d) => d._id != null && d.count != null);
    return {
      labels: filtered.map((d) => String(d._id)),
      series: filtered.map((d) => Number(d.count)),
    };
  }, [skillRes]);

  const enrollData = useMemo(() => {
    const raw = enrollRes?.responseObject ?? [];
    const filtered = raw.filter((d) => d.title != null && d.enrollmentCount != null);
    return {
      categories: filtered.map((d) => String(d.title)),
      series: filtered.map((d) => Number(d.enrollmentCount)),
    };
  }, [enrollRes]);

  const topData = useMemo(() => {
    const raw = topEnrolledRes?.responseObject ?? [];
    const filtered = raw.filter((d) => d.title != null && d.enrollmentCount != null);
    return {
      categories: filtered.map((d) => String(d.title)),
      series: filtered.map((d) => Number(d.enrollmentCount)),
    };
  }, [topEnrolledRes]);

  // --- Chart Configurations ---
  const createdOptions = {
    chart: { id: "courses-over-time" },
    xaxis: { categories: courseOverTime.categories },
    stroke: { curve: "smooth" },
    title: { text: "Courses Created Over Time", align: "center" },
  };

  const userGrowthOptions = {
    chart: { id: "user-growth" },
    xaxis: { categories: userGrowth.categories },
    stroke: { curve: "smooth" },
    colors: ["#0ea5e9"], // Different color to distinguish from courses
    title: { text: "New Users Joined", align: "center" },
  };

  const categoryOptions = {
    labels: categoryData.labels,
    title: { text: "Courses by Category", align: "center" },
  };

  const skillOptions = {
    labels: skillData.labels,
    title: { text: "Courses by Skill Level", align: "center" },
    plotOptions: { pie: { donut: { size: "60%" } } },
  };

  const enrollOptions = {
    chart: { id: "enroll-counts" },
    xaxis: { categories: enrollData.categories },
    title: { text: "Enrollments per Course", align: "center" },
  };

  const topOptions = {
    chart: { stacked: false },
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: topData.categories },
    title: { text: "Top 5 Enrolled Courses", align: "center" },
  };

  return (
    <div>
      <MainContainer>
        <MainHeader text={"Dashboard"} small={"A quick glance "} />

        <div className="w-full bg-white border rounded-3xl p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base text-skyblue font-bold satoshi">Overview</h3>
            <MainBtn
              onClick={() => navigate("/courses/add-course")}
              text={"Add course"}
            />
          </div>

          {/* New KPI Grid Section */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-5">
            <KPICard
              title="Total Users"
              value={engagementData?.total}
              loading={loadingEngagement}
            />
            <KPICard
              title="Monthly Active Users"
              value={engagementData?.MAU}
              loading={loadingEngagement}
            />
            <KPICard
              title="Active Enrollments"
              value={learningStats?.totalActiveEnrollments}
              loading={loadingStats}
            />
            {/* <KPICard
              title="Assigned Courses"
              value={learningStats?.totalAssignedEnrollments}
              loading={loadingStats}
            />*/}
          </div>

          <div className="mt-10 flex flex-col lg:flex-row gap-6">
            <div className="w-full overflow-y-scroll rounded-2xl p-4 bg-gray-50/50">
              <h3 className="text-xl text-skyblue font-bold satoshi mb-5">
                Analytics & Trends
              </h3>

              <div className="space-y-8 grid lg:grid-cols-2 gap-8 items-start">
                {/* User Growth Over Time */}
                {loadingUserGrowth ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="area"
                    options={userGrowthOptions}
                    series={[{ name: "New Users", data: userGrowth.series }]}
                  />
                )}

                {/* Courses Created Over Time */}
                {loadingOverTime ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="line"
                    options={createdOptions}
                    series={[{ name: "New Courses", data: courseOverTime.series }]}
                  />
                )}

                {/* Top 5 Enrolled Courses */}
                {loadingTop ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="bar"
                    options={topOptions}
                    series={[{ name: "Enrollments", data: topData.series }]}
                  />
                )}

                {/* Courses by Category */}
                {loadingCategory ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="pie"
                    options={categoryOptions}
                    series={categoryData.series}
                  />
                )}

                {/* Courses by Skill Level */}
                {loadingSkill ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="donut"
                    options={skillOptions}
                    series={skillData.series}
                  />
                )}
              </div>

              {/* Full Width Enrollment Counts */}
              <div className="w-full mt-8">
                {loadingEnroll ? (
                  <Loader />
                ) : (
                  <ChartWrapper
                    type="bar"
                    options={enrollOptions}
                    series={[{ name: "Enrollments", data: enrollData.series }]}
                    height={400}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default DashboardPage;
