import {useState} from "react";
import {toast} from "sonner";
import Loader from "../../components/loader";
import {InviteStaffInBulkModal} from "../../components/modals/invite-staff-bulk-modal";
import Shell from "../../components/shell";
import {CourseExtensionRequestsTable} from "../../components/tables/extension-request-table";
import {StudentsTable} from "../../components/tables/user-table";
import {Button} from "../../components/ui/button";
import {useRequestForCourseExtension} from "../../hooks/use-admin";
import {useAssignCoursesToStaffs} from "../../hooks/useCourse";
import {useGetAllStudents} from "../../hooks/useUser";

const UsersPage = () => {
  const {data, isLoading, refetch} = useGetAllStudents();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const assignCoursesToStaffs = useAssignCoursesToStaffs();
  const [state, setState] = useState({
    course: [],
    isIcsStaff: true,
    durationDays: 1,
  });
  const students = !isLoading && data?.responseObject?.data;
  const {
    data: extensionRequestData,
    isLoading: extensionRequestLoading,
    refetch: extensionRequestRefetch,
  } = useRequestForCourseExtension();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("sheet")) {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a valid Excel file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    state.course.forEach((courseId) => {
      formData.append("courseIds[]", courseId);
    });

    formData.append("isIcsStaff", state.isIcsStaff);
    formData.append("durationDays", state.durationDays);

    try {
      setUploadLoading(true);
      toast.promise(assignCoursesToStaffs.mutateAsync(formData), {
        loading: "Uploading...",
        success: (response) => {
          console.log("response", response);
          if (response.success) {
            toast.success(response.message);
            refetch();
            return response.message;
          }
          throw new Error(response.message);
        },
        error: (err) => err.response?.data?.message || "Upload failed",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <Shell pageHeader="All  Students" pageTitle="Users">
      <div className="flex items-center justify-end gap-2">
        <Button onClick={() => setIsUploadModalOpen(true)}>
          Assign course(s)
        </Button>
      </div>

      {isUploadModalOpen && (
        <InviteStaffInBulkModal
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          setIsUploadModalOpen={setIsUploadModalOpen}
          selectedFile={selectedFile}
          uploadLoading={uploadLoading}
          state={state}
          setState={setState}
        />
      )}

      <div className="">
        {isLoading ? <Loader /> : <StudentsTable data={students} />}
      </div>

      <div className="mt-12">
        <h3 className="font-medium text-[#013467] text-[20px]">
          Extenstion Requests{" "}
        </h3>

        <div>
          {extensionRequestLoading ? (
            <Loader />
          ) : (
            <CourseExtensionRequestsTable
              data={extensionRequestData}
              refetch={extensionRequestRefetch}
            />
          )}
        </div>
      </div>
    </Shell>
  );
};

export default UsersPage;
