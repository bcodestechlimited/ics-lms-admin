import React from "react";
import { ModalContainer } from "./creategroupmodal";
import { TextInput } from "../inputs";
import { Button } from "../button";

const AddMemberModal = ({ handleClose }) => {
  return (
    <div>
      <ModalContainer handleClose={handleClose}>
        <div className="bg-white p-5">
          <h1 className="text-xl font-medium satoshi text-secondary">
            Add Member
          </h1>
          <form action="" className="mt-6">
            <TextInput
              label={"Name of Member"}
              placeholder={"Search name of member"}
            />
            <div className="mt-8">
              <Button>Add Member</Button>
            </div>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
};

export const AddInstructorModal = ({ handleClose }) => {
  return (
    <div>
      <ModalContainer handleClose={handleClose}>
        <div className="bg-white p-5">
          <h1 className="text-xl font-medium satoshi text-secondary">
            Add Instructor
          </h1>
          <form action="" className="mt-6">
            <TextInput
              label={"Name of Instructor"}
              placeholder={"Search name of member"}
            />
            <div className="mt-8">
              <Button>Add Instructor</Button>
            </div>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
};
export default AddMemberModal;
