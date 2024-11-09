import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const PermitsSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [paymentPerSquareMeter, setPaymentPerSquareMeter] = useState(50);
  const [paymentPerCarSticker, setPaymentPerCarSticker] = useState(200);
  const [paymentForGuestCarPermits, setPaymentForGuestCarPermits] =
    useState(150);
  const [processingFee, setProcessingFee] = useState(100); // New state for processing fee
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setPaymentPerSquareMeter(settings.payment_per_square_meter || 50);
      setPaymentPerCarSticker(settings.payment_per_car_sticker || 200);
      setPaymentForGuestCarPermits(
        settings.payment_for_guest_car_permits || 150
      );
      setProcessingFee(settings.processing_fee || 100); // Set processing fee from settings
    }
  }, [loading, settings]);

  const editPermitsSettings = async () => {
    const updatedSettings = {
      payment_per_square_meter: paymentPerSquareMeter,
      payment_per_car_sticker: paymentPerCarSticker,
      payment_for_guest_car_permits: paymentForGuestCarPermits,
      processing_fee: processingFee, // Include processing fee
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
    <EditTable title={"Permits Settings"} handleSave={editPermitsSettings}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Payment per Square Meter */}
        <label htmlFor="paymentPerSquareMeter" className="text-white">
          Payment per Sq. Meter
        </label>
        <input
          type="number"
          id="paymentPerSquareMeter"
          value={paymentPerSquareMeter}
          onChange={(e) => setPaymentPerSquareMeter(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Payment per Car Sticker */}
        <label htmlFor="paymentPerCarSticker" className="text-white">
          Payment per Car Sticker
        </label>
        <input
          type="number"
          id="paymentPerCarSticker"
          value={paymentPerCarSticker}
          onChange={(e) => setPaymentPerCarSticker(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Payment for Guest Car Permits */}
        {/* <label htmlFor="paymentForGuestCarPermits" className="text-white">
          Payment for Guest Car Permits
        </label>
        <input
          type="number"
          id="paymentForGuestCarPermits"
          value={paymentForGuestCarPermits}
          onChange={(e) => setPaymentForGuestCarPermits(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        /> */}

        {/* Processing Fee */}
        <label htmlFor="processingFee" className="text-white">
          Processing Fee
        </label>
        <input
          type="number"
          id="processingFee"
          value={processingFee}
          onChange={(e) => setProcessingFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />
      </div>
      {successMessage && (
        <div className="text-secondary mt-4">{successMessage}</div>
      )}
    </EditTable>
  );
};

export default PermitsSettings;
