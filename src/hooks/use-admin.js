import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import adminService from "../services/admin.service";

export const useRequestForCourseExtension = () => {
  return useQuery({
    queryKey: ["request-for-course-extension"],
    queryFn: () => adminService.getUserRequestForCourseExtenstion(),
  });
};

export const useAcceptUserRequestForCourseExtension = () => {
  return useMutation({
    mutationFn: (payload) =>
      adminService.acceptUserRequestForCourseExtension(payload),
  });
};

export const useRejectUserRequestForCourseExtension = () => {
  return useMutation({
    mutationFn: (payload) =>
      adminService.rejectUserRequestForCourseExtension(payload),
  });
};

export const useUploadCertificateTemplate = () => {
  return useMutation({
    mutationFn: (payload) => adminService.uploadCertificateTemplate(payload),
  });
};

export const useGetCertificates = () => {
  return useQuery({
    queryKey: ["get-certificates"],
    queryFn: () => adminService.getIssuedCertificatesService(),
  });
};

export const useAdminToggleStatus = () => {
  return useMutation({
    mutationFn: (id) => adminService.toggleUserAccount(id),
  });
};

export const useCreateAdminAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => adminService.createAdminAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users", "list"]});
    },
  });
};
