import React from "react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

export const MainPaginate = ({ handlePageClick, pageCount }) => (
  <div className="flex justify-center items-center py-10">
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      pageClassName="h-10 w-10 flex items-center justify-center rounded-full text-xl font-medium manrope bg-white border border-main text-main mx-2 cursor-pointer"
      className="flex items-center justify-center"
      previousClassName="hidden"
      nextClassName="hidden"
      activeClassName="bg-[#021C2f] text-white"
    />
  </div>
);

const BUTTON_TYPES = {
  primary: "bg-skyblue text-white",
  gray: "bg-gray-300 text-black",
  secondary:
    "border border-skyblue text-skyblue hover:bg-skyblue hover:text-white",
  white: "bg-white text-skyblue",
  danger: "bg-[#E34033]/20 text-[#E34033]",
};

export const Button = ({ buttonType, children, css, icon, ...restProps }) => {
  return (
    <button
      type={restProps?.type || "button"}
      disabled={restProps?.loading || restProps?.disabled}
      className={`h-10 px-4 bg-skyblue rounded-3xl text-base satoshi font-medium cursor-pointer text-white flex items-center ${
        icon || restProps?.loading ? "gap-2" : ""
      } ${css || "h-10"} ${BUTTON_TYPES[buttonType]}`}
      style={{
        boxShadow: "0px 5px 7.3px 0px rgba(5, 76, 166, 0.20)",
        ...restProps?.style,
      }}
      {...restProps}
    >
      <span>{icon}</span>
      <small
        className={
          restProps?.cssChild || "text-white font-medium manrope text-sm"
        }
      >
        {children}
      </small>
      {restProps?.loading && (
        <ClipLoader color={restProps?.loadCss || "white"} size={16} />
      )}
    </button>
  );
};

const Btn = () => {
  return <div></div>;
};
export const MainBtn = ({ onClick, text, ...restProps }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`h-10 px-4 bg-skyblue rounded-md text-base satoshi font-medium text-white ${
          restProps?.loading ? "flex items-center gap-2" : ""
        }`}
        type={restProps?.type || "button"}
        disabled={restProps?.loading || restProps?.disabled}
        {...restProps}
      >
        {text}
        {restProps?.loading && (
          <ClipLoader color={restProps?.loadCss || "white"} size={16} />
        )}
      </button>
    </div>
  );
};
export const Tablebtn = ({ onClick, text }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="h-6 px-4 bg-skyblue rounded-3xl text-xs satoshi font-medium text-white"
      >
        {text}
      </button>
    </div>
  );
};

export const DeleteBtn = ({ onClick, text, ...restProps }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`h-10 px-4 bg-[#E3403333] rounded-md capitalize text-base satoshi font-medium text-[#E34033] ${
          restProps?.loading ? "flex items-center gap-2" : ""
        }`}
        type={restProps?.type || "button"}
        disabled={restProps?.loading || restProps?.disabled}
        {...restProps}
      >
        {text}
        {restProps?.loading && (
          <ClipLoader color={restProps?.loadCss || "white"} size={16} />
        )}
      </button>
    </div>
  );
};

export const Addbutton = ({ onClick, text, space, icon }) => {
  // const navigate = useNavigate();
  return (
    <div>
      <button
        style={{
          background: "black !important",
        }}
        className={`bg-black btn h-8 shadow-xl px-3 hover:scale-110 hover:transition hover:transform hover:ease-out hover:duration-800 hover:delay-400 flex justify-center items-center gap-3 rounded-md text-white whitespace-nowrap text-sm ${
          space ? "mx-3" : ""
        }`}
        onClick={onClick}
      >
        <div>{icon || null}</div>
        <p className="text-white text-xs manrope animate-pulse my-auto py-0">
          {text}
        </p>
      </button>
    </div>
  );
};

export default Btn;

export const LoadMore = ({ handleLoadMore, next, loading }) => {
	return (
		<>
			{!next ? (
				""
			) : (
				<MainBtn
					onClick={handleLoadMore}
					text={loading ? "Loading..." : "Load More"}
					loading={loading}
					type={"button"}
				/>
			)}
		</>
	);
};