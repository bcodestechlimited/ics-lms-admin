import { create } from "zustand";
import {DEFAULT_LIMIT} from "../helpers/service.helpers";

export const useCourseStore = create((set) => ({
  search: "",
  setSearch: (search) => set({search}),
  queryParams: {
    page: 1,
    limit: DEFAULT_LIMIT || 10,
  },
  setQueryParams: (params) =>
    set((state) => ({
      queryParams: {...state.queryParams, ...params},
    })),
}));
