import React from "react";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import {SearchInput} from "../../components/inputs";

const Students = () => {
  return (
    <div>
      <MainContainer>
        <MainHeader text={"Students"} small={"234 students"} />
        <div className="w-full bg-white rounded-3xl p-4">
          <div className="flex gap-4 items-center">
            <h5 className="text-base text-skyblue font-bold satoshi">
              All Students
            </h5>
            <SearchInput />
          </div>
          <div className="mt-8"></div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Students;
