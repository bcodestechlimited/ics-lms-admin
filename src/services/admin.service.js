import {axiosInstance} from "../lib/axios";

class AdminService {
  BASE_URL = "/admins";
  async getUserRequestForCourseExtenstion() {
    const {data} = await axiosInstance.get(
      this.BASE_URL + "/user-request-for-course-extension"
    );
    return data;
  }

  async acceptUserRequestForCourseExtension(payload) {
    const {data} = await axiosInstance.post(
      this.BASE_URL + "/accept-request-for-course-extension",
      payload
    );
    return data;
  }

  async rejectUserRequestForCourseExtension(payload) {
    const {data} = await axiosInstance.post(
      this.BASE_URL + "/reject-request-for-course-extension",
      payload
    );
    return data;
  }

  async uploadCertificateTemplate(payload) {
    const {data} = await axiosInstance.post(
      this.BASE_URL + "/upload-certificate-template",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }

  async getIssuedCertificatesService() {
    const {data} = await axiosInstance.get("/certificates");
    return data;
  }

  async toggleUserAccount(id) {
    const {data} = await axiosInstance.patch(
      this.BASE_URL + `/users/${id}/toggle-status`
    );
    return data;
  }

  async createAdminAccount(payload) {
    const {data} = await axiosInstance.post(
      this.BASE_URL + "/create-admin-account",
      payload
    );
    return data;
  }
}

const adminService = new AdminService();
export default adminService;
