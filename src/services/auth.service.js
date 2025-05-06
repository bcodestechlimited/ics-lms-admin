import {axiosInstance} from "../lib/axios";
import {APP_CONFIG} from "../lib/config";

const token = APP_CONFIG.TOKEN || "L&D_ADMIN";

class AuthService {
  baseUrl = "/user";

  async login(payload) {
    try {
      const {data} = await axiosInstance.post(
        `${this.baseUrl}/login?role=admin`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validateUser() {
    try {
      const accessToken = localStorage.getItem("L&D_ADMIN");
      console.log({accessToken});
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

  async sendPasswordResetLink(payload) {
    const {data} = await axiosInstance.post(
      this.baseUrl + "/forgot-password?role=admin",
      payload
    );
    return data;
  }

  async resetPasswordService(payload) {
    const {data} = await axiosInstance.post(this.baseUrl + "/reset-password", {
      newPassword: payload.newPassword,
      token: payload.token,
    });
    return data;
  }

  async logout() {
    await axiosInstance.post("/user/logout");
  }
}

export const authService = new AuthService();
export default AuthService;
