import {axiosInstance} from "../lib/axios";

class AnalyticsService {
  baseUrl = "/analytics";

  async getCoursesCreatedOverTime() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/created-over-time`
    );
    return data;
  }

  async getCoursesByCategory() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/by-category`
    );
    return data;
  }

  async getSkillLevelDistribution() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/skill-distribution`
    );
    return data;
  }

  async getEnrollmentCounts() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/enrollments`
    );
    return data;
  }

  async getTopEnrolledCourses() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/top-enrolled`
    );
    return data;
  }

  async getAverageRatings() {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/courses/avg-ratings`
    );
    return data;
  }
}

export const analyticsService = new AnalyticsService();
export default AnalyticsService;
