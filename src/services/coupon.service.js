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

  async getActiveCoupons(params) {
    try {
      const { data } = await axiosInstance.get(
        `${this.baseUrl}?status=ACTIVE&${params.toString()}`,
      );
      return data;
    } catch (error) {
      return "Internal Server Error";
    }
  }

  async getInactiveCoupons(params) {
    try {
      const { data } = await axiosInstance.get(
        `${this.baseUrl}?status=INACTIVE&${params.toString()}`,
      );
      return data;
    } catch (error) {
      return "Internal Server Error";
    }
  }

  async getCouponUsers(couponId) {
    try {
      const { data } = await axiosInstance.get(`${this.baseUrl}/${couponId}/users`);

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
      const { data } = await axiosInstance.put(`${this.baseUrl}/edit-coupon`, payload);
      return data;
    } catch (error) {
      return "Error editing Coupon";
    }
  }

  async updateCouponStatus(payload) {
    try {
      const { data } = await axiosInstance.patch(
        `${this.baseUrl}/update-status`,
        payload,
      );
      return data;
    } catch (error) {
      return "Error updating coupon status";
    }
  }

  async sendCouponToUsersForACourse(payload) {
    try {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append("courseId", payload.courseId);
      formData.append("discountType", payload.discountType);
      formData.append("percentage", payload.percentage);
      formData.append("expirationDate", payload.expirationDate);

      const { data } = await axiosInstance.post(`course-coupons/issue-coupon`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Internal Server Error";
      throw new Error(message);
    }
  }

  async getCourseCoupons(params) {
    const { data } = await axiosInstance.get(`course-coupons?${params.toString()}`);
    return data;
  }

  async getCourseCouponAnalytics() {
    const { data } = await axiosInstance.get(`course-coupons/analytics`);
    return data;
  }

  async extendCourseCoupon(couponId, payload) {
    try {
      const { data } = await axiosInstance.patch(
        `course-coupons/${couponId}/extend-expiration`,
        payload,
      );
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update expiration date";
      throw new Error(message);
    }
  }
}

export const couponService = new CouponService();
