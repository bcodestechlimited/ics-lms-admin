import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {useState} from "react";
import {Provider} from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {Toaster} from "sonner";
import "./App.css";
import Sidebar from "./components/sidebar";
import {SetAuthToken, SetDefaultHeaders} from "./data/Config";
import store from "./data/Store";
import AuthGuard from "./layouts/auth-guard.layout";
import {APP_CONFIG} from "./lib/config";
import CertificatesPage from "./pages/certificates";
import CouponsPage from "./pages/coupons";
import CoursesPage from "./pages/courses";
import CourseDetails from "./pages/courses/[id]";
import AddCoursePage from "./pages/courses/add-course";
import CourseModulePage from "./pages/courses/add-module";
import CourseAssessmentPage from "./pages/courses/course-assessment";
import CoursePricingPage from "./pages/courses/course-pricing";
import CourseRetakesPage from "./pages/courses/course-retakes";
import CourseSummaryPage from "./pages/courses/course-summary";
import EditCoursePage from "./pages/courses/edit-course";
import EditCourseAssessmentPage from "./pages/courses/edit-course-assessment";
import EditCourseModulePage from "./pages/courses/edit-course-module";
import EditCoursePricingPage from "./pages/courses/edit-course-pricing";
import EditCourseRetakesPage from "./pages/courses/edit-course-retakes";
import EditModulePage from "./pages/courses/edit-module";
import DashboardPage from "./pages/dashboard";
import PaymentsPage from "./pages/payments";
import PlanPage from "./pages/plan";
import ReportsPage from "./pages/reports";
import {MainStudentById} from "./pages/student/[id]";
import TemplatesPage from "./pages/templates";
import UsersPage from "./pages/users";
import Login from "./screens/home";

SetDefaultHeaders();

if (localStorage.getItem(APP_CONFIG.TOKEN)) {
  SetAuthToken(localStorage.getItem(APP_CONFIG.TOKEN));
}

const queryClient = new QueryClient();
const AuthenticatedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-grow p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AuthGuard />,
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/users/student/:id",
            element: <MainStudentById />,
          },
          {
            path: "/certificates",
            element: <CertificatesPage />,
          },
          {
            path: "/plans",
            element: <PlanPage />,
          },
          {
            path: "/reports",
            element: <ReportsPage />,
          },
          {
            path: "/payments",
            element: <PaymentsPage />,
          },
          {
            path: "/coupons",
            element: <CouponsPage />,
          },
          {
            path: "/templates",
            element: <TemplatesPage />,
          },
          {
            path: "/courses",
            element: <CoursesPage />,
          },
          {
            path: "/courses/:id",
            element: <CourseDetails />,
          },
          {
            path: "/courses/add-course",
            element: <AddCoursePage />,
          },
          {
            path: "/courses/edit-course",
            element: <EditCoursePage />,
          },
          {
            path: "/courses/course-assessment",
            element: <CourseAssessmentPage />,
          },
          {
            path: "/courses/course-pricing",
            element: <CoursePricingPage />,
          },
          {
            path: "/courses/course-summary",
            element: <CourseSummaryPage />,
          },
          {
            path: "/courses/course-retakes",
            element: <CourseRetakesPage />,
          },
          {
            path: "/courses/add-module",
            element: <CourseModulePage />,
          },
          {
            path: "/courses/edit-course-assessment",
            element: <EditCourseAssessmentPage />,
          },
          {
            path: "/courses/edit-course-module",
            element: <EditCourseModulePage />,
          },
          {
            path: "/courses/edit-course-pricing",
            element: <EditCoursePricingPage />,
          },
          {
            path: "/courses/edit-course-retakes",
            element: <EditCourseRetakesPage />,
          },
          {
            path: "/courses/edit-module",
            element: <EditModulePage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors />
        <Tooltip
          id="my-tooltip"
          style={{
            backgroundColor: "#222",
            color: "#FFF",
            fontFamily: "satoshi",
            fontWeight: 500,
            width: "auto",
            maxWidth: "300px",
            opacity: 1,
            borderRadius: "8px",
            fontSize: "13px",
            zIndex: 9999999,
          }}
        />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
