import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { planService } from "../services/plan.service";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => planService.createPlanService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-plans"],
      });
    },
  });
};

export const useGetAllPlans = () => {
  return useQuery({
    queryKey: ["get-all-plans"],
    queryFn: () => planService.getAllPlansService(),
  });
};

export const useEditAPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => planService.editPlanService(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-plans"],
      });
    },
  });
};

export const useDeleteAPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => planService.deletePlanService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-plans"],
      });
    },
  });
};
