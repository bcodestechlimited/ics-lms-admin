import React, {useRef, useState} from "react";
import {AiOutlineClose, AiOutlineDown} from "react-icons/ai";
import {MdLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Avatar from "../assets/avatar.svg";
import Edit from "../assets/edit.svg";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import Upload from "../assets/upload.svg";
import useAuthStore from "../data/stores/authstore";
import {MainBtn} from "./button";
import {useValidateUser} from "../hooks/auth-hook";

const MainHeader = ({text, small}) => {
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setProfile(false);
    setEdit(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center h-20 bg-transparent">
        <div>
          <h2 className="text-2xl capitalize satoshi text-skyblue font-bold">
            {text}
          </h2>
          <p className="text-xl text-main font-normal">{small}</p>
        </div>
        <div className="flex items-center gap-6">
          {/* <div className="hidden lg:block">
						<SearchInput />
					</div> */}
          <div className="flex  gap-2">
            <img
              onClick={() => setNotification(true)}
              src={Notification}
              alt=""
              className="cursor-pointer"
            />
            <div
              onClick={() => {
                setProfile(true);
              }}
              className="flex cursor-pointer items-center"
            >
              <img src={Avatar} alt="" className="" />
              <AiOutlineDown />
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <NotificationSection handleClose={() => setNotification(false)} />
      )}
      {profile && (
        <ProfileSection
          handleClose={() => setProfile(false)}
          handleEdit={handleEdit}
        />
      )}
      {edit && <EditSection handleClose={() => setEdit("")} />}
    </div>
  );
};

const NotificationSection = ({handleClose}) => {
  const Arr = [
    {
      title: "Coming Soon",
      desc: "et, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co",
      date: "14th May, 2023",
      time: "2:00PM",
    },
    {
      title: "Coming Soon",
      desc: "et, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co",
      date: "14th May, 2023",
      time: "2:00PM",
    },
    {
      title: "Coming Soon",
      desc: "et, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co",
      date: "14th May, 2023",
      time: "2:00PM",
    },
    {
      title: "Coming Soon",
      desc: "et, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co",
      date: "14th May, 2023",
      time: "2:00PM",
    },
    {
      title: "Coming Soon",
      desc: "et, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea co",
      date: "14th May, 2023",
      time: "2:00PM",
    },
  ];
  return (
    <div className="lg:absolute transition-transform  duration-500 lg:p-5 p-2 lg:right-2 z-50  rounded-xl shadow-lg bg-white lg:w-1/3 w-11/12 mx-auto lg:mx-0 h-screen overflow-y-scroll noScroll">
      <div className="min-h-full">
        <div className="mb-10 float-right">
          <AiOutlineClose className="cursor-pointer" onClick={handleClose} />
        </div>
        <h3 className="text-2xl font-bold text-main">Notifications</h3>
        <div className="mt-8 space-y-4">
          {Arr?.map((item, i) => (
            <div
              key={i}
              style={{
                border: " 0.5px solid var(--Stokee, rgba(78, 83, 94, 0.50))",
              }}
              className="rounded-lg p-3"
            >
              <h5 className="text-base font-bold text-main">{item?.title}</h5>
              <p className="text-sm text-main">{item?.desc}</p>
              <div className="flex justify-between w-full items-center">
                <small className="text-xs text-main font-medium">
                  {item?.time}
                </small>
                <small className="text-xs text-main font-medium">
                  {item?.date}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileSection = ({handleClose, handleEdit}) => {
  const {logout} = useAuthStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const {data, isLoading} = useValidateUser();
  const user = !isLoading && data;

  console.log({user});

  return (
    <div className="lg:absolute relative transition-transform  duration-500 lg:p-5 p-2 lg:right-2 z-50  rounded-xl shadow-lg bg-white lg:w-1/3 w-11/12 mx-auto lg:mx-0 h-56">
      <div className="float-right">
        <AiOutlineClose className="cursor-pointer" onClick={handleClose} />
      </div>
      <div className="flex mt-8 gap-4 items-center">
        <img src={user?.image?.url || Profile} alt="" className="h-28" />
        <div>
          <h5 className="text-base text-main font-bold">Profile</h5>
          <h5 className="text-2xl text-main font-extrabold">
            {user?.lastName} {user?.firstName}
          </h5>
          <span className="text-sm">{user?.email}</span>
          <img
            onClick={handleEdit}
            src={Edit}
            alt=""
            className="cursor-pointer"
          />
        </div>
      </div>
      <div
        onClick={handleLogout}
        className="absolute cursor-pointer right-8 bottom-5 flex items-center gap-3"
      >
        <MdLogout />
        <small className="text-sm satoshi capitalize font-normal text-secondary">
          Logout
        </small>
      </div>
    </div>
  );
};

const EditSection = ({handleClose}) => {
  const navigate = useNavigate();
  return (
    <div className="lg:absolute relative transition-transform  duration-500 lg:p-5 p-2 lg:right-2 z-50  rounded-xl shadow-lg bg-white lg:w-80 w-11/12 mx-auto lg:mx-0">
      <div className="float-right">
        <AiOutlineClose className="cursor-pointer" onClick={handleClose} />
      </div>
      <div className="mt-8">
        <h5 className="text-base text-secondary font-bold">Edit profile</h5>
        <form action="" className="mt-4">
          <div>
            <p className="text-sm text-secondary font-medium">Full name</p>
            <input
              type="text"
              name="full_name"
              className="w-full placeholder:text-gray-300 pl-4 h-10 rounded-lg text-sm text-secondary font-normal"
              placeholder="Henry"
              style={{
                border: "0.5px solid var(--Stokee, rgba(78, 83, 94, 0.50))",
              }}
              id=""
            />
          </div>
          <div className="mt-5">
            <ImageInput />
          </div>
          <div className="mt-5">
            <MainBtn onClick={() => navigate("/")} text={"Update Profile"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export const ImageInput = ({name, onChange}) => {
  const ref = useRef();
  const handleClick = () => {
    ref.current?.click();
  };
  return (
    <div>
      <p className="text-base font-medium satoshi text-secondary">
        Profile Picture
      </p>
      <div
        onClick={handleClick}
        className="h-24 cursor-pointer rounded-xl border w-full flex justify-center items-center"
      >
        <div className="">
          <img src={Upload} alt="" className="mx-auto" />
          <small className="text-sm text-[#275A7F] font-medium satoshi text-center">
            Click to upload
          </small>
          <h6 className="text-xs text-[#275A7F] font-medium satoshi text-center">
            (jpg, png)
          </h6>
          <input
            type="file"
            name={name}
            onChange={onChange}
            ref={ref}
            accept=".png, .jpg, .png"
            id=""
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
