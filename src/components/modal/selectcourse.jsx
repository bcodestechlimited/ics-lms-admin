import React, { useEffect, useState } from "react";
import { ModalContainer } from "../modals/creategroupmodal";
import { ImageInput, SearchInput } from "../inputs";
import useAuthStore, { apiCall } from "../../data/stores/authstore";
import useCourseStore from "../../data/stores/course.store";
import { useGroupsStore } from "../../data/stores/loggerstore";
import useErrorStore from "../../data/stores/errorstore";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Button } from "../button";

const SelectCourseModal = ({ handleClose, item }) => {
  let { user } = useAuthStore(),
    items = useLocation()?.state,
    { getInstitutionCourse, resetCourseSearch, institution } = useCourseStore(),
    [datum, setDatum] = useState(null),
    [loading, setLoading] = useState(null),
    { updateLogger } = useGroupsStore(),
    { returnErrors } = useErrorStore(),
    handleSubmit = async (e) => {
      e?.preventDefault();
      let newState = {};

      newState.courses = datum?.docs
        ?.filter((ii) => ii?.isChecked)
        ?.map((ic) => ic?._id);

      if (newState?.["courses"]?.length === 0)
        return toast.info(`Courses is required`);
      // console.log({ newState });
      setLoading(true);
      let { response, errArr, errMsg } = await apiCall(
        "post",
        `/api/v1/groups/manage-courses?group=${item?._id || items?._id}`,
        newState
      );
      console?.log({ response, errArr, errMsg });
      if (errArr) {
        setLoading(false);
        return returnErrors(errArr);
      }
      if (errMsg) {
        setLoading(false);
        return toast.error(errMsg);
      }
      setLoading(false);
      if (response) {
        updateLogger(response);
        handleClose();
        return;
      }
      setLoading(false);
    };

  useEffect(() => {
    apiCall(
      "get",
      `/api/v1/course?company=institution&institution=${user?.organisation}&institutionCourse=${user?.organisation}`,
      null,
      getInstitutionCourse
    );
    resetCourseSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDatum(institution);
  }, [institution]);

  let InsiderDispay = ({ x, it, setDatum }) => {
    return (
      <div
        key={x}
        style={{
          borderBottom: "0.5px solid #01346780",
        }}
        className="flex border-b pb-2 justify-between items-center"
      >
        <div className="flex gap-4">
          <input
            onChange={(e) => {
              setDatum((prev) => {
                let prevData = { ...prev },
                  dd = prevData?.docs,
                  current = dd?.find((ix) => ix?._id === it?._id);
                if (e?.target?.checked) {
                  current.isChecked = true;
                } else {
                  current.isChecked = false;
                }
                dd = dd?.map((ic) => (ic?._id === it?._id ? current : ic));
                prevData.docs = dd;
                return prevData;
              });
            }}
            type="checkbox"
            checked={it?.isChecked}
            className="h-4 w-4 border"
            id={it?._id}
          />
          <label
            className="text-sm text-main satoshi font-normal"
            htmlFor={it?._id}
          >
            {it?.title}
          </label>
        </div>
        <h6 className="text-sm first-letter:uppercase text-main satoshi font-normal">
          {it?.dept}
        </h6>
      </div>
    );
  };

  return (
    <div>
      <ModalContainer handleClose={handleClose}>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <strong className="text-secondary font-bold text-xl satoshi">
              Select Course
            </strong>
            <SearchInput />
          </div>
          <div
            style={{
              border: "1px solid #0134674D",
            }}
            className="p-4 rounded-xl mt-6"
          >
            <div className="">
              <div className="space-y-4 mt-5">
                <p className="text-base font-medium satoshi text-secondary">
                  {"Courses"}
                </p>
                {datum?.docs?.map((it, x) => (
                  <InsiderDispay x={x} it={it} setDatum={setDatum} />
                ))}
              </div>
            </div>
          </div>
          <div className="py-8">
            <Button onClick={handleSubmit} loading={loading} type="button">
              Add Course
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export const ShareDocumentCourseModal = ({ handleClose, item }) => {
  let items = useLocation()?.state,
    [loading, setLoading] = useState(null),
    { updateLogger } = useGroupsStore(),
    { returnErrors } = useErrorStore(),
    [state, setState] = useState(null),
    handleChangeImage = (e) => {
      const file = e.target.files[0];
      let err = "";

      if (!file) return (err = `File, ${file?.name} does not exist`);
      // if (!file.type.includes("image"))
      // return (err = `File, ${file?.name} format not supported`);

      if (err) {
        return toast.error(err);
      } else {
        // setLogo(file);

        setState((prevRows) => {
          let newRows = { ...prevRows };
          newRows.file = file;
          return newRows;
        });
      }
    },
    handleSubmit = async (e) => {
      e?.preventDefault();
      let newState = {
        course: item?._id,
        group: items?._id,
        intendedFile: state?.file,
        intendedFileName: "file",
      };

      if (!state?.file) return toast.info(`Document to share is required`);
      // console.log({ newState });
      setLoading(true);
      let { response, errArr, errMsg } = await apiCall(
        "post",
        `/api/v1/groups/manage-courses-document`,
        newState,
        null,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console?.log({ response, errArr, errMsg });
      if (errArr) {
        setLoading(false);
        return returnErrors(errArr);
      }
      if (errMsg) {
        setLoading(false);
        return toast.error(errMsg);
      }
      setLoading(false);
      if (response) {
        updateLogger(response);
        handleClose();
        return;
      }
      setLoading(false);
    };

  return (
    <div>
      <ModalContainer handleClose={handleClose}>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <strong className="text-secondary font-bold text-xl satoshi">
              Select Document
            </strong>
          </div>
          <div
            style={{
              border: "1px solid #0134674D",
            }}
            className="p-4 rounded-xl mt-6"
          >
            <ImageInput
              label={"Select a document"}
              width={"w-full"}
              name={"certificate"}
              state={state?.file}
              onChange={handleChangeImage}
            />
          </div>
          <div className="py-8">
            <Button onClick={handleSubmit} loading={loading} type="button">
              Share Document
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default SelectCourseModal;
