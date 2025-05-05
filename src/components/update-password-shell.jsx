import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {toast} from "sonner";
import {useUpdateUserPassword} from "../hooks/useUser";

export default function UpdatePasswordForm() {
  const updatePassword = useUpdateUserPassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isPwdLoading, setIsPwdLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setIsPwdLoading(true);

    toast.promise(
      updatePassword.mutateAsync({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }),
      {
        loading: "Updating password...",
        success: (res) => {
          setIsPwdLoading(false);
          if (res.success) {
            // clear fields
            setCurrentPassword("");
            setNewPassword("");
            window.location.reload();
            return "Password updated!";
          }
          throw new Error(res.message);
        },
        error: (err) => {
          setIsPwdLoading(false);
          return err?.message || "Failed to update password";
        },
      }
    );
  };

  return (
    <form
      onSubmit={handlePasswordSubmit}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

      {/* Current Password */}
      <div className="mb-4 relative">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Current Password
        </label>
        <input
          id="currentPassword"
          type={showCurrent ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowCurrent((v) => !v)}
          className="absolute inset-y-0 top-5 right-3 flex items-center"
        >
          {showCurrent ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* New Password */}
      <div className="mb-6 relative">
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

      <button
        type="submit"
        disabled={isPwdLoading}
        className={`
          w-full py-2 rounded text-white
          ${
            isPwdLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {isPwdLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
