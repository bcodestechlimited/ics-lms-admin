import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/course.service";
import { useCourseStore } from "../store/course-store";

export const useGetCourse = () => {
  const queryParams = useCourseStore((state) => state.queryParams);

  return useQuery({
    queryKey: ["courses", queryParams],
    queryFn: () => courseService.getCoursesService(queryParams),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => courseService.createCourseService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      // I can call the toast.error hook here but I am already using it in the form onSubmit handler
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => courseService.updateCourseService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-edit"] });
    },
  });
};

export const useCreateCourseModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => courseService.addModuleService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-module"] });
    },
  });
};

export const useCourseAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => courseService.addCourseAssessmentService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-assessment"] });
    },
  });
};

export const useCreateCourseBenchmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => courseService.addCourseBenchmarkService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-benchmark"] });
    },
  });
};

export const useCreateCoursePricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => courseService.createCoursePricingService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-pricing"] });
    },
  });
};

export const useGetCourseCoupon = () => {
  return useQuery({
    queryKey: ["course-coupon"],
    queryFn: () => courseService.getCourseCouponService(),
  });
};

export const usePublishCourse = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => courseService.publishCourseService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publish-course"] });
    },
  });
};

export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course-by-id"],
    queryFn: () => courseService.getCourseByIdService(id),
  });
};

export const useUpdateCourseAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      courseService.updateCourseAssessmentService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-assessment"] });
    },
  });
};

export const useGetCourseBenchmark = () => {
  return useQuery({
    queryKey: ["course-benchmark"],
    queryFn: () => courseService.getCourseBenchmarkService(),
  });
};

export const useEditCourseBenchmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => courseService.editCourseBenchmarkService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-benchmark"] });
    },
  });
};

export const useUpdateCoursePricing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => courseService.updateCoursePricingService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-pricing"] });
    },
  });
};

export const useUploadCourseCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      courseService.uploadCourseCertificateService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-certificate"] });
    },
  });
};

export const useGetCourseSummary = (payload) => {
  return useQuery({
    queryKey: [],
    queryFn: () => courseService.getCourseSummary(payload),
  });
};

export const useGetPublishedCourse = () => {
  return useQuery({
    queryKey: ["published-courses"],
    queryFn: () => courseService.getPublishedCourses({fields: "_id, title"}),
  });
};

export const useAssignCoursesToStaffs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => courseService.assingCoursesToStaffs(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["assign-courses-to-staffs"]});
    },
  });
};

export const useGetCoursePriceById = (payload) => {
  return useQuery({
    queryKey: ["course--price-by-id"],
    queryFn: () => courseService.getCoursePriceById(payload),
  });
};

export const useDeleteCourse = (payload) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => courseService.deleteCourse(payload),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["courses"]}),
  });
};

export const useGetCourseAssessment = (id) => {
  return useQuery({
    queryKey: ["course-assessment"],
    queryFn: () => courseService.getCourseAssessmentService(id),
  });
};




// export const useBulkInvitationForOnboarding = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     queryKey: ["bulk-invitation-for-onboarding"],
//     mutationFn: (payload) => userService.uploadStaffInfoForOnboarding(payload),
//     onSuccess: () =>
//       queryClient.invalidateQueries({queryKey: ["get-all-students"]}),
//   });
// };
