import {Eye, EyeOff} from "lucide-react";
import React, {useState} from "react";
import {toast} from "sonner";
import {useCreateAdminAccount} from "../hooks/use-admin";

const CreateAdminForm = () => {
  const createAdmin = useCreateAdminAccount();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) return;

    toast.promise(
      createAdmin.mutateAsync({firstName, lastName, email, password}),
      {
        loading: "Creating admin…",
        success: (res) => {
          console.log("res", res);
          if (res.success) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            return "Admin account created!";
          }
          throw new Error(res.message);
        },
        error: (err) => {
          console.log("err", err);
          return err?.response.data.message || "Failed to create admin";
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create Admin Account</h2>

      {/* First Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type={showPwd ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPwd((v) => !v)}
          className="absolute inset-y-0 right-3 flex items-center top-8"
        >
          {showPwd ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={createAdmin.isLoading}
        className={`w-full py-2 rounded text-white ${
          createAdmin.isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {createAdmin.isLoading ? "Creating…" : "Create Admin"}
      </button>
    </form>
  );
};

export default CreateAdminForm;
