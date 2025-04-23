import React from "react";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";

import {useNavigate} from "react-router-dom";
import AsessChart from "../../assets/assess.svg";
import MetricChart from "../../assets/metricschart.svg";
import UserChart from "../../assets/userchart.svg";

const ReportsPage = () => {
  return (
    <div>
      <MainContainer>
        <MainHeader text={"Report"} />
        <div className="w-full bg-white rounded-3xl p-4">
          <h1 className="text-xl satoshi font-bold text-secondary">
            Financial Metrics
          </h1>
          <div
            style={{
              borderRadius: "12px",
            }}
            className="mt-8 lg:h-40 py-6 lg:py-0 px-6 grid lg:grid-cols-2 gap-6 items-center border"
          ></div>
          <div className="mt-10">
            <h3 className="text-xl satoshi font-bold text-secondary">
              Course & Content Metrics
            </h3>
          </div>
          <div className="mt-10">
            <h3 className="text-xl satoshi font-bold text-secondary">
              Assessment and Certification
            </h3>
            <AssessmentSection />
          </div>
          <div className="mt-10">
            <h3 className="text-xl satoshi font-bold text-secondary">
              User Progress & Completion
            </h3>
            <UserSection />
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

const AssessmentSection = () => {
  const navigate = useNavigate();
  const Arr = [];
  return (
    <div className="mt-4 grid lg:grid-cols-2 gap-8">
      <div
        style={{
          borderRadius: "12px",
        }}
        className="lg:h-48 p-4 border"
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base text-secondary font-medium satoshi">
              Assessment Score Courses
            </h5>
          </div>
          <h6
            onClick={() => navigate("/reports/assessment")}
            className="text-sm font-medium satoshi text-myblue underline cursor-pointer"
          >
            View
          </h6>
        </div>{" "}
        <ul className="mt-4 list-decimal px-2">
          {Arr?.map((item, i) => (
            <li style={{}} className="pb-2 border-b">
              <div className="flex justify-between px-5">
                <h6 className="text-main pt-1 capitalize text-sm satoshi font-normal">
                  {item?.name}
                </h6>
                <h6 className="text-main pt-1 capitalize text-sm satoshi font-normal">
                  {item?.registered}
                </h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          borderRadius: "12px",
        }}
        className="lg:h-48 p-4 border"
      >
        {" "}
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base text-secondary font-medium satoshi">
              Certificates Issued
            </h5>
          </div>
          <h6 className="text-sm font-medium satoshi text-myblue underline cursor-pointer">
            View
          </h6>
        </div>
        <div className="flex gap-5 items-center justify-between mt-4">
          <img src={AsessChart} alt="" className="" />
          <div className="space-y-2">
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#0269D0]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  All Certificate issued{" "}
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"certificate"} /> */}
              </h6>
            </div>
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#FF3739]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  Certificates not issued{" "}
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"not-certificate"} /> */}
              </h6>
            </div>
            <div className="flex justify-between items-center h-full gap-6">
              <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                Total Registed Courses
              </h6>

              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"total"} /> */}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSection = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 grid lg:grid-cols-2 gap-8">
      <div
        style={{
          borderRadius: "12px",
        }}
        className="lg:h-48 p-4 border"
      >
        {" "}
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base text-secondary font-medium satoshi">
              Progress Tracking
            </h5>
          </div>
          <h6
            onClick={() => navigate("/reports/progress")}
            className="text-sm font-medium satoshi text-myblue underline cursor-pointer"
          >
            View
          </h6>
        </div>
        <div className="flex gap-5 items-center justify-between mt-4">
          <img src={UserChart} alt="" className="" />
          <div className="space-y-2">
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#1300F2]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  Ongoing Courses
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={""} /> */}
              </h6>
            </div>
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#C59300]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  Locked Courses{" "}
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"lock-out"} /> */}
              </h6>
            </div>
            <div className="flex justify-between items-center h-full gap-6">
              <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                Total Registered Courses
              </h6>

              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"total"} /> */}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          borderRadius: "12px",
        }}
        className="lg:h-48 p-4 border"
      >
        {" "}
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base text-secondary font-medium satoshi">
              Completed
            </h5>
          </div>
          <h6 className="text-sm font-medium satoshi text-myblue underline cursor-pointer">
            View
          </h6>
        </div>
        <div className="flex gap-5 items-center justify-between mt-4">
          <img src={MetricChart} alt="" className="" />
          <div className="space-y-2">
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#006A0B]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  Completed{" "}
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"completed"} /> */}
              </h6>
            </div>
            <div className="flex justify-between items-center h-full gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#FF3739]"></div>
                <h6 className="text-sm pt-1 satoshi font-normal text-secondary">
                  Not completed{" "}
                </h6>
              </div>
              <h6 className="text-sm satoshi pt-1 font-normal text-secondary">
                {/* <CourseDashTable type={"not-completed"} /> */}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
