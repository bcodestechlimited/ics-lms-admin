import FailedPaymentIcon from "../../assets/pending-payment-icon.svg";
import SuccessfulPaymentIcon from "../../assets/successful-payment-icon.svg";
import Shell from "../../components/shell";
import PaymentDataTable from "../../components/tables/payment-table";

const styles = {
  box: {
    container: `p-[17px] rounded-md flex items-center gap-3 h-[100px]`,
    title: `font-medium`,
  },
};

const PaymentsPage = () => {
  return (
    <div>
      <Shell pageHeader={"Financial Metrics"} pageTitle={"Payment"}>
        <div className="space-y-8">
          <div className="border bg-white rounded-xl py-[31px] px-[21px] grid grid-cols-3 gap-3">
            <div className={`bg-[#006A0B14] ${styles.box.container}`}>
              <img src={SuccessfulPaymentIcon} alt="Successful payments icon" />
              <div className="">
                <h4 className={styles.box.title}>Successful Payment</h4>
                <p className="font-medium text-[32px]">234</p>
              </div>
            </div>
            <div className={`bg-[#FE960329] ${styles.box.container}`}>
              <img src={FailedPaymentIcon} alt="Pending payments icon" />
              <div className="">
                <h4 className={styles.box.title}>Pending Payment</h4>
                <p className="font-medium text-[32px]">789</p>
              </div>
            </div>
            <div className={`bg-[#FF373914] ${styles.box.container}`}>
              <img src={FailedPaymentIcon} alt="Failed payments icon" />
              <div className="">
                <h4 className={styles.box.title}>Failed </h4>
                <p className="font-medium text-[32px]">789</p>
              </div>
            </div>
          </div>

          <div>
            <PaymentDataTable />
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default PaymentsPage;
