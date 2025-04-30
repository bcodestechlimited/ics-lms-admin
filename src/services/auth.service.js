import {axiosInstance} from "../lib/axios";
import {APP_CONFIG} from "../lib/config";

const token = APP_CONFIG.TOKEN || "L&D_ADMIN";

class AuthService {
  baseUrl = "/user";

  async login(payload) {
    try {
      const {data} = await axiosInstance.post(`${this.baseUrl}/login`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validateUser() {
    try {
      const accessToken = localStorage.getItem(token);
      const {data} = await axiosInstance.get(`${this.baseUrl}/session`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
export default AuthService;
