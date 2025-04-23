import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {APP_CONFIG} from "../../lib/config";

const AuthStore = (set) => ({
  auth: !!localStorage.getItem(APP_CONFIG.TOKEN),
  token: localStorage.getItem(APP_CONFIG.TOKEN) || null,
  user: null,
  isAuth: false,
  loading: false,
  isRegistered: false,
  isLoggedIn: false,
  isUpdated: false,
  isPassword: null,
  login: (payload) => {
    const accessToken = payload.responseObject.token;
    const user = payload.responseObject.user;
    localStorage.setItem(APP_CONFIG.TOKEN, accessToken);
    set(
      {
        user: user || payload,
        token: accessToken,
        isLoggedIn: true,
      },
      false,
      "login"
    );
  },
  setUser: (payload) => {
    set({isUpdated: true, user: payload?.data}, false, "setUser");
  },
  getUser: (payload) => {
    if (payload?.token) {
      localStorage.setItem(APP_CONFIG.TOKEN, payload?.token);
    }
    set(
      {
        user: payload?.data || payload,
        isAuth: payload?.data || payload ? true : false,
        loading: false,
      },
      false,
      "getUser"
    );
  },
  getUserFail: () => {
    set({isAuth: false, loading: false});
  },
  getUserLoading: () => {
    set({loading: true});
  },
  setPassword: () => {
    set({isPassword: true});
  },
  setUserFail: () => {
    // console.log("hi here");
    set({
      isUpdated: false,
      isLoggedIn: false,
      isRegistered: false,
      isPassword: false,
    });
  },
  logout: () => {
    localStorage.removeItem(APP_CONFIG.TOKEN);
    set(
      {
        isAuth: false,
        user: null,
        token: null,
      },
      false,
      "logout"
    );
  },
});

const useAuthStore = create(
  devtools(
    persist(AuthStore, {
      name: "l-admin-auth",
    })
  )
);

export default useAuthStore;

// export const MergedData = (data, payload) => {
//   let ids = new Set(payload.map((d) => d._id));
//   let updatateData = [...payload, ...data.filter((d) => !ids.has(d._id))];
//   return updatateData?.sort((a, b) => a?.createdAt - b?.createdAt);
// };

// export const EditData = (data, payload) => {
//   let updatateData =
//     data?.length > 0
//       ? data.map((item) => (item._id !== payload._id ? item : payload))
//       : data;
//   return updatateData;
// };

// export const DeleteData = (data, payload) => {
//   let filterItem =
//     data?.length > 0
//       ? [...data.filter((item) => item._id !== payload._id)]
//       : [];
//   return filterItem;
// };
