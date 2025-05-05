import {axiosInstance} from "../lib/axios";

class UserService {
  BASE_URL = "/user";
  async getAllStudentsService() {
    try {
      const {data} = await axiosInstance.get(this.BASE_URL + "/students");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAUserByIdService(id) {
    try {
      const {data} = await axiosInstance.get(this.BASE_URL + "/" + id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserCourseAnalyticsService(id) {
    try {
      const {data} = await axiosInstance.get(
        this.BASE_URL + "/" + id + "/course-analytics"
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(payload) {
    const {data} = await axiosInstance.put(
      this.BASE_URL + "/update-password",
      payload
    );
    return data;
  }
}

export const userService = new UserService();
export default UserService;
