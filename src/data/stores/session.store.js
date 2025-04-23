import {create} from "zustand";

const useSessionStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setSession: (user) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),
  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
  startLoading: () => set({isLoading: true}),
  stopLoading: () => set({isLoading: false}),
}));

export default useSessionStore;
