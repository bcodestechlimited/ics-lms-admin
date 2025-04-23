import { useEffect, useState } from "react";
import CloseModalIcon from "../close-modal-icon";
import ModalContainer from "./modalcontainer";
import { Button } from "../ui/button";

const styles = {
  label: `block text-gray-700`,
  input: `mt-1 block w-full border rounded px-3 py-2`,
};

export function IssueCertificateModal({ handleClose, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courseTitle: "",
  });

  // Initialize form data once when component mounts
  useEffect(() => {
    setFormData({
      name: `${user?.firstName} ${user?.lastName}` || "",
      email: user?.email || "",
      courseTitle: user?.course_title || "",
    });
  }, [user?.course_title, user?.email, user?.firstName, user?.lastName]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    // Add certificate generation logic here
    console.log("Generating certificate with:", formData);
  };

  return (
    <ModalContainer>
      <div className="relative bg-white rounded-xl border p-6 w-full max-w-xl shadow">
        <CloseModalIcon handleClose={handleClose} />

        <div>
          <h1 className="font-medium mb-4">Generate Certificate</h1>
          <form onSubmit={handleGenerateCertificate} className="space-y-4">
            <div>
              <label htmlFor="name" className={styles.label}>
                Student Name
              </label>
              <input
                type="text"
                placeholder="Student Name"
                id="name"
                className={styles.input}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className={styles.input}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="courseTitle" className={styles.label}>
                Course Title
              </label>
              <input
                type="text"
                placeholder="Course Title"
                id="courseTitle"
                className={styles.input}
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Button type="submit">
                {" "}
                {/* Changed to submit type */}
                Generate Certificate
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
}
