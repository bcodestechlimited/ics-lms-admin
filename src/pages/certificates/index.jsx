import { useMemo, useState } from "react";
import Shell from "../../components/shell";
import {
  useActiveCertificateSignature,
  useActiveCertificateTemplate,
  useUploadCertificateSignatureFlow,
  useUploadCertificateTemplateFlow,
} from "../../hooks/useCertificate";

const CertificatesPage = () => {
  const [templateFile, setTemplateFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const templateQuery = useActiveCertificateTemplate();
  const signatureQuery = useActiveCertificateSignature();
  const uploadTemplate = useUploadCertificateTemplateFlow();
  const uploadSignature = useUploadCertificateSignatureFlow();

  const templateError = useMemo(() => {
    if (!templateFile) return "";
    const isPdf =
      templateFile.type === "application/pdf" ||
      templateFile.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return "Certificate template must be a PDF.";
    const maxBytes = 10 * 1024 * 1024;
    if (templateFile.size > maxBytes)
      return "PDF is too large. Max size is 10MB.";
    return "";
  }, [templateFile]);

  const signatureError = useMemo(() => {
    if (!signatureFile) return "";
    const isPng =
      signatureFile.type === "image/png" ||
      signatureFile.name.toLowerCase().endsWith(".png");
    if (!isPng) return "Signature must be a PNG file.";
    const maxBytes = 2 * 1024 * 1024;
    if (signatureFile.size > maxBytes)
      return "PNG is too large. Max size is 2MB.";
    return "";
  }, [signatureFile]);

  const handleUploadTemplate = async () => {
    if (!templateFile || templateError) return;
    const result = await uploadTemplate.mutateAsync({ file: templateFile });
    setTemplateFile(null);
    return result;
  };

  const handleUploadSignature = async () => {
    if (!signatureFile || signatureError) return;
    const result = await uploadSignature.mutateAsync({ file: signatureFile });
    setSignatureFile(null);
    return result;
  };

  return (
    <Shell pageHeader="" pageTitle="Certificates">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Global error */}
        {(uploadTemplate.isError || uploadSignature.isError) && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {uploadTemplate.error?.message || uploadSignature.error?.message}
          </div>
        )}

        {/* Global success */}
        {(uploadTemplate.isSuccess || uploadSignature.isSuccess) && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            Upload saved successfully.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Template */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Certificate Template (PDF)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Upload the institution’s PDF template. This is the background used
              for generated certificates.
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => setTemplateFile(e.target.files?.[0] || null)}
                className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
              />

              {templateError ? (
                <div className="text-xs text-red-700">{templateError}</div>
              ) : null}

              <button
                type="button"
                onClick={handleUploadTemplate}
                disabled={
                  !templateFile ||
                  Boolean(templateError) ||
                  uploadTemplate.isPending
                }
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploadTemplate.isPending ? "Uploading..." : "Upload Template"}
              </button>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <div className="font-medium text-slate-900">
                  Active template
                </div>
                {templateQuery.isLoading ? (
                  <div className="mt-2 text-sm text-slate-600">Loading...</div>
                ) : templateQuery.data?.data?.data?.data?.url ? (
                  <div className="mt-2 space-y-1">
                    <div>
                      <span className="text-slate-500">publicId:</span>{" "}
                      <span className="font-mono">
                        {templateQuery?.data?.data?.data?.data?.publicId}
                      </span>
                    </div>
                    <div>
                      <a
                        className="underline"
                        href={templateQuery?.data?.data?.data?.data?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open PDF
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-slate-600">
                    No template uploaded yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Signature (PNG)
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Upload a transparent PNG signature. This will be stamped onto
              generated certificates.
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="file"
                accept="image/png,.png"
                onChange={(e) => setSignatureFile(e.target.files?.[0] || null)}
                className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
              />

              {signatureError ? (
                <div className="text-xs text-red-700">{signatureError}</div>
              ) : null}

              <button
                type="button"
                onClick={handleUploadSignature}
                disabled={
                  !signatureFile ||
                  Boolean(signatureError) ||
                  uploadSignature.isPending
                }
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploadSignature.isPending
                  ? "Uploading..."
                  : "Upload Signature"}
              </button>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <div className="font-medium text-slate-900">
                  Active signature
                </div>
                {signatureQuery.isLoading ? (
                  <div className="mt-2 text-sm text-slate-600">Loading...</div>
                ) : signatureQuery?.data?.data?.data?.data?.url ? (
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-slate-500">publicId:</span>{" "}
                      <span className="font-mono">
                        {signatureQuery?.data?.data?.data?.data?.publicId}
                      </span>
                    </div>
                    <div>
                      <a
                        className="underline"
                        href={signatureQuery?.data?.data?.data?.data?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open image
                      </a>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      <img
                        src={signatureQuery?.data?.data?.data?.data?.url}
                        alt="Signature preview"
                        className="h-24 w-full object-contain p-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-slate-600">
                    No signature uploaded yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          <div className="font-semibold text-slate-900">Flow</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Frontend requests a signed Cloudinary upload payload from your
              backend.
            </li>
            <li>
              Frontend uploads the file directly to Cloudinary with that
              payload.
            </li>
            <li>
              Frontend sends{" "}
              <span className="font-mono">{"{ publicId, url }"}</span> to the
              backend for storage.
            </li>
          </ol>
        </div>
      </div>
    </Shell>
  );
};

export default CertificatesPage;
