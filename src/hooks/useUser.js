import {useMutation, useQuery} from "@tanstack/react-query";
import {userService} from "../services/user.service";

export const useGetAllStudents = ({page = 1, limit = 20, search = ""} = {}) => {
  return useQuery({
    queryKey: ["get-all-students", {page, limit, search}],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", limit);
      if (search) params.set("search", search);

      const {data} = await userService.getAllStudentsService(params);
      return data;
    },
    keepPreviousData: true,
  });
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["get-user-by-id", id],
    queryFn: () => userService.getAUserByIdService(id),
  });
};

export const useGetUserCourseAnalytics = (id) => {
  return useQuery({
    queryKey: ["get-user-course-analytics", id],
    queryFn: () => userService.getUserCourseAnalyticsService(id),
  });
};

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: (payload) => userService.updateUserPassword(payload),
  });
};

// refactor: remove this code
// export const useBulkInvitationForOnboarding = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     queryKey: ["bulk-invitation-for-onboarding"],
//     mutationFn: (payload) => userService.uploadStaffInfoForOnboarding(payload),
//     onSuccess: () =>
//       queryClient.invalidateQueries({queryKey: ["get-all-students"]}),
//   });
// };
