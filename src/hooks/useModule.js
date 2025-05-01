import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "../services/course-module.service";

export const useGetCourseModule = (id) => {
  return useQuery({
    queryFn: () => moduleService.getModuleById(id),
    queryKey: ["get-module"],
    enabled: !!id,
  });
};



export const useUpdateCourseModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => moduleService.editModule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-module"],
      });
    },
  });
};