import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const defaultQueryOptions = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  search: "",
  filters: {
    discountType: "",
    status: "",
    courseId: "",
    expirationDate: {
      start: undefined,
      end: undefined,
    },
    percentageRange: {
      min: undefined,
      max: undefined,
    },
  },
};

const useCouponStore = create(
  persist(
    devtools((set) => ({
      queryOptions: defaultQueryOptions,
      setQueryOptions: (options) =>
        set((state) => ({
          queryOptions: {
            ...state.queryOptions,
            ...options,
            filters: {
              ...state.queryOptions.filters,
              ...options.filters,
            },
          },
        })),
      resetQueryOptions: () => set({ queryOptions: defaultQueryOptions }),
    })),
    {
      name: "coupon-store", // Name for persisted storage
    }
  )
);

export default useCouponStore;
