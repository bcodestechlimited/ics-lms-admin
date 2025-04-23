import { create } from "zustand";

export const useCourseStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  queryParams: {
    page: 1,
    limit: 10,
  },
  setQueryParams: (params) =>
    set((state) => ({
      queryParams: { ...state.queryParams, ...params },
    })),
}));
