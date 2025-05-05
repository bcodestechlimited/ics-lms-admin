import React, {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {Button} from "../../components/button";
import {useLogin} from "../../hooks/auth-hook";

const Login = () => {
  const init = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(init);
  const textChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name]: value});
  };
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!state?.email || !state?.password)
      return toast.info("Please fill all required fields");
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
          if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
            toast.error("You are not authorized to login");
            return;
          }
          navigate("/dashboard");
          toast.success("Welcome back!");
        },
        error: (error) => {
          console.log("error", error);
          return "An error occurred while logging in";
        },
      });
    } catch (err) {
      if (err?.response?.status === 429 || err?.response?.status === 405)
        toast.error(err?.response?.data ? err?.response?.data : err?.message);
      let error = err.response?.data?.error;
      if (error && error?.length > 1) {
        console.log("error", error);
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="w-full h-screen">
        <div className="h-full w-full flex justify-center items-center">
          <div className="border p-6 max-w-lg w-[576px] rounded-md mx-auto">
            <div className="text-center">
              <h1 className="text-main font-semibold  text-2xl">
                Welcome Back
              </h1>
              <h6 className="text-sm text-main font-medium pt-1">
                Sign in to continue
              </h6>
            </div>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-4">
                <div>
                  <p className="smallText">Email Address</p>
                  <input
                    type="text"
                    name="email"
                    onChange={textChange}
                    className="w-full h-12 bg-primary myBorder pl-2 rounded-md smallText"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="w-full">
                  <p className="smallText">Password</p>
                  <div className="relative h-14 w-full myBorder rounded-lg bg-primary">
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      onChange={textChange}
                      className="w-full h-12 bg-primary pl-2 rounded-md smallText"
                      placeholder="**********"
                    />
                    <div
                      onClick={() => setShow(!show)}
                      className="absolute cursor-pointer right-4 top-5"
                    >
                      {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex w-full justify-between items-center">
                <div className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    name=""
                    className="h-3 w-3 checked:bg-main"
                    id=""
                  />
                  <small className="smallText">Remember me</small>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="smallText cursor-pointer text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                loading={loading}
                children="Sign In"
                // eslint-disable-next-line react/style-prop-object
                css="bg-main w-full h-12 rounded-md mt-7 text-white text-base font-bold satoshi flex items-center justify-center"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
