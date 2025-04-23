import {Navigate, Route, Routes} from "react-router-dom";
import AuthGuard from "./layouts/auth-guard.layout";
import LayoutWrapper from "./layouts/layout-wrapper";
import CertificatesPage from "./pages/certificates";
import CouponsPage from "./pages/coupons";
import Courses from "./pages/courses";
import AddCoursePage from "./pages/courses/add-course";
import CourseModulePage from "./pages/courses/add-module";
import CourseAssessmentPage from "./pages/courses/course-assessment";
import CoursePricingPage from "./pages/courses/course-pricing";
import CourseRetakesPage from "./pages/courses/course-retakes";
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
import TemplatesPage from "./pages/templates";
import UsersPage from "./pages/users";
import UserDetails from "./pages/users/[id]";
import Login from "./screens/home";

const Routers = () => {
  // change the true to be isAuth
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/plans" element={<PlanPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/courses" element={<Courses />} />
            {/* course sub routes */}
            <Route path="/courses/add-course" element={<AddCoursePage />} />
            <Route path="/courses/edit-course" element={<EditCoursePage />} />
            <Route
              path="/courses/course-assessment"
              element={<CourseAssessmentPage />}
            />
            <Route
              path="/courses/course-pricing"
              element={<CoursePricingPage />}
            />
            <Route
              path="/courses/course-summary"
              element={<CoursePricingPage />}
            />
            <Route
              path="/courses/course-retakes"
              element={<CourseRetakesPage />}
            />
            <Route path="/courses/add-module" element={<CourseModulePage />} />
            <Route
              path="/courses/edit-course-assessment"
              element={<EditCourseAssessmentPage />}
            />
            <Route
              path="/courses/edit-course-module"
              element={<EditCourseModulePage />}
            />
            <Route
              path="/courses/edit-course-pricing"
              element={<EditCoursePricingPage />}
            />
            <Route
              path="/courses/edit-course-retakes"
              element={<EditCourseRetakesPage />}
            />
            <Route path="/courses/edit-module" element={<EditModulePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </>
  );
};

export default Routers;
