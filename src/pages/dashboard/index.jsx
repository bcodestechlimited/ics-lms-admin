import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {MainBtn} from "../../components/button";
import ChartWrapper from "../../components/chart-wrapper";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {
  useGetCoursesByCategory,
  useGetCoursesCreatedOverTime,
  useGetEnrollmentCounts,
  useGetSkillLevelDistribution,
  useGetTopEnrolledCourses,
} from "../../hooks/useAnalytics";
import Loader from "../../components/loader";

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    data: overTimeRes,
    isLoading: loadingOverTime,
    error: errorOverTime,
  } = useGetCoursesCreatedOverTime();
  const {
    data: byCategoryRes,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useGetCoursesByCategory();
  const {
    data: skillRes,
    isLoading: loadingSkill,
    error: errorSkill,
  } = useGetSkillLevelDistribution();
  const {
    data: enrollRes,
    isLoading: loadingEnroll,
    error: errorEnroll,
  } = useGetEnrollmentCounts();
  const {
    data: topEnrolledRes,
    isLoading: loadingTop,
    error: errorTop,
  } = useGetTopEnrolledCourses();

  const overTimeRaw = overTimeRes?.responseObject ?? [];
  const overTimeData = overTimeRaw.filter(
    (d) => d.date != null && d.count != null
  );
  const overTimeCats = overTimeData.map((d) => String(d.date));
  const overTimeCounts = overTimeData.map((d) => Number(d.count));

  const categoryRaw = byCategoryRes?.responseObject ?? [];
  const categoryData = categoryRaw.filter(
    (d) => d._id != null && d.count != null
  );
  const categoryCats = categoryData.map((d) => String(d._id));
  const categoryCnts = categoryData.map((d) => Number(d.count));

  const skillRaw = skillRes?.responseObject ?? [];
  const skillData = skillRaw.filter((d) => d._id != null && d.count != null);
  const skillCats = skillData.map((d) => String(d._id));
  const skillCnts = skillData.map((d) => Number(d.count));

  const enrollRaw = enrollRes?.responseObject ?? [];
  const enrollData = enrollRaw.filter(
    (d) => d.title != null && d.enrollmentCount != null
  );
  const enrollCats = enrollData.map((d) => String(d.title));
  const enrollCnts = enrollData.map((d) => Number(d.enrollmentCount));

  const topRaw = topEnrolledRes?.responseObject ?? [];
  const topData = topRaw.filter(
    (d) => d.title != null && d.enrollmentCount != null
  );
  const topCats = topData.map((d) => String(d.title));
  const topEnrollCnt = topData.map((d) => Number(d.enrollmentCount));

  // --- chart configurations ---
  const createdOptions = {
    chart: {id: "courses-over-time"},
    xaxis: {categories: overTimeCats},
    stroke: {curve: "smooth"},
    title: {text: "Courses Created Over Time", align: "center"},
  };
  const createdSeries = [{name: "New Courses", data: overTimeCounts}];

  const categoryOptions = {
    labels: categoryCats,
    title: {text: "Courses by Category", align: "center"},
  };
  const categorySeries = categoryCnts;

  const skillOptions = {
    labels: skillCats,
    title: {text: "Courses by Skill Level", align: "center"},
    plotOptions: {pie: {donut: {size: "60%"}}},
  };
  const skillSeries = skillCnts;

  const enrollOptions = {
    chart: {id: "enroll-counts"},
    xaxis: {categories: enrollCats},
    title: {text: "Enrollments per Course", align: "center"},
  };
  const enrollSeries = [{name: "Enrollments", data: enrollCnts}];

  const topOptions = {
    chart: {stacked: false},
    plotOptions: {bar: {horizontal: true}},
    xaxis: {categories: topCats},
    title: {text: "Top 5 Enrolled Courses", align: "center"},
  };
  const topSeries = [{name: "Enrollments", data: topEnrollCnt}];

  return (
    <div>
      <MainContainer>
        <MainHeader text={"Dashboard"} small={"A quick glance "} />
        <div className="w-full bg-white rounded-3xl p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base text-skyblue font-bold satoshi">
              Overview
            </h3>
            <MainBtn
              onClick={() => navigate("/courses/add-course")}
              text={"Add course"}
            />
          </div>
          <div className="mt-8 grid lg:grid-cols-4 gap-5"></div>
          <div className="mt-10 flex flex-col lg:flex-row gap-6">
            {/* <div className="lg:w-[40%] border rounded-2xl">
              <div className="p-5 border-b">
                <h3 className="text-xl text-skyblue font-bold satoshi">
                  Website Impressions
                </h3>
                <div className="flex mt-2 gap-1 items-center">
                  <div className="h-8 w-8 bg-[#D9D9D966] rounded-lg flex items-center justify-center">
                    <AiFillEye />
                  </div>
                  <h6 className="text-xl pt-1 font-medium satoshi text-secondary">
                    67 <span className="smallText">views</span>
                  </h6>
                </div>
              </div>
              <div className="">
                <h6 className="text-base p-5 font-medium text-skyblue satoshi">
                  Performance
                </h6>
                <AreaChart />
              </div>
            </div> */}

            <div className="w-full overflow-y-scroll rounded-2xl p-4">
              <h3 className="text-xl text-skyblue font-bold satoshi">
                Course Analytics
              </h3>
              <div className="mt-5 space-y-8 grid grid-cols-2 gap-8">
                {/* Courses Created Over Time */}
                {loadingOverTime ? (
                  <div>
                    <Loader />
                  </div>
                ) : errorOverTime ? (
                  <p>Error loading data</p>
                ) : (
                  <ChartWrapper
                    type="line"
                    options={createdOptions}
                    series={createdSeries}
                  />
                )}

                {/* Courses by Category */}
                {loadingCategory ? (
                  <div>
                    <Loader />
                  </div>
                ) : errorCategory ? (
                  <p>Error loading data</p>
                ) : (
                  <ChartWrapper
                    type="pie"
                    options={categoryOptions}
                    series={categorySeries}
                  />
                )}

                {/* Courses by Skill Level */}
                {loadingSkill ? (
                  <div>
                    <Loader />
                  </div>
                ) : errorSkill ? (
                  <p>Error loading data</p>
                ) : (
                  <ChartWrapper
                    type="donut"
                    options={skillOptions}
                    series={skillSeries}
                  />
                )}

                {/* Top 5 Enrolled Courses */}
                {loadingTop ? (
                  <div>
                    <Loader />
                  </div>
                ) : errorTop ? (
                  <p>Error loading data</p>
                ) : (
                  <ChartWrapper
                    type="bar"
                    options={topOptions}
                    series={topSeries}
                  />
                )}
              </div>

              <div className="w-full mt-5">
                {/* Enrollment Counts */}
                {loadingEnroll ? (
                  <div>
                    <Loader />
                  </div>
                ) : errorEnroll ? (
                  <p>Error loading data</p>
                ) : (
                  <ChartWrapper
                    type="bar"
                    options={enrollOptions}
                    series={enrollSeries}
                    height={500}
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
