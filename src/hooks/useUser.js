import {useQuery} from "@tanstack/react-query";
import {userService} from "../services/user.service";

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ["get-all-students"],
    queryFn: () => userService.getAllStudentsService(),
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
