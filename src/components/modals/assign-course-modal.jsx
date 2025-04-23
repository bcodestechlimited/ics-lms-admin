import VerifiedMarkIcon from "../../assets/verified_check.png";
import { Button } from "../button";
import CloseModalIcon from "../close-modal-icon";
import { TextInput } from "../inputs";
import ModalContainer from "./modalcontainer";

export const AssignCourseModal = ({
  handleClose,
  show,
  handleAssignModalSuccess,
}) => {
  return (
    <div className="satoshi">
      <ModalContainer>
        <div>
          <div>
            <div className="bg-white opacity-100 w-[550px] border px-8 py-4 rounded-xl space-y-8">
              <div className="relative">
                <CloseModalIcon handleClose={handleClose} />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-myblue font-bold">
                  Assign Course
                </h1>
              </div>

              {/* <input
              type="text"
              className="w-full h-[46px] rounded-xl px-2 border-[#0B2239] border"
            /> */}
              <TextInput placeholder={"Enter Department Name"} />
              <div className="flex justify-between items-center text-myblue">
                <h3 className="">Name</h3>
                <h3>Department</h3>
              </div>

              <div className="flex items-center justify-between text-[#0B2239]">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <p>Ajayi Henry</p>
                </div>
                <p>Fleet Managment</p>
              </div>
              <Button onClick={handleAssignModalSuccess}>Assign</Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export const CourseAssignedModal = ({
  show,
  handleShowCourseAssignedModal,
}) => {
  return (
    <ModalContainer>
      <div className="w-full flex items-center justify-center mx-auto">
        <div>
          <div className="w-80 rounded-xl border bg-white p-4 satoshi space-y-4">
            <div className="relative">
              <CloseModalIcon handleClose={handleShowCourseAssignedModal} />
            </div>
            <div className="flex flex-col items-start justify-start text-[#013467]">
              <img
                src={VerifiedMarkIcon}
                alt="A verified mark icon"
                className="h-[111px] w-[58px] object-cover"
              />
              <h5 className="font-bold text-[20px]">Course Assigned</h5>
              <p className="text-left">
                The course has been successfully assigned to the selected names
              </p>
            </div>
            <div></div>
            <Button onClick={handleShowCourseAssignedModal}>Okay</Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

