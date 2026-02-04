import { axiosInstance } from "../lib/axios";

class CertificatesAdminService {
  BASE_URL = "/certificates";

  async saveCertificateTemplate(payload) {
    const { data } = await axiosInstance.post(
      `${this.BASE_URL}/templates`,
      payload, // { publicId, url }
    );
    return data;
  }

  async saveCertificateSignature(payload) {
    const { data } = await axiosInstance.post(
      `${this.BASE_URL}/signatures`,
      payload, // { publicId, url }
    );
    return data;
  }

  async getActiveCertificateTemplate() {
    const { data } = await axiosInstance.get(`${this.BASE_URL}/templates`);
    return data;
  }

  async getActiveCertificateSignature() {
    const { data } = await axiosInstance.get(`${this.BASE_URL}/signatures`);
    return data;
  }
}

const certificatesAdminService = new CertificatesAdminService();
export default certificatesAdminService;
