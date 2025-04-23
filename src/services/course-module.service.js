import { axiosInstance } from "../lib/axios";

class ModuleService {
  baseUrl = "/course-modules";

  async getModuleById(id) {
    const { data } = await axiosInstance.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async editModule({ moduleId, title, contentSections = [] }) {
    const formData = new FormData();
    if (title && title !== "undefined") {
      formData.append("title", title);
    }

    const processedSections = contentSections.map((section) => {
      // For image and video sections
      if (section.type === "image" || section.type === "video") {
        if (section.content instanceof File) {
          formData.append(section.id, section.content);
          return { ...section, content: section.id };
        }
      } else if (section.type === "quote") {
        if (section.content.avatar instanceof File) {
          formData.append(section.id, section.content.avatar);
          return { ...section, content: section.id };
        }
      }
      return section;
    });

    formData.append("contentSections", JSON.stringify(processedSections));

    const { data } = await axiosInstance.put(
      `${this.baseUrl}/${moduleId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}

export const moduleService = new ModuleService();
