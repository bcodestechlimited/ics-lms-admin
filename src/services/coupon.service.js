import { axiosInstance } from "../lib/axios";

class CouponService {
  baseUrl = "/coupons";

  async createCoupon(payload) {
    try {
      const { data } = await axiosInstance.post(`${this.baseUrl}`, payload);
      return data;
    } catch (error) {
      console.log({ error });
      return "Internal Server error";
    }
  }

  async getAllCoupons(queryOptions) {
    try {
      const queryParams = new URLSearchParams();
      // Adding query parameters to the URLSearchParams object
      if (queryOptions.page)
        queryParams.append("page", queryOptions.page.toString());
      if (queryOptions.search)
        queryParams.append("search", queryOptions.search);
      if (queryOptions.sortBy)
        queryParams.append("sortBy", queryOptions.sortBy);
      if (queryOptions.limit)
        queryParams.append("limit", queryOptions.limit.toString());

      const { filters } = queryOptions;
      if (filters) {
        if (filters.discountType)
          queryParams.append("discountType", filters.discountType);
        if (filters.status)
          queryParams.append("status", filters.status.toUpperCase());
        if (filters.courseId) queryParams.append("courseId", filters.courseId);

        if (filters.expirationDate?.start) {
          queryParams.append(
            "startDate",
            filters.expirationDate.start.toISOString()
          );
        }
        if (filters.expirationDate?.end) {
          queryParams.append(
            "endDate",
            filters.expirationDate.end.toISOString()
          );
        }

        if (filters.percentageRange?.min !== undefined) {
          queryParams.append(
            "minPercentage",
            filters.percentageRange.min.toString()
          );
        }
        if (filters.percentageRange?.max !== undefined) {
          queryParams.append(
            "maxPercentage",
            filters.percentageRange.max.toString()
          );
        }
      }
      // console.log(queryParams.toString());
      console.log({ queryOptions });
      const url = `${this.baseUrl}?${queryParams.toString()}`;
      const { data } = await axiosInstance.get(url);
      return { data };
    } catch (error) {
      console.log("error from get all coupons", error);
      return "Internal Server Error";
    }
  }

  async getActiveCoupons() {
    try {
      const { data } = await axiosInstance.get(`${this.baseUrl}?status=ACTIVE`);
      return data;
    } catch (error) {
      return "Internal Server Error";
    }
  }

  async getInactiveCoupons() {
    try {
      const { data } = await axiosInstance.get(
        `${this.baseUrl}?status=INACTIVE`
      );
      return data;
    } catch (error) {
      return "Internal Server Error";
    }
  }

  async getCouponUsers(couponId) {
    try {
      const { data } = await axiosInstance.get(
        `${this.baseUrl}/${couponId}/users`
      );

      return data;
    } catch (error) {
      return "Error fetching Coupon Users";
    }
  }

  async getCouponAnalytics() {
    try {
      const { data } = await axiosInstance.get(`${this.baseUrl}/analytics`);
      return data;
    } catch (error) {
      return "Error fetching anayltics";
    }
  }

  async getACoupon(id) {
    try {
      const { data } = await axiosInstance.get(`${this.baseUrl}/${id}`);
      return data;
    } catch (error) {
      return "Error fetching Coupon";
    }
  }

  async editCoupon(payload) {
    try {
      const { data } = await axiosInstance.put(
        `${this.baseUrl}/edit-coupon`,
        payload
      );
      return data;
    } catch (error) {
      return "Error editing Coupon";
    }
  }

  async updateCouponStatus(payload) {
    try {
      const { data } = await axiosInstance.patch(
        `${this.baseUrl}/update-status`,
        payload
      );
      return data;
    } catch (error) {
      return "Error updating coupon status";
    }
  }
}

export const couponService = new CouponService();
