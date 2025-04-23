import React, { useEffect, useState } from "react";
import { TextInput } from "../inputs";
import { MainBtn } from "../button";
import { useGroupsStore } from "../../data/stores/loggerstore";
import useErrorStore from "../../data/stores/errorstore";
import { toast } from "sonner";
import { apiCall } from "../../data/stores/authstore";

const CreateGroupModal = ({ handleClose }) => {
  let [state, setState] = useState({}),
    [members, setMembers] = useState(null),
    [instructors, setInstructors] = useState(null),
    textChange = ({ target: { value, name } }) => {
      setState({ ...state, [name]: value });
    },
    [loading, setLoading] = useState(null),
    { addLogger } = useGroupsStore(),
    { returnErrors } = useErrorStore(),
    handleSubmit = async (e) => {
      e?.preventDefault();
      if (!state?.title) return toast.info("Group title is required");
      let newState = state;
      // if (state?.members)
      newState.members = members?.docs
        ?.filter((ii) => ii?.isChecked)
        ?.map((ic) => ic?.email);
      // if (state?.instructors)
      newState.instructors = instructors?.docs
        ?.filter((ii) => ii?.isChecked)
        ?.map((ic) => ic?.email);

      // console.log({ newState });
      setLoading(true);
      let { response, errArr, errMsg } = await apiCall(
        "post",
        `/api/v1/groups/general`,
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
        addLogger(response);
        setState(null);
        handleClose();
        return;
      }
      setLoading(false);
    };

  let InsiderDispay = ({ x, it, setDatum }) => {
    return (
      <div key={x} className="flex border-b pb-2 justify-between items-center">
        <div className="flex gap-4">
          <input
            onChange={(e) => {
              setDatum((prev) => {
                let prevData = { ...prev },
                  dd = prevData?.docs,
                  current = dd?.find((ix) => ix?.email === it?.email);
                if (e?.target?.checked) {
                  current.isChecked = true;
                } else {
                  current.isChecked = false;
                }
                dd = dd?.map((ic) => (ic?.email === it?.email ? current : ic));
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
            {it?.firstName} {it?.lastName}
          </label>
        </div>
        <h6 className="text-sm first-letter:uppercase text-main satoshi font-normal">
          {it?.dept}
        </h6>
      </div>
    );
  };

  useEffect(() => {
    apiCall(
      "get",
      `/api/v1/user/manage-users?privilege=student&pagination=not&keepPrivilege=true`,
      null,
      (data) => setMembers(data?.data || data)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        onClick={(e) => e.target === e.currentTarget && handleClose()}
        className="fixed z-50 inset-0 bg-black bg-opacity-20 flex justify-center h-screen w-full items-center"
      >
        <div className="lg:w-1/2 w-5/6 mx-auto p-6 bg-[#fff] rounded-xl h-1/2 noScroll overflow-y-auto">
          <div className="bg-white rounded-xl w-full p-5">
            <h1 className="text-xl font-medium satoshi text-secondary">
              Create Group
            </h1>
            <form
              action=""
              onSubmit={(e) => e?.preventDefault()}
              className="mt-5"
            >
              <div className="space-y-4">
                <TextInput
                  label={"Name of Group"}
                  onChange={textChange}
                  value={state?.title}
                  name="title"
                />
                {/* <TextInput
									label={"Add Supervisor"}
									onChange={textChange}
									value={state?.instructors}
									name="instructors"
								/> */}
                <div className="space-y-4 mt-5 hidden">
                  <p className="text-base font-medium satoshi text-secondary">
                    {"Add Supervisor"}
                  </p>
                  {instructors?.docs?.map((it, x) => (
                    <InsiderDispay x={x} it={it} setDatum={setInstructors} />
                  ))}
                </div>
                {/* <TextInput
									label={"Add Member"}
									onChange={textChange}
									value={state?.members}
									name="members"
								/> */}
                <div className="space-y-4 mt-5">
                  <p className="text-base font-medium satoshi text-secondary">
                    {"Add Member"}
                  </p>
                  {members?.docs?.map((it, x) => (
                    <InsiderDispay x={x} it={it} setDatum={setMembers} />
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <MainBtn
                  text={"Create Group"}
                  onClick={handleSubmit}
                  loading={loading}
                  type="button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalContainer = ({ handleClose, children }) => {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed z-50 inset-0 bg-myblue bg-opacity-20 flex justify-center h-screen w-full items-center"
    >
      <div className="lg:w-1/2 w-5/6 mx-auto p-6 bg-[#fff] max-h-96 rounded-xl  noScroll overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default CreateGroupModal;
