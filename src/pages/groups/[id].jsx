import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import SelectCourseModal from "../../components/modal/selectcourse";
import AddMemberModal from "../../components/modals/addmembermodal";

import {useGroupsStore} from "../../data/stores/loggerstore";
// import useSocketStore from "../../data/stores/socketstore";

const GroupDetails = () => {
  const [tab, setTab] = useState("members"),
    [modal, setModal] = useState(""),
    [item, setItem] = useState(""),
    tabs = [
      "members",
      // "instructors",
      "courses",
    ],
    {data} = useGroupsStore(),
    [mainState, setMainState] = useState(null),
    {state} = useLocation();

  useEffect(() => {
    data?.docs?.map((it) => it?._id === state?._id && setMainState(it));
  }, [data, state]);

  return (
    <div>
      <MainContainer>
        <MainHeader text={"All Groups"} small={"334 Groups"} />
        <div className="bg-white mt-8 rounded-xl noScroll p-6">
          <h5 className="text-xl font-bold text-secondary">
            {mainState?.title}
          </h5>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-6">
              {tabs?.map((t) => (
                <button
                  onClick={() => {
                    setTab(t);
                    setItem(null);
                  }}
                  className={`h-10 px-4 rounded-full text-[#0269D0] text-base font-medium satoshi capitalize ${
                    tab === t ? "bg-[#D9ECFF]" : "bg-transparent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-5 items-center">
              <strong className="text-base font-medium text-[#E34033] satoshi border-b border-b-[#E34033]">
                Delete Group
              </strong>
              {tab === "members" ? (
                <button
                  onClick={() => {
                    setModal("add-member");
                    setItem(null);
                  }}
                  className="h-10 px-4 rounded-full text-[#0269D0] text-base font-medium satoshi capitalize bg-[#D9ECFF]"
                >
                  Add Member
                </button>
              ) : tab === "courses" ? (
                <button
                  onClick={() => {
                    setModal("add-courses");
                    setItem(null);
                  }}
                  className="h-10 px-4 rounded-full text-[#0269D0] text-base font-medium satoshi capitalize bg-[#D9ECFF]"
                >
                  Assign Courses
                </button>
              ) : tab === "instructors" ? (
                <button
                  onClick={() => {
                    setModal("add-instructor");
                    setItem(null);
                  }}
                  className="h-10 px-4 rounded-full text-[#0269D0] text-base font-medium satoshi capitalize bg-[#D9ECFF]"
                >
                  Add Instructor
                </button>
              ) : null}
              {mainState?.chat && (
                <Button
                  onClick={() => {
                    setTab("chat");
                    setItem(null);
                  }}
                >
                  Chat
                </Button>
              )}
              {/* <Button>Export</Button> */}
            </div>
          </div>
        </div>
      </MainContainer>
      {["add-member", "add-instructor"]?.includes(modal) && (
        <AddMemberModal
          handleClose={() => setModal("")}
          title={modal === "add-member" ? "Member" : "Instructor"}
          name={modal === "add-member" ? "members" : "instructors"}
        />
      )}
      {modal === "add-courses" && (
        <SelectCourseModal handleClose={() => setModal("")} />
      )}
      {/* {modal === "add-instructor" && (
				<AddInstructorModal handleClose={() => setModal("")} />
			)} */}
    </div>
  );
};

export default GroupDetails;

