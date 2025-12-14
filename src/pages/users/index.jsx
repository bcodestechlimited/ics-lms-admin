import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../components/loader";
import { InviteStaffInBulkModal } from "../../components/modals/invite-staff-bulk-modal";
import Shell from "../../components/shell";
import { CourseExtensionRequestsTable } from "../../components/tables/extension-request-table";
import { StudentsTable } from "../../components/tables/user-table";
import { Button } from "../../components/ui/button";
import { DEFAULT_LIMIT } from "../../helpers/service.helpers";
import {
  useRequestForCourseExtension,
  useVerifyEmail,
} from "../../hooks/use-admin";
import { useAssignCoursesToStaffs } from "../../hooks/useCourse";
import { useGetAllStudents } from "../../hooks/useUser";
import { BulkVerifyModal } from "../../components/users/bulk-verify-modal";

const UsersPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const assignCoursesToStaffs = useAssignCoursesToStaffs();
  const [state, setState] = useState({
    course: [],
    isIcsStaff: true,
    durationDays: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") || 1);
  const limitFromUrl = Number(searchParams.get("limit") || DEFAULT_LIMIT);
  const searchFromUrl = searchParams.get("search") || "";
  const verifyEmail = useVerifyEmail();
  const [verifyingEmailId, setVerifyingEmailId] = useState(null);

  const { data, isLoading, refetch } = useGetAllStudents({
    page: pageFromUrl,
    limit: limitFromUrl,
    search: searchFromUrl,
  });

  const users = data?.users || [];
  const pagination = data?.pagination || {
    totalCount: 0,
    filteredCount: 0,
    totalPages: 1,
    page: pageFromUrl,
    limit: limitFromUrl,
  };

  const {
    data: extensionRequestData,
    isLoading: extensionRequestLoading,
    refetch: extensionRequestRefetch,
  } = useRequestForCourseExtension();

  const handleEmailVerification = async (id) => {
    setVerifyingEmailId(true);
    try {
      const res = await verifyEmail.mutateAsync({ id });
      if (res.success) {
        toast.success("Email verified successfully");
        refetch();
      } else {
        toast.error("Email verification failed");
      }
    } catch (error) {
      toast.error("An error occurred while verifying email");
    } finally {
      setVerifyingEmailId(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("sheet")) {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a valid Excel file");
    }
  };

  const setUrl = (updates = {}) => {
    const p = new URLSearchParams(searchParams);
    if (updates.page != null) p.set("page", String(updates.page));
    if (updates.limit != null) p.set("limit", String(updates.limit));
    if (updates.search != null) {
      if (updates.search) p.set("search", updates.search);
      else p.delete("search");
    }
    setSearchParams(p, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (nextPage) => {
    const safe = Math.max(1, Math.min(nextPage, pagination.totalPages || 1));
    setUrl({ page: safe, limit: pagination.limit });
  };

  const handleLimitChange = (nextLimit) => {
    const limit = Number(nextLimit) > 0 ? Number(nextLimit) : DEFAULT_LIMIT;
    setUrl({ page: 1, limit });
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

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Shell pageHeader="All  Students" pageTitle="Users">
      <div className="flex items-center justify-end gap-2">
        <BulkVerifyModal handleRefetch={handleRefetch} />
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
        {isLoading ? (
          <Loader />
        ) : (
          <StudentsTable
            data={users}
            page={pagination.page}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            filteredCount={pagination.filteredCount}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            initialSearch={searchFromUrl}
            handleEmailVerification={handleEmailVerification}
            verifyingEmailId={verifyingEmailId}
          />
        )}
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
