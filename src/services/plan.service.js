import { axiosInstance } from "../lib/axios";

class PlanService {
  BASE_URL = "/plans";
  async createPlanService(payload) {
    const { data } = await axiosInstance.post(this.BASE_URL, payload);
    return data;
  }

  async getAllPlansService() {
    const { data } = await axiosInstance.get(this.BASE_URL);
    return data;
  }

  async editPlanService(id, payload) {
    const { data } = await axiosInstance.put(`${this.BASE_URL}/${id}`, payload);
    return data;
  }

  async deletePlanService(id) {
    const { data } = await axiosInstance.delete(`${this.BASE_URL}/${id}`);
    return data;
  }
}

export const planService = new PlanService();
export default PlanService;
