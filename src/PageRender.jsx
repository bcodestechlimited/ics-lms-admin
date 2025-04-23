/* eslint-disable no-undef */
import { createElement, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "./data/stores/authstore";
import useErrorStore from "./data/stores/errorstore";
import { UsersArr } from "./pages/users";

const GeneratePage = (pageName, folder) => {
  const component = () => require(`./${folder}/${pageName}`).default;
  // console.log({ pageName });
  let navigate = useNavigate();
  try {
    return createElement(component());
  } catch (e) {
    navigate("/");
  }
};

const PageRender = () => {
  let { isAuth } = useAuthStore();

  let { errorText, clearErrors } = useErrorStore();
  const { page, id, step } = useParams();
  const escape2 = [
      "add-course",
      "edit-course",
      "completion-rate",
      "assessment",
      "progress",
      "add-module",
      "edit-module",
      "edit-course-module",
      "edit-course-pricing",
      "edit-course-retakes",
      "course-assessment",
      "edit-course-assessment",
      "course-pricing",
      "course-retakes",
      "course-summary",
    ],
    navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      if (["register", "login", "create-account"]?.includes(page)) {
        navigate("/");
      }
    }
    if (!isAuth) {
      if (errorText) {
        if (
          ![
            "register",
            "login",
            "forgotpassword",
            "recruitment",
            "account-verification",
            "emailsent",
            "resetpassword",
            "resetsuccess",
          ]?.includes(page)
        ) {
          navigate("/");
        }
        clearErrors();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isAuth, navigate, errorText]);

  let pageName = "";
  if (step) {
    if (UsersArr?.map((i) => i?.path)?.includes(id) && page === "users") {
      pageName = `${page}/${"[id]"}/${"[id]"}`;
    } else pageName = `${page}/${id}/${"[id]"}`;
  } else if (id) {
    if (
      (page === "courses" && escape2.includes(id)) ||
      (page === "events" && escape2.includes(id)) ||
      (page === "reports" && escape2.includes(id))
    ) {
      pageName = `${page}/${id}`;
    } else {
      pageName = `${page}/${"[id]"}`;
    }
  } else {
    pageName = `${page}`;
  }
  return GeneratePage(pageName, isAuth ? "pages" : "screens");
};

export default PageRender;
