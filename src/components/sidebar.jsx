import {
  AwardIcon,
  Banknote,
  BookOpenIcon,
  ChevronLeft,
  ChevronRight,
  LayoutDashboardIcon,
  LogOutIcon,
  RouteIcon,
  Settings2Icon,
  TicketPercentIcon,
  UsersIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../lib/config";
import Logo from "../assets/fa-logo.png";

const styles = {
  icon: `w-5 h-5 flex-shrink-0`,
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboardIcon className={styles.icon} />,
      path: "/dashboard",
    },
    { name: "Courses", icon: <BookOpenIcon className={styles.icon} />, path: "/courses" },
    { name: "Users", icon: <UsersIcon className={styles.icon} />, path: "/users" },
    {
      name: "Certificates",
      icon: <AwardIcon className={styles.icon} />,
      path: "/certificates",
    },
    { name: "Plan", icon: <RouteIcon className={styles.icon} />, path: "/plans" },
    { name: "Payment", icon: <Banknote className={styles.icon} />, path: "/payments" },
    {
      name: "Coupons",
      icon: <TicketPercentIcon className={styles.icon} />,
      path: "/coupons",
    },
    {
      name: "Settings",
      icon: <Settings2Icon className={styles.icon} />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem(APP_CONFIG.TOKEN || "L&D_ADMIN");
    navigate("/login");
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header / Logo Area */}
      <div className="flex items-center justify-between p-4 min-h-[72px]">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={Logo}
            alt="Logira LMS"
            className="w-8 h-8 rounded-md flex-shrink-0 object-contain"
          />
          {isOpen && (
            <h2 className="text-lg font-bold text-slate-800 whitespace-nowrap">
              Logira LMS
            </h2>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors absolute -right-3 top-6 bg-white border border-slate-200 shadow-sm hidden md:block"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 overflow-y-auto overflow-x-hidden px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <span
                className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
              >
                {item.icon}
              </span>
              {isOpen && (
                <span className="ml-3 text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors group"
        >
          <span className="text-red-400 group-hover:text-red-600">
            <LogOutIcon className={styles.icon} />
          </span>
          {isOpen && (
            <span className="ml-3 text-sm font-medium whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
