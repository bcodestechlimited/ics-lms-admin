import {axiosInstance} from "../lib/axios";

class CourseService {
  baseUrl = "/course";

  async createCourseService(payload) {
    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    const {data} = await axiosInstance.post(`${this.baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async getCoursesService(params) {
    const {data} = await axiosInstance.get(`${this.baseUrl}`, {params});
    return data;
  }

  async getCourseByIdService(payload) {
    const {id} = payload;
    const {data} = await axiosInstance.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async updateCourseService(payload) {
    const {courseId} = payload;
    const {data} = await axiosInstance.put(
      `${this.baseUrl}/${courseId}`,
      payload
    );
    return data;
  }

  async addModuleService(payload) {
    const formData = new FormData();
    formData.append("courseId", payload.courseId);
    formData.append("title", payload.title);

    const processedSections = payload.contentSections.map((section) => {
      // For image and video sections
      if (section.type === "image" || section.type === "video") {
        if (section.content instanceof File) {
          formData.append(section.id, section.content);
          return {...section, content: section.id};
        }
      } else if (section.type === "quote") {
        if (section.content.avatar instanceof File) {
          formData.append(section.id, section.content.avatar);
          return {...section, content: section.id};
        }
      }
      return section;
    });

    formData.append("contentSections", JSON.stringify(processedSections));

    const {data} = await axiosInstance.post(`/course-modules`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async addCourseAssessmentService(payload) {
    const {data} = await axiosInstance.post(
      `${this.baseUrl}/course-assessment`,
      payload
    );
    return data;
  }

  async addCourseBenchmarkService(payload) {
    const {data} = await axiosInstance.post(
      `${this.baseUrl}/course-benchmark`,
      payload
    );
    return data;
  }

  async createCourseCouponService(payload) {
    const {data} = await axiosInstance.post(
      `${this.baseUrl}/course-coupon`,
      payload
    );
    return data;
  }

  async getCourseCouponService(payload) {
    const {data} = await axiosInstance.get(
      `${this.baseUrl}/course-coupon?course_id=${payload?.courseId}`
    );
    return data;
  }

  async createCoursePricingService(payload) {
    const {data} = await axiosInstance.post(
      `${this.baseUrl}/course-pricing`,
      payload
    );
    return data;
  }

  async publishCourseService(id) {
    const {data} = await axiosInstance.patch(
      `${this.baseUrl}/${id}/publish-course`
    );
    return data;
  }

  async updateCourseAssessmentService(payload) {
    const {courseId} = payload;
    const {data} = await axiosInstance.put(
      `${this.baseUrl}/course-assessment/${courseId}`,
      payload
    );
    return data;
  }

  async editCourseBenchmarkService(payload) {
    try {
      const {data} = await axiosInstance.put(
        `${this.baseUrl}/edit-benchmark`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateCoursePricingService(payload) {
    try {
      const {data} = await axiosInstance.patch(
        `${this.baseUrl}/course-pricing`,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async uploadCertificate(payload) {
    try {
      const formData = new FormData();
      formData.append("certificate", payload.certificate);

      const {data} = await axiosInstance.post(
        `${this.baseUrl}/upload-course-certificate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCourseSummary(payload) {
    try {
      const {id} = payload;
      const {data} = await axiosInstance.get(
        `${this.baseUrl}/${id}/course-summary`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPublishedCourses(payload) {
    try {
      const {data} = await axiosInstance.get(
        `${this.baseUrl}/course-published`,
        {params: payload}
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async assingCoursesToStaffs(payload) {
    try {
      const {data} = await axiosInstance.post(
        this.baseUrl + "/assign-courses-to-staff",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const courseService = new CourseService();
