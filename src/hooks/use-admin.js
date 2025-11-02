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

export const useGetCertificates = ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  return useQuery({
    queryKey: ["get-certificates", {page, limit, search}],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", limit);
      if (search) params.set("search", search);

      const {data} = await adminService.getIssuedCertificatesService(params);
      return data;
    },
    keepPreviousData: true,
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
