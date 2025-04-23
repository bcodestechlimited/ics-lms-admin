import {axiosInstance} from "../lib/axios";

class AuthService {
  baseUrl = "/user";

  async login(payload) {
    try {
      const {data} = await axiosInstance.post(`${this.baseUrl}/login`, payload);
      return data;
    } catch (error) {
      throw error
    }
  }

  async validateUser() {
    try {
      const {data} = await axiosInstance.get(`${this.baseUrl}/session`);
      return data
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthService();
export default AuthService;
