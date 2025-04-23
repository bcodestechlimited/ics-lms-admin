import { Button } from "../button";
import CloseModalIcon from "../close-modal-icon";
import ModalContainer from "./modalcontainer";

const styles = {
  container: `flex items-center justify-between`,
};

const ViewUserPaymentStatusModal = ({ handleClose }) => {
  return (
    <ModalContainer handleClose={handleClose}>
      <div className="bg-white rounded-xl max-w-xl p-6 border w-full">
        <div className="relative">
          <CloseModalIcon handleClose={handleClose} />
        </div>
        <div className="mt-10">
          <div>
            <h2 className="mb-[24px] text-[20px] font-bold text-myblue">
              Transaction Details
            </h2>
            <div className="space-y-4 mb-[100px]">
              <div className={styles.container}>
                <p>Transaction Status</p>
                <p>Completed</p>
              </div>
              <div className={styles.container}>
                <p>Account Name</p>
                <p>Kolawomal John</p>
              </div>
              <div className={styles.container}>
                <p>Account Number</p>
                <p>133 221 7424</p>
              </div>
              <div className={styles.container}>
                <p>Transaction Date</p>
                <p>03 March, 2020</p>
              </div>
              <div className={styles.container}>
                <p>Transaction Time</p>
                <p>08:00 PM</p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button onClick={handleClose}>Okay</Button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewUserPaymentStatusModal;
