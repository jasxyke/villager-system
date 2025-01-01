import React from "react";
import { formatUserName } from "../../../utils/DataFormatter";

const PaymentHistory = ({ transactions }) => {
  return (
    <div className="space-y-4 text-sm">
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="p-3 border rounded-md shadow-md bg-gray-100 hover:bg-gray-200"
          >
            <p>
              Paid <strong>₱{parseFloat(transaction.amount).toFixed(2)}</strong>{" "}
              on{" "}
              <strong>
                {new Date(transaction.transaction_date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </strong>{" "}
              via <strong>{transaction.payment_method}</strong>.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
