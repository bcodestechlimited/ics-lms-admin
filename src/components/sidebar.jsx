import {
  AwardIcon,
  Banknote,
  BookOpenIcon,
  ChevronLeft,
  ChevronRight,
  ClipboardPlusIcon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  LogOutIcon,
  RouteIcon,
  Settings2Icon,
  TicketPercentIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {APP_CONFIG} from "../lib/config";

const styles = {
  icon: `w-4 h-4 `,
};

const Sidebar = ({isOpen, toggleSidebar}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboardIcon className={styles.icon} />,
      path: "/dashboard",
    },
    {
      name: "Courses",
      icon: <BookOpenIcon className={styles.icon} />,
      path: "/courses",
    },
    {
      name: "Users",
      icon: <UsersIcon className={styles.icon} />,
      path: "/users",
    },
    {
      name: "Certificates",
      icon: <AwardIcon className={styles.icon} />,
      path: "/certificates",
    },
    {
      name: "Plan",
      icon: <RouteIcon className={styles.icon} />,
      path: "/plans",
    },
    // {
    //   name: "Report",
    //   icon: <ClipboardPlusIcon className={styles.icon} />,
    //   path: "/reports",
    // },
    {
      name: "Payment",
      icon: <Banknote className={styles.icon} />,
      path: "/payments",
    },
    {
      name: "Coupons",
      icon: <TicketPercentIcon className={styles.icon} />,
      path: "/coupons",
    },
    // {
    //   name: "Templates",
    //   icon: <LayoutTemplateIcon className={styles.icon} />,
    //   path: "/templates",
    // },
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
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && <h2 className="text-xl font-bold">L&D Admin</h2>}
        <button
          onClick={toggleSidebar}
          className="ml-auto p-2 hover:bg-gray-100 rounded-full"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <nav className="mt-4 mb-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center p-3 hover:bg-gray-100 
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }
            `}
          >
            <span className="mr-4">{item.icon}</span>
            {isOpen && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 hover:bg-gray-100 text-red-500 hover:text-red-700"
        >
          <span className="mr-4">
            <LogOutIcon className={styles.icon} />
          </span>
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
