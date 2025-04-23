import {useMemo, useState} from "react";
import DataTable from ".";
import {Button} from "../ui/button";
import {
  useAcceptUserRequestForCourseExtension,
  useRejectUserRequestForCourseExtension,
} from "../../hooks/use-admin";
import {toast} from "sonner";

export function CourseExtensionRequestsTable({data}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const acceptRequest = useAcceptUserRequestForCourseExtension();
  const rejectRequest = useRejectUserRequestForCourseExtension();

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    toast.promise(acceptRequest.mutateAsync(selectedRequest._id), {
      loading: "Approving request...",
      success: (res) => {
        if (!res.success) {
          return "Error accepting request";
        }

        return "Request accepted successfully";
      },
      error: (error) => {
        return "Error accepting request";
      },
    });
    closeModal();
  };

  const handleReject = () => {
    toast.promise(rejectRequest.mutateAsync(selectedRequest._id), {
      loading: "Rejecting request...",
      success: (res) => {
        if (!res.success) {
          return "Error rejecting request";
        }

        return "Request rejected successfully";
      },
      error: (error) => {
        return "Error rejecting request";
      },
    });
    closeModal();
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "course.title",
        header: "Course Title",
        cell: (info) => info.getValue(),
      },
      {
        header: "Expired At",
        accessorKey: "expiredAt",
        cell: (info) => {
          return new Date(info.row.original.expiredAt).toLocaleDateString();
        },
      },
      // {
      //   accessorKey: "reason",
      //   header: "Reason",
      //   cell: (info) => info.getValue(),
      // },
      {
        header: "Actions",
        cell: (info) => {
          const request = info.row.original;
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openModal(request)}
            >
              View
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <DataTable
        data={data?.responseObject?.docs || []}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        pageSize={20}
      />

      {/* Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Course Extension Request
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Student Name
                </p>
                <p className="text-base text-gray-900">
                  {selectedRequest.user.firstName}{" "}
                  {selectedRequest.user.lastName}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base text-gray-900">
                  {selectedRequest.user.email}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Course</p>
                <p className="text-base text-gray-900">
                  {selectedRequest.course.title}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                <p className="text-base text-gray-900">
                  {new Date(selectedRequest.expiredAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Extension Days
                </p>
                <p className="text-base text-gray-900">
                  {selectedRequest.extensionDays} days
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Reason</p>
                <p className="text-base text-gray-900">
                  {selectedRequest.reason}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    selectedRequest.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : selectedRequest.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              {selectedRequest.status === "PENDING" && (
                <>
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Approve
                  </button>
                </>
              )}
              {selectedRequest.status !== "PENDING" && (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
