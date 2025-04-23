import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CourseTemplateService from "../services/template.service";

const templateService = new CourseTemplateService();
export const useGetTemplates = () => {
  return useQuery({
    queryKey: ["get-templates"],
    queryFn: () => templateService.getAllTemplates(),
  });
};

export const useCreateTemplateFromCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => templateService.createTemplateFromCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-templates"],
      });
    },
  });
};

export const useCreateCourseFromTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => templateService.createCourseFromTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-templates"],
      });
    },
  });
};

export const useGetTemplateById = () => {
  // TODO:
};
