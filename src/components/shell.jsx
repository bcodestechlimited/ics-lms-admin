import { Button } from "./button";
import MainContainer from "./maincontainer";
import MainHeader from "./mainheader";

/**
 * Shell component for rendering a container for the pages.
 *
 * @param {Object} props - The component props
 * @param {string} props.pageTitle - The Main Header title.
 * @param {string} props.pageHeader - The page Sub-title.
 * @param {Object} props.btnAction - The page Button (disabled by default).
 * @returns {JSX.Element} A React component rendering the Reusable shell.
 */
const Shell = ({
  pageTitle,
  pageHeader,
  children,
  btnAction = { isActive: false },
}) => {
  return (
    <div className="satoshi">
      <MainContainer>
        <MainHeader text={pageTitle} />
        <div className="mt-[56px]">
          <div className="flex items-center justify-between  mb-[30px]">
            <h1 className="text-[20px] font-bold text-secondary">
              {pageHeader}
            </h1>
            {btnAction.isActive && (
              <Button onClick={btnAction.onClick}>{btnAction.title}</Button>
            )}
          </div>
          <div>{children}</div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Shell;
