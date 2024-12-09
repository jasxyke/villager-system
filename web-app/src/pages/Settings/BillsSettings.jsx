import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const BillsSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [allowMissedPayment, setAllowMissedPayment] = useState("Yes");
  const [paymentPerCollection, setPaymentPerCollection] = useState(1000);
  const [interest, setInterest] = useState(100);
  const [eWalletNumber, setEWalletNumber] = useState("");
  const [eWalletFile, setEWalletFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setAllowMissedPayment(settings.allow_miss_payments ? "Yes" : "No"); // Map boolean to Yes/No
      setPaymentPerCollection(settings.bill_amount_per_month || 1000);
      setInterest(settings.interest_per_missed_payment || 100);
      setEWalletNumber(settings.e_wallet_number || "");
    }
  }, [loading, settings]);

  const handleFileChange = (e) => {
    setEWalletFile(e.target.files[0]);
  };

  const editBills = async () => {
    const updatedSettings = {
      allow_miss_payments: allowMissedPayment === "Yes", // Convert back to boolean
      bill_amount_per_month: paymentPerCollection,
      interest_per_missed_payment: interest,
      e_wallet_number: eWalletNumber,
    };

    if (eWalletFile) {
      updatedSettings.e_wallet_pic = eWalletFile;
    }

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
    <EditTable title={"HOA Settings"} handleSave={editBills}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6 items-center">
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

        {/* Interest per Missed Payment Input */}
        <label htmlFor="interest" className="text-white">
          Interest per Missed Payment
        </label>
        <input
          type="number"
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* E-Wallet Number */}
        <label htmlFor="e_wallet_number" className="text-white">
          E-Wallet Number
        </label>
        <input
          type="text"
          id="e_wallet_number"
          value={eWalletNumber}
          onChange={(e) => setEWalletNumber(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* E-Wallet Picture */}
        <div className="flex justify-between items-center">
          <label htmlFor="e_wallet_pic_path" className="text-white">
            E-Wallet Picture
          </label>
          {settings?.e_wallet_pic_url && (
            <img
              src={settings.e_wallet_pic_url}
              alt="E-Wallet"
              className="w-16 h-16 mr-4 rounded-lg"
            />
          )}
        </div>
        <input
          type="file"
          id="e_wallet_pic_path"
          accept="image/*"
          onChange={handleFileChange}
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
