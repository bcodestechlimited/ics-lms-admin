import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCouponStore from "../data/stores/coupon.store";
import { couponService } from "../services/coupon.service";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => couponService.createCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-coupon"] });
    },
  });
};

export const useGetCoupon = () => {
  const queryOptions = useCouponStore((state) => state.queryOptions);

  return useQuery({
    queryKey: ["get-coupons", queryOptions],
    queryFn: () => couponService.getAllCoupons(queryOptions),
  });
};

export const useGetActiveCoupons = () => {
  return useQuery({
    queryKey: ["get-active-coupon"],
    queryFn: () => couponService.getActiveCoupons(),
  });
};

export const useGetInactiveCoupons = () => {
  return useQuery({
    queryFn: () => couponService.getInactiveCoupons(),
    queryKey: ["get-inactive-coupons"],
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