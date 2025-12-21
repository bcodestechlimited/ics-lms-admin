import { useGetPublishedCourse } from "../../hooks/useCourse";
import { Button } from "../button";
import { MultiSelect } from "../multi-select";

export const InviteStaffInBulkModal = ({
  handleFileChange,
  setIsUploadModalOpen,
  handleUpload,
  uploadLoading,
  selectedFile,
  state,
  setState,
}) => {
  const { data, isLoading } = useGetPublishedCourse();
  const courses = !isLoading && data?.data?.courses;

  const handleStaffTypeChange = (isIcsStaff) => {
    setState((prev) => ({
      ...prev,
      isIcsStaff,
      expirationDate: prev.expirationDate,
    }));
  };

  const onTextChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Bulk assigning of courses
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
          <p>📋 You can upload a maximum of 500 students per day.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
          <p className="text-gray-700 mb-2">Need help with the format?</p>
          <a
            href="/samples/staff-upload-template.xlsx"
            download="staff-upload-template.xlsx"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            📥 Download Sample Excel Template
          </a>
        </div>

        <div className="mb-4">
          <label className="text-secondary block mb-2 text-[14px]">
            Staff Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleStaffTypeChange(true)}
              className={`px-4 py-2 rounded-md ${
                state.isIcsStaff
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ICS Staff
            </button>
            <button
              type="button"
              onClick={() => handleStaffTypeChange(false)}
              className={`px-4 py-2 rounded-md ${
                !state.isIcsStaff
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Outside Staff
            </button>
          </div>
        </div>

        <div>
          <MultiSelect
            label="Select Course(s)"
            name="course"
            value={state.course || []}
            onChange={onTextChange}
            options={
              !isLoading &&
              courses?.map((course) => ({
                value: course._id,
                label: course.title,
              }))
            }
          />
        </div>

        <div>
          <label className="text-secondary block mb-2 text-[14px]">
            Course Duration (days)
          </label>
          <input
            type="text"
            name="durationDays"
            value={state.durationDays || ""}
            onChange={onTextChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="" className="text-secondary text-[14px]">
            Select Users file
          </label>
          <label className="mb-4 pl-2 border rounded-md h-12 flex items-center">
            <span className="sr-only">Choose Excel file</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx, .xls"
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={uploadLoading || !selectedFile}
          >
            {uploadLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
