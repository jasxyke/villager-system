import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const BillsSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [allowMissedPayment, setAllowMissedPayment] = useState("Yes");
  const [paymentPerCollection, setPaymentPerCollection] = useState(1000);
  const [interest, setInterest] = useState(100);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setAllowMissedPayment(settings.allow_miss_payments || "Yes");
      setPaymentPerCollection(settings.bill_amount_per_month || 1000);
      setInterest(settings.additional_per_missed_payment || 100);
    }
  }, [loading, settings]);

  const editBills = async () => {
    const updatedSettings = {
      allow_missed_payment: allowMissedPayment,
      bill_amount_per_month: paymentPerCollection,
      additional_per_missed_payment: interest,
    };

    const message = await updateSettings(updatedSettings);
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <EditTable loading={loading}>
        <LoadingContainer />
      </EditTable>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <EditTable title={"Bills Settings"} handleSave={editBills}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Allow Missed Payments Dropdown */}
        <label htmlFor="allowMissedPayment" className="text-white">
          Allow Missed Payments
        </label>
        <select
          id="allowMissedPayment"
          value={allowMissedPayment}
          onChange={(e) => setAllowMissedPayment(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Bill Amount Input */}
        <label htmlFor="bill_amount_per_month" className="text-white">
          Bill Amount Per Month
        </label>
        <input
          type="number"
          id="bill_amount_per_month"
          value={paymentPerCollection}
          onChange={(e) => setPaymentPerCollection(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Additional per Missed Payment Input */}
        <label htmlFor="additional" className="text-white">
          Additional per Missed Payment
        </label>
        <input
          type="number"
          id="additional"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />
      </div>
      {successMessage && (
        <div className="text-secondary mt-4">{successMessage}</div>
      )}
    </EditTable>
  );
};

export default BillsSettings;
