import { axiosInstance } from "../lib/axios";

class ModuleService {
  baseUrl = "/course-modules";

  async getModuleById(id) {
    const {data} = await axiosInstance.get(`${this.baseUrl}/${id}`);
    return data;
  }

 
  async editModule({
    moduleId,
    title,
    contentSections = [],
  }) {
    const formData = new FormData();

    // 1. Title (optional)
    if (title) {
      formData.append("title", title);
    }

    // 2. Build sections payload, and append files if present
    const sectionsPayload = contentSections.map((section) => {
      const {id, type, content} = section;

      // image & video → upload File, then send the field name (the section.id)
      if ((type === "image" || type === "video") && content instanceof File) {
        formData.append(id, content);
        return {id, type, content: id};
      }

      // quote → avatar File upload
      if (type === "quote" && content && content.avatar instanceof File) {
        formData.append(id, content.avatar);
        // replace avatar with its field name
        return {
          id,
          type,
          content: {...content, avatar: id},
        };
      }

      // fallback: send whatever is in content
      return {id, type, content};
    });

    // 3. Stringify the full array
    formData.append("contentSections", JSON.stringify(sectionsPayload));

    // 4. Fire the request
    const {data} = await axiosInstance.put(
      `${this.baseUrl}/${moduleId}`,
      formData,
      {headers: {"Content-Type": "multipart/form-data"}}
    );
    return data;
  }
}

export const moduleService = new ModuleService();
