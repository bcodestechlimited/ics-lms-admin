import { axiosInstance } from "../lib/axios";

class CourseTemplateService {
  BASE_URL = "/templates";
  async createTemplateFromCourse(courseId) {
    try {
      const { data } = await axiosInstance.post(
        `${this.BASE_URL}/create-from-course/${courseId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllTemplates() {
    try {
      const { data } = await axiosInstance.get(`${this.BASE_URL}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getATemplateById(id) {
    try {
      const { data } = await axiosInstance.get(`${this.BASE_URL}/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createCourseFromTemplate(id) {
    try {
      const { data } = await axiosInstance.post(
        `${this.BASE_URL}/${id}/create-course`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const courseTemplateService = new CourseTemplateService();
export default CourseTemplateService;
