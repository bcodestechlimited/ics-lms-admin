import React, { useMemo, useState } from "react";
import DataTable from ".";
import { Button } from "../button";
import ViewUserPaymentStatusModal from "../modals/view-user-payment-status-modal";

const defaultData = [
  {
    id: 1,
    name: "John Doe",
    userType: "Student",
    amount: 21199.99,
    transactionDate: "2024-01-15",
    noOfCourses: 3,
    transactionStatus: "Completed",
  },
  {
    id: 2,
    name: "Jane Doe",
    userType: "Student",
    amount: 21199.99,
    transactionDate: "2024-01-15",
    noOfCourses: 3,
    transactionStatus: "Pending",
  },
  {
    id: 3,
    name: "Jack Smith",
    userType: "Student",
    amount: 21199.99,
    transactionDate: "2024-01-15",
    noOfCourses: 3,
    transactionStatus: "rejected",
  },
];

const styles = {
  box: {
    container: `px-4 h-10 rounded-3xl flex items-center justify-center w-fit`,
  },
};

function getCompletedStatus(completedStatus) {
  switch (completedStatus.toUpperCase()) {
    case "COMPLETED":
      return (
        <div className={`${styles.box.container} bg-[#0B6C25]/10`}>
          <p className="text-[#0B6C25] capitalize">{completedStatus}</p>
        </div>
      );
    case "PENDING":
      return (
        <div className={`${styles.box.container} bg-[#FE9603]/10`}>
          <p className="text-[#FE9603] capitalize">{completedStatus}</p>
        </div>
      );
    case "REJECTED":
      return (
        <div className={`${styles.box.container} bg-[#E34033]/10`}>
          <p className="text-[#E34033] capitalize">{completedStatus}</p>
        </div>
      );
    default:
      <p className="text-[#FE9603] capitalize">{completedStatus}</p>;
  }
}

const PaymentDataTable = () => {
  const [data] = React.useState(defaultData);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [modal, setModal] = useState("");

  const handleCloseViewStatusModal = () => {
    setModal("");
  };

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "User Type",
        accessorKey: "userType",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const formatter = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          return <p>{formatter.format(getValue())}</p>;
        },
      },
      {
        header: "Transaction Date",
        accessorKey: "transactionDate",
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        header: "No. of Courses",
        accessorKey: "noOfCourses",
      },
      {
        header: "Transaction Status",
        accessorKey: "transactionStatus",
        cell: ({ getValue }) => getCompletedStatus(getValue()),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <Button
            onClick={() => {
              console.log("Row data:", row.original);
              setModal("view-status-modal");
            }}
            variant="secondary"
            size="sm"
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="">
        <DataTable
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pageSize={5}
        />
      </div>

      {modal === "view-status-modal" && (
        <ViewUserPaymentStatusModal handleClose={handleCloseViewStatusModal} />
      )}
    </div>
  );
};

export default PaymentDataTable;
