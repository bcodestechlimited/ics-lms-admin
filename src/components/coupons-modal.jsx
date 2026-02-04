import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useSendCouponToUsersForACourse } from "../hooks/useCoupon";
import { useGetCourse } from "../hooks/useCourse";

const allowedTypes = new Set([
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  "application/csv",
]);

const discountTypes = [
  "FLASH_SALE",
  "FIRST_TIME_USER",
  "LIMITED_TIME",
  "DISCOUNT",
];

const SendCourseCouponToUsersModal = ({ setState }) => {
  const [courseId, setCourseId] = useState("");
  const [discountType, setDiscountType] = useState("DISCOUNT");
  const [percentage, setPercentage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [file, setFile] = useState(null);

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCourse();
  const { mutateAsync, isLoading } = useSendCouponToUsersForACourse();

  const courses = useMemo(() => {
    const list =
      coursesData?.responseObject?.data ||
      coursesData?.data.courses ||
      coursesData?.courses ||
      [];
    return Array.isArray(list) ? list : [];
  }, [coursesData]);

  const fileName = useMemo(() => file?.name || "No file selected", [file]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!allowedTypes.has(selected.type)) {
      toast.error("Invalid file type. Upload an Excel file or CSV.");
      e.target.value = "";
      return;
    }

    setFile(selected);
  };

  const validate = () => {
    if (!courseId) return "Please select a course";
    if (!discountType) return "Please select a discount type";
    if (!percentage) return "Please enter percentage";
    const pct = Number(percentage);
    if (Number.isNaN(pct) || pct <= 0 || pct > 100)
      return "Percentage must be between 1 and 100";
    if (!expirationDate) return "Please select an expiry date";
    if (!file) return "Please upload an Excel/CSV file";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return toast.error(err);

    try {
      const payload = {
        file,
        courseId,
        discountType,
        percentage: String(percentage),
        expirationDate: new Date(expirationDate).toISOString(),
      };

      await mutateAsync(payload);
      toast.success("Coupons sent successfully");
      setState("");
    } catch (error) {
      toast.error(error?.message || "Failed to send coupons");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-[720px] bg-white rounded-xl border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Send Course Coupon</h2>
            <p className="text-sm text-gray-600">
              Select course, set discount, upload users, and send unique
              coupons.
            </p>
          </div>

          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setState("")}
            type="button"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white"
              disabled={isCoursesLoading || isLoading}
            >
              <option value="">
                {isCoursesLoading ? "Loading courses..." : "Select course"}
              </option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white"
              disabled={isLoading}
            >
              {discountTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Percentage
            </label>
            <input
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              type="number"
              min="1"
              max="100"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="e.g 20"
              disabled={isLoading}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              disabled={isLoading}
            />
          </div>

          <div className="col-span-2 border rounded-lg p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">Upload Users File</p>
                <p className="text-xs text-gray-600 truncate">{fileName}</p>
              </div>

              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                Choose File
              </label>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Accepted: .xlsx, .xls, .csv — must contain a column named{" "}
              <span className="font-semibold">email</span>
            </p>
            {/* <a
              href="../../coupon-example.xlsx"
              download
              className="mt-2 inline-flex text-xs font-medium text-[#FF502A] hover:underline"
            >
              Download template (.xlsx)
            </a>*/}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => setState("")}
            className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#FF502A] hover:opacity-95 text-white text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isLoading ? "Sending..." : "Send Coupons"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCourseCouponToUsersModal;
