import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "sonner";
import {Eye, EyeOff} from "lucide-react";
import {useResetUserPassword} from "../hooks/auth-hook";

export default function ResetPasswordShell() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const resetPassword = useResetUserPassword();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    setIsLoading(true);

    toast.promise(resetPassword.mutateAsync({token, newPassword}), {
      loading: "Resetting password...",
      success: (res) => {
        setIsLoading(false);
        if (res.success) {
          toast.success("Password has been reset!");
          navigate("/login");
          return;
        }
        throw new Error(res.message);
      },
      error: (err) => {
        setIsLoading(false);
        return err?.response?.data.message || "Failed to reset password";
      },
    });
  };

  return (
    <form
      onSubmit={handleResetSubmit}
      className="max-w-[500px] w-full mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Reset Your Password</h2>

      {/* New Password */}
      <div className="mb-4 relative">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          New Password
        </label>
        <input
          id="newPassword"
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowNew((v) => !v)}
          className="absolute inset-y-0 top-5 right-3 flex items-center"
        >
          {showNew ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="mb-6 relative">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((v) => !v)}
          className="absolute inset-y-0 top-5 right-3 flex items-center"
        >
          {showConfirm ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-2 rounded text-white
          ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
