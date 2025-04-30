import {FileImage, Info, UploadCloud, X} from "lucide-react";
import {useRef, useState} from "react";
import {toast} from "sonner";
import Loader from "../../components/loader";
import Shell from "../../components/shell";
import {CertificateTable} from "../../components/tables/certificate-table";
import {Button} from "../../components/ui/button";
import {
  useGetCertificates,
  useUploadCertificateTemplate,
} from "../../hooks/use-admin";

const CertificatesPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const uploadCourseCertificate = useUploadCertificateTemplate();
  const {isLoading, data: issuedCertificatesData} = useGetCertificates();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!["application/pdf"].includes(selectedFile.type)) {
        alert("Please upload only PDF files");
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileChange({target: {files: [droppedFile]}});
  };

  const handleCancel = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async (e) => {
    setUploading(true);
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("certificate_template", file);
      toast.promise(uploadCourseCertificate.mutateAsync(formData), {
        loading: "Uploading certificate template",
        success: (res) => {
          if (!res.success) {
            setUploading(false);
            return "Upload was not successful";
          }
          setUploading(false);
          return "Upload was successful";
        },
        error: () => {
          setUploading(false);
          return "Error Uploading file";
        },
      });
    }
  };

  return (
    <Shell pageHeader="Certificates" pageTitle="Certificates">
      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-center mt-10">
            <Loader />
          </div>
        ) : (
          !isLoading && <CertificateTable data={issuedCertificatesData} />
        )}

        {/* idea: in the future it is possible that this feature is required */}
        {/* <div>
          {modal === "open-issue-certificate-modal" && (
            <IssueCertificateModal
              handleClose={() => setModal("")}
              user={user}
            />
          )}
        </div> */}
      </div>

      <section className="mt-20 space-y-4">
        <h2 className="font-semibold text-secondary text-xl flex items-center gap-x-1">
          Upload Certificate template{" "}
          <span
            className=""
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"Upload student's certificate template"}
          >
            {" "}
            <Info size={15} />{" "}
          </span>
        </h2>

        <section className="bg-white border rounded-xl p-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-700"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <form onSubmit={handleUpload}>
                <div className="text-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    {!file ? (
                      <>
                        <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-800">
                          <UploadCloud className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="mt-2">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            PNG or JPG (MAX. 2MB)
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="h-32 w-32 object-contain rounded-lg border"
                              />
                            ) : (
                              <FileImage className="w-16 h-16 text-gray-400" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md dark:bg-gray-800 max-w-full">
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                              {file.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {(file.size / 1024 / 1024).toFixed(2)}MB
                            </span>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                            >
                              <X className="w-4 h-4" />
                              <span className="ml-1 text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={uploading}
                  />
                </div>

                {file && (
                  <div className="mt-6 flex justify-center gap-4">
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="px-8 bg-green-600 hover:bg-green-700"
                    >
                      {uploading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        "Confirm Upload"
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      disabled={uploading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </section>
    </Shell>
  );
};

export default CertificatesPage;
