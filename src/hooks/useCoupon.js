import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { couponService } from "../services/coupon.service";

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

export const useGetCouponUsers = (id) => {
  return useQuery({
    queryFn: () => couponService.getCouponUsers(id),
    queryKey: ["get-coupon-users"],
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

export const useSendCouponToUsersForACourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => couponService.sendCouponToUsersForACourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-coupon-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["get-active-coupon"] });
    },
  });
};

export const useGetCourseCoupons = ({ page = 1, limit = 20, search = "" } = {}) => {
  return useQuery({
    queryKey: ["get-course-coupons", { page, limit, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search) params.set("search", search);

      return couponService.getCourseCoupons(params);
    },
  });
};

export const useGetCourseCouponAnalytics = () => {
  return useQuery({
    queryKey: ["get-course-coupon-analytics"],
    queryFn: async () => couponService.getCourseCouponAnalytics(),
  });
};

export const useExtendCourseCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ couponId, expirationDate }) =>
      couponService.extendCourseCoupon(couponId, { expirationDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-course-coupons"] });
      queryClient.invalidateQueries({ queryKey: ["get-course-coupon-analytics"] });
    },
  });
};
