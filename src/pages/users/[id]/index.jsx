import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../components/maincontainer";
import MainHeader from "../../../components/mainheader";
import {SearchInput} from "../../../components/inputs";
import {MainBtn} from "../../../components/button";

const UserDetails = () => {
  const {id} = useParams(),
    navigate = useNavigate();
  return (
    <div>
      <MainContainer>
        <MainHeader text={id || "Students"} small={`All ${id || "Students"}`} />
        <div className="w-full bg-white rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <h5 className="text-base text-skyblue font-bold satoshi capitalize">
                All {id || "Students"}
              </h5>
              <SearchInput />
            </div>
            <MainBtn
              text={"Bulk Upload"}
              onClick={() => navigate("/bulk-upload", {state: id})}
            />
          </div>
          <div className="mt-8"></div>
        </div>
      </MainContainer>
    </div>
  );
};

export default UserDetails;
