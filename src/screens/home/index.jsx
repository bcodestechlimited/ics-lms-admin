import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../../assets/fa-logo.png";
import { Button } from "../../components/button";
import { useLogin } from "../../hooks/auth-hook";

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [state, setState] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const textChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      return toast.info("Please fill all required fields");
    }

    setLoading(true);

    try {
      const payload = {
        email: state.email.toLowerCase().trim(),
        password: state.password,
      };

      toast.promise(login.mutateAsync(payload), {
        loading: "Logging in...",
        success: (res) => {
          const user = res?.responseObject?.user;
          if (!["ADMIN", "SUPERADMIN"].includes(user?.role)) {
            throw new Error("You are not authorized to login");
          }
          navigate("/dashboard");
          return "Welcome back!";
        },
        error: (error) => {
          return error?.message || "An error occurred while logging in";
        },
      });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="border bg-white p-8 max-w-lg w-[576px] rounded-xl shadow-sm mx-auto">
        <div className="text-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="h-8 w-auto mb-6 mx-auto object-contain"
          />
          <h1 className="text-main font-bold text-2xl">Welcome Back</h1>
          <h6 className="text-sm text-gray-500 font-medium pt-1">Sign in to continue</h6>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={textChange}
              className="w-full h-12 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 rounded-md text-sm transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={state.password}
                onChange={textChange}
                className="w-full h-12 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-3 pr-10 rounded-md text-sm transition-all"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {show ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex w-full justify-between items-center pt-2">
            <label className="flex gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={loading}
            css="bg-main w-full h-12 rounded-md mt-6 text-white text-base font-bold flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
