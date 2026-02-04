import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import certificatesAdminService from "../services/certificate.service";
import uploadsService from "../services/upload.service";
import cloudinaryService from "../services/cloudinary.service";

export const useActiveCertificateTemplate = () => {
  return useQuery({
    queryKey: ["certificates", "template", "active"],
    queryFn: () => certificatesAdminService.getActiveCertificateTemplate(),
  });
};

export const useActiveCertificateSignature = () => {
  return useQuery({
    queryKey: ["certificates", "signature", "active"],
    queryFn: () => certificatesAdminService.getActiveCertificateSignature(),
  });
};

/**
 * Flow:
 * 1) get backend signature for template
 * 2) upload pdf to Cloudinary
 * 3) save { publicId, url } to backend
 */
export const useUploadCertificateTemplateFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      // payload: { file }
      const signaturePayload =
        await uploadsService.getCloudinaryUploadSignature(
          "certificate_template",
        );

      const cloudinaryResult =
        await cloudinaryService.uploadWithPublicSignature({
          file: payload.file,
          signaturePayload,
        });

      const saved = await certificatesAdminService.saveCertificateTemplate({
        publicId: cloudinaryResult.publicId,
        url: cloudinaryResult.url,
      });

      return { cloudinaryResult, saved };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates", "template", "active"],
      });
    },
  });
};

export const useUploadCertificateSignatureFlow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      // payload: { file }
      const signaturePayload =
        await uploadsService.getCloudinaryUploadSignature(
          "certificate_signature",
        );

      const cloudinaryResult =
        await cloudinaryService.uploadWithPublicSignature({
          file: payload.file,
          signaturePayload,
        });

      const saved = await certificatesAdminService.saveCertificateSignature({
        publicId: cloudinaryResult.publicId,
        url: cloudinaryResult.url,
      });

      return { cloudinaryResult, saved };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates", "signature", "active"],
      });
    },
  });
};
