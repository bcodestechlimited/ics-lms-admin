import { axiosInstance } from "../lib/axios";

class UploadsService {
  BASE_URL = "/uploads/public";

  async getCloudinaryUploadSignature(type) {
    const { data } = await axiosInstance.post(`${this.BASE_URL}/signature`);
    return data.data;
  }
}

const uploadsService = new UploadsService();
export default uploadsService;
