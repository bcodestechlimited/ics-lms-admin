import React, { useState, useEffect } from "react";
import MainContainer from "../../components/maincontainer";
import MainHeader from "../../components/mainheader";
import { DeleteBtn, MainBtn } from "../../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import Extractor from "../../data/useExtractor";
import { BiDownload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ModalContainer from "../../components/modals/modalcontainer";
import RawSample from "../../assets/ICS Sample.xlsx";
import { toast } from "sonner";
import useErrorStore from "../../data/stores/errorstore";
import { apiCall } from "../../data/stores/authstore";

const BulkUpload = () => {
	const { state } = useLocation(),
		[modal, setModal] = useState(""),
		navigate = useNavigate(),
		[pres, setPres] = useState([]),
		toggleUploadModal = () => setModal(""),
		[itemForm, setItemForm] = useState([]),
		[loading, setLoading] = useState(null),
		{ returnErrors } = useErrorStore(),
		handleSubmit = async e => {
			e?.preventDefault();
			if (itemForm?.length === 0) return toast.info("Invitee required");
			for (let f = 0; f < itemForm.length; f++) {
				const { firstName, lastName, email } = itemForm[f];

				if (!email || !lastName || !firstName)
					return toast.info(`S/N ${f + 1} User details is required`);
			}

			setLoading(true);
			let { response, errArr, errMsg } = await apiCall(
				"put",
				`/api/v1/user/manage-users/admin`,
				{
					members: itemForm,
					// nextScreen: `${window.location.origin}/activate`,
					privilege: state,
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
				navigate(-1);
				return;
			}
			setLoading(false);
		};

	const onSubmit2 = async () => {
		// console.log({ data });
		if (pres?.length === 0) return toast.info("Bulk Upload' details required");
		try {
			let newItemForm = pres;
			let newPres = [];
			for (let p = 0; p < newItemForm?.length; p++) {
				const element = newItemForm?.[p];
				newPres?.push(toCamel(element));
			}
			let newItem = [];
			for (let n = 0; n < newPres?.length; n++) {
				const element = newPres?.[n];
				newItem = [...newItem, element];
			}
			setItemForm([...itemForm, ...newItem]);
			console.log({ newItem });
			// setPres(null);
			toggleUploadModal();
			// navigate(`?step=${route}`);
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
		}
	};

	const handleInputChangeForMutipleItem = (event, index, field) => {
		const { value } = event.target;
		let itemValue = value;

		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows[index][field] = itemValue;
			return newRows;
		});
	};

	const handleDeleteRowForMutipleItem = index => {
		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows.splice(index, 1);
			return newRows;
		});
	};

	const addRowForMutipleItem = () => {
		const newRow = {};
		setItemForm([...itemForm, newRow]);
	};

	useEffect(() => {
		if (!state) return navigate(-1);
	}, [state, navigate]);

	useEffect(() => {
		setModal("add-admin");
	}, []);

	return (
    <MainContainer>
      <MainHeader text={"Bulk Upload"} small={`Register ${state} in bulk`} />
      <div className="bg-white p-6 rounded-xl">
        <div className={"flex justify-between items-center"}>
          <div className="flex items-center gap-6">
            <h2 className="text-skyblue font-bold text-xl satoshi capitalize">
              Bulk {state} upload
            </h2>
            {/* <SearchInput /> */}
          </div>
          <MainBtn
            text={"Click to Upload"}
            onClick={() => setModal("add-admin")}
          />
        </div>
        {/* <div className={"mt-10"}>
					<Instructorstable />
				</div> */}
        <div>
          <form className="space-y-2">
            <div className="relative grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 text-sm md:text-lg f-bold tracking-wide">
                  First Name
                </label>
              </div>
              <div className="">
                <label className="mb-1 text-sm md:text-lg f-bold tracking-wide">
                  Last Name
                </label>
              </div>
              <div className="">
                <label className="mb-1 text-sm md:text-lg f-bold tracking-wide">
                  Email
                </label>
              </div>
              <div className="">
                <label className="mb-1 text-sm md:text-lg f-bold tracking-wide"></label>
              </div>
            </div>
            {itemForm?.map((item, index) => (
              <>
                <div className="relative grid grid-cols-3 gap-4">
                  <div className="">
                    <div>
                      <input
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 bg-gray-100 rounded-lg w-full py-4 focus:outline-none focus:border-blue-400 border-none"
                        placeholder="First Name"
                        value={item.firstName}
                        onChange={(event) =>
                          handleInputChangeForMutipleItem(
                            event,
                            index,
                            "firstName"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <input
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 bg-gray-100 rounded-lg w-full py-4 focus:outline-none focus:border-blue-400 border-none"
                        placeholder="Last Name"
                        value={item.lastName}
                        onChange={(event) =>
                          handleInputChangeForMutipleItem(
                            event,
                            index,
                            "lastName"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <input
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 bg-gray-100 rounded-lg w-full py-4 focus:outline-none focus:border-blue-400 border-none"
                        placeholder="Email"
                        type="email"
                        value={item.email}
                        onChange={(event) =>
                          handleInputChangeForMutipleItem(event, index, "email")
                        }
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => handleDeleteRowForMutipleItem(index)}
                    className="md:absolute self-center -right-20 cursor-pointer"
                  >
                    <p className="text-sm text-red-600 flex items-center md:mt-2 gap-2">
                      <span>
                        <MdDelete />
                      </span>
                      Remove
                    </p>
                  </div>
                </div>
              </>
            ))}
            <p
              onClick={addRowForMutipleItem}
              className="flex items-center gap-2 text-bluerolodex f-medium py-3 cursor-pointer capitalize"
            >
              <span>
                <IoIosAdd />
              </span>
              Add {state}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <MainBtn
                text={"Send Invite"}
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
      {modal === "add-admin" && (
        <>
          <ModalContainer
            handleClose={() => {}}
            title={"New Bulk Upload"}
            subtitle={
              "Add new dataset from an excel or csv file. Download sample file"
            }
          >
            <div className="lg:w-1/2 mx-auto myShadow bg-white rounded-xl p-8">
              <Extractor pres={pres} setPres={setPres} />
              <div className="flex items-center gap-1 justify-between mx-auto my-3">
                <a
                  href={RawSample}
                  download={RawSample?.name}
                  target="_blank"
                  rel="noreferrer"
                  className="text-main flex items-center gap-1"
                >
                  <span>
                    <BiDownload />
                  </span>
                  <p className="text-xs py-0 my-0">Download sample file</p>
                </a>
                <div className="flex items-center gap-4">
                  <DeleteBtn
                    text={"Cancel"}
                    onClick={() => toggleUploadModal()}
                  />
                  <MainBtn
                    text={"Import"}
                    // loading={loading2}
                    type="submit"
                    onClick={onSubmit2}
                  />
                </div>
              </div>
            </div>
          </ModalContainer>
        </>
      )}
    </MainContainer>
  );
};

export default BulkUpload;

export const toCamel = o => {
	var newO, origKey, newKey, value;
	if (o instanceof Array) {
		return o.map(function (value) {
			if (typeof value === "object") {
				value = toCamel(value);
			}
			return value;
		});
	} else {
		newO = {};
		for (origKey in o) {
			if (o.hasOwnProperty(origKey)) {
				newKey = (
					origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
				).toString();
				newKey = newKey
					?.split(" ")
					// eslint-disable-next-line no-loop-func
					?.map((it, i) => {
						let newIt =
							i === 0
								? (it.charAt(0).toLowerCase() + it.slice(1) || it).toString()
								: (
										(origKey?.toLowerCase()?.startsWith("option") ||
										origKey?.toLowerCase()?.startsWith("right")
											? it.charAt(0).toLowerCase()
											: it.charAt(0).toUpperCase()) + it.slice(1) || it
								  ).toString();
						return newIt;
					})
					?.join(
						origKey?.toLowerCase()?.startsWith("option") ||
							origKey?.toLowerCase()?.startsWith("right")
							? "_"
							: ""
					);
				value = origKey?.toLowerCase()?.startsWith("right answer")
					? o[origKey]?.toLowerCase()?.trim()?.split(" ")?.join("_")
					: o[origKey];
				if (
					value instanceof Array ||
					(value !== null && value.constructor === Object)
				) {
					value = toCamel(value);
				}
				newO[newKey] = typeof value === "string" ? value?.trim() : value;
			}
		}
	}
	return newO;
};
