import React from "react";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader";
import Shell from "../../components/shell";
import CardList from "../../components/student-card";
import {StudentTable} from "../../components/tables/student-table";
import {UserProfile} from "../../components/user-profile";

import {useGetUserById} from "../../hooks/useUser";

export const MainStudentById = () => {
  const params = useParams();
  const {data, isLoading} = useGetUserById(params.id);
  const user = !isLoading && data?.responseObject?.data;
  const userCourses = !isLoading && data?.responseObject?.data.progress;

  console.log("params", params);
  console.log("data", userCourses);
  return (
    <Shell pageHeader="User profile" pageTitle="User">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-16">
          <UserProfile firstName={user?.firstName} lastName={user?.lastName} />

          <div className="space-y-4">
            <h3 className="font-medium text-[#013467] text-[20px]">
              Course Overview
            </h3>

            <CardList userId={params.id} />
            <StudentTable data={userCourses} isLoading={isLoading} />
          </div>
        </div>
      )}
    </Shell>
  );
};

const StudentById = () => <MainStudentById />;

export default StudentById;
