import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { MainPaginate } from "../components/button";

const Extractor = ({ pres, setPres }) => {
	let [file, setFile] = useState(null),
		fileRef = useRef(),
		[keys, setKeys] = useState([]);

	let handleChangeImage = e => {
		const filer = e.target.files[0];
		let err = "";

		if (!filer) return (err = `File, ${filer?.name} does not exist`);

		if (err) {
			return toast.error(err);
		} else {
			setFile(filer);
		}
	};

	useEffect(() => {
		if (file) {
			extractor(file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	useEffect(() => {
		if (pres?.length > 0 && file) {
			let preKeys = [
				...new Set([...pres?.map(it => Object?.keys(it)?.map(ic => ic))]),
			];

			let newKeys = [];
			for (let f = 0; f < preKeys.length; f++) {
				const element = preKeys[f];
				newKeys = [...newKeys, ...element];
			}
			setKeys([...new Set(newKeys)]);
		}
	}, [pres, file]);
	// console.log({ keys });
	let extractor = file => {
		if (file) {
			// var name = file.name;
			const reader = new FileReader();
			reader.onload = evt => {
				// evt = on_file_select event
				/* Parse data */
				const bstr = evt.target.result;
				const wb = XLSX.read(bstr, { type: "binary" });
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, { header: 2 });
				/* Update state */
				// console.log("Data>>>" + data);
				console.log({ data });
				setPres(data);
			};
			reader.readAsBinaryString(file);
		}
	};

	let [range] = useState(9);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	const currentItems = pres?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(pres?.length / range);

	const handlePageClick = event => {
		const newOffset = (event.selected * range) % pres?.length;
		setItemOffset(newOffset);
		// setPage(1 + event?.selected);
	};

	return (
    <>
      <div
        onClick={() => fileRef?.current?.click()}
        className={`py-10 border border-dashed border-gray-300 bg-grey rounded-lg ${
          file && pres?.length > 0 ? "overflow-auto h-[400px]" : ""
        }`}
      >
        {file && pres?.length > 0 ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 overflow-auto">
              <thead className="text-md text-white capitalize maingradient">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-secondary font-medium satoshi text-sm capitalize"
                  >
                    S/N
                  </th>
                  {keys?.map((it, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-secondary font-medium satoshi text-sm capitalize"
                    >
                      {it}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((organization, ind) => (
                  <tr key={ind} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{ind + 1}</td>
                    {keys?.map((it, i) => (
                      <td key={i} className="px-6 py-4">
                        {organization?.[it]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <img
              src={require("../assets/file-icon.png")}
              alt=""
              className="mx-auto mb-2"
            />
            <p className="font-bold text-sm text-center">
              Select a CSV file to upload
            </p>
            <p className="text-xs text-center text-gray-400">
              or drag and drop it here
            </p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          style={{ width: "0" }}
          className="absolute -z-10"
          onChange={handleChangeImage}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv"
        />
      </div>
      {pageCount > 1 && (
        <MainPaginate
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          css="py-2"
        />
      )}
    </>
  );
};

export default Extractor;
