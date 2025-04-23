import React from "react";
import {AiFillEye} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {MainBtn} from "../../components/button";
import AreaChart from "../../components/charts/area";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";

const DashboardPage = () => {
  const navigate = useNavigate();

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
            <div className="lg:w-[40%] border rounded-2xl">
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
            </div>
            <div className="lg:w-[60%] overflow-y-scroll rounded-2xl p-4 border">
              <h3 className="text-xl text-skyblue font-bold satoshi">
                Students
              </h3>
              <div className="mt-5"></div>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default DashboardPage;
