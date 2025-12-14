import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {couponService} from "../services/coupon.service";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => couponService.createCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-coupon-analytics"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-active-coupon"],
      });
    },
  });
};

export const useGetActiveCoupons = ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  return useQuery({
    queryKey: ["get-active-coupon", {page, limit, search}],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", limit);
      if (search) params.set("search", search);

      const {data} = await couponService.getActiveCoupons(params);
      return data;
    },
  });
};

export const useGetInactiveCoupons = ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  return useQuery({
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", limit);
      if (search) params.set("search", search);
      const {data} = await couponService.getInactiveCoupons(params);
      return data;
    },
    queryKey: ["get-inactive-coupons", {page, limit, search}],
  });
};

export const useGetCouponUsers = (id) => {
  return useQuery({
    queryFn: () => couponService.getCouponUsers(id),
    queryKey: ["get-coupon-users"],
  });
};

export const useGetCouponAnalytics = () => {
  return useQuery({
    queryFn: () => couponService.getCouponAnalytics(),
    queryKey: ["get-coupon-analytics"],
  });
};

export const useGetACoupon = (id) => {
  return useQuery({
    queryFn: () => couponService.getACoupon(id),
    queryKey: ["get-a-coupon"],
  });
};

export const useEditCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => couponService.editCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-active-coupon", "get-inactive-coupons", "get-coupons"],
      });
    },
  });
};

export const useUpdateCouponStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => couponService.updateCouponStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-active-coupon", "get-inactive-coupons", "get-a-coupon"],
      });
    },
  });
};
