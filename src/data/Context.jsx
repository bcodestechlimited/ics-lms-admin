/* eslint-disable react/prop-types */
import {
  AwardIcon,
  Banknote,
  BookOpenIcon,
  ClipboardPlusIcon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  RouteIcon,
  TicketPercentIcon,
  UsersIcon,
} from "lucide-react";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import GroupIcon from "../assets/group.svg";

export const GlobalState = createContext();
const styles = {
  icons: `w-4 h-4`,
};
const DataProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  let handleCapitalize = (word) => {
    let splitter = word.trim().split(" ");
    let firstCap = splitter[0].split("");
    let remaining = splitter.slice(1, splitter.length).join(" ");

    let firstCapOne = firstCap[0].toUpperCase();
    let firstCapTwo = firstCap.slice(1, firstCap.length).join("");

    let joinFirst = `${firstCapOne}${firstCapTwo}`;

    return `${joinFirst} ${remaining}`;
  };

  let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  let nairaSign = <span className="fontInherit">&#8358;</span>;
  let nairaSignNeutral = "₦";

  let { auth } = useSelector((state) => state);
  const location = useLocation();
  const currentPath = location.pathname;

  let sidebarList = [
    {
      name: "Dashboard",
      icon: (
        <LayoutDashboardIcon
          className={`${styles.icons} ${
            currentPath.includes("/dashboard") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/dashboard",
      type: "icon",
    },
    {
      name: "Courses",
      icon: (
        <BookOpenIcon
          className={`${styles.icons} ${
            currentPath.includes("/courses") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/courses",
      type: "icon",
    },
    {
      name: "Users",
      icon: (
        <UsersIcon
          className={`${styles.icons} ${
            currentPath.includes("/users") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/users",
      type: "icon",
    },
    {
      name: "Certificates",
      icon: (
        <AwardIcon
          className={`${styles.icons} ${
            currentPath.includes("/certificates") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/certificates",
      type: "icon",
    },
    {
      name: "Plan",
      icon: (
        <RouteIcon
          className={`${styles.icons} ${
            currentPath.includes("/plan") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/plan",
      type: "icon",
    },
    {
      name: "Report",
      icon: (
        <ClipboardPlusIcon
          className={`${styles.icons} ${
            currentPath.includes("/report") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/reports",
      type: "icon",
    },
    {
      name: "Payment",
      icon: (
        <Banknote
          className={`${styles.icons} ${
            currentPath.includes("/payments") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/payments",
      type: "icon",
    },
    {
      name: "Coupons",
      icon: (
        <TicketPercentIcon
          className={`${styles.icons} ${
            currentPath.includes("/coupons") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/coupons?tab=active",
      type: "icon",
    },
    {
      name: "Templates",
      icon: (
        <LayoutTemplateIcon
          className={`${styles.icons} ${
            currentPath.includes("/templates") ? "text-[#0269D0]" : ""
          }`}
        />
      ),
      url: "/templates",
      type: "icon",
    },
  ];

  const state = {
    handleCapitalize,
    numberWithCommas,
    sidebarList,
    auth,
    nav,
    toggleNav,
    nairaSign,
    nairaSignNeutral,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
