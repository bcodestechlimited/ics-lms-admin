import {useState} from "react";
import {toast} from "sonner";
import {useSendPasswordResetLink} from "../hooks/auth-hook";

export default function ForgotPasswordShell() {
  const sendLink = useSendPasswordResetLink();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    toast.promise(sendLink.mutateAsync({email}), {
      loading: "Sending reset link...",
      success: (res) => {
        setIsLoading(false);
        if (res.success) {
          setEmail("");
          return "Password reset link sent!";
        }
        throw new Error(res.message);
      },
      error: (err) => {
        setIsLoading(false);
        return err?.message || "Failed to send reset link";
      },
    });
  };

  return (
    <form
      onSubmit={handleForgotSubmit}
      className="max-w-[500px] w-full mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
