import React from "react";
import {useParams} from "react-router-dom";
import {toast} from "sonner";
import {Button} from "../../components/button";
import Loader from "../../components/loader";
import Shell from "../../components/shell";
import CardList from "../../components/student-card";
import {StudentTable} from "../../components/tables/student-table";
import {UserProfile} from "../../components/user-profile";
import {useAdminToggleStatus} from "../../hooks/use-admin";
import {useGetUserById} from "../../hooks/useUser";

export const MainStudentById = () => {
  const params = useParams();
  const {data, isLoading, refetch} = useGetUserById(params.id);
  const user = !isLoading && data?.responseObject?.data;
  const userCourses = !isLoading && data?.responseObject?.data.progress;
  const isActive = !isLoading && data?.responseObject?.data.isActive;
  const toggleStatus = useAdminToggleStatus();

  console.log({isActive});
  const handleToggleStatus = () => {
    console.log("the code is here");
    toast.promise(toggleStatus.mutateAsync(params.id), {
      loading: "Updating user status",
      success: (res) => {
        if (!res.success) {
          throw new Error(res.message);
        }
        refetch();
        return "User status updated";
      },
      error: (err) => {
        return err?.data?.response.message || "Failed to update user status";
      },
    });
  };

  return (
    <Shell pageHeader="User profile" pageTitle="User">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-16">
          <div className="flex items-center justify-between">
            <UserProfile
              firstName={user?.firstName}
              lastName={user?.lastName}
            />

            {isActive ? (
              <div>
                <Button
                  className="bg-red-500 text-white p-2 rounded-md"
                  onClick={handleToggleStatus}
                >
                  Suspend User
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  className="bg-green-500 text-white p-2 rounded-md"
                  onClick={handleToggleStatus}
                >
                  Activate User
                </Button>
              </div>
            )}
          </div>

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
