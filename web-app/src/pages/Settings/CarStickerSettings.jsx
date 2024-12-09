import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const CarStickerSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [twoWheelFee, setTwoWheelFee] = useState(200);
  const [fourWheelFee, setFourWheelFee] = useState(400);
  const [deliveryTruckFee, setDeliveryTruckFee] = useState(600);
  const [passThroughFee, setPassThroughFee] = useState(500);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setTwoWheelFee(settings.payment_per_car_sticker_two_wheel || 200);
      setFourWheelFee(settings.payment_per_car_sticker_four_wheel || 400);
      setDeliveryTruckFee(
        settings.payment_per_car_sticker_delivery_truck || 600
      );
      setPassThroughFee(settings.payment_per_car_sticker_pass_through || 500);
    }
  }, [loading, settings]);

  const editCarStickerSettings = async () => {
    const updatedSettings = {
      payment_per_car_sticker_two_wheel: twoWheelFee,
      payment_per_car_sticker_four_wheel: fourWheelFee,
      payment_per_car_sticker_delivery_truck: deliveryTruckFee,
      payment_per_car_sticker_pass_through: passThroughFee,
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
    <EditTable
      title={"Car Sticker Settings"}
      handleSave={editCarStickerSettings}
    >
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Two-Wheel Fee */}
        <label htmlFor="twoWheelFee" className="text-white">
          Two-Wheel Fee
        </label>
        <input
          type="number"
          id="twoWheelFee"
          value={twoWheelFee}
          onChange={(e) => setTwoWheelFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Four-Wheel Fee */}
        <label htmlFor="fourWheelFee" className="text-white">
          Four-Wheel Fee
        </label>
        <input
          type="number"
          id="fourWheelFee"
          value={fourWheelFee}
          onChange={(e) => setFourWheelFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Delivery Truck Fee */}
        <label htmlFor="deliveryTruckFee" className="text-white">
          Delivery Truck Fee
        </label>
        <input
          type="number"
          id="deliveryTruckFee"
          value={deliveryTruckFee}
          onChange={(e) => setDeliveryTruckFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Pass-Through Fee */}
        <label htmlFor="passThroughFee" className="text-white">
          Pass-Through Fee
        </label>
        <input
          type="number"
          id="passThroughFee"
          value={passThroughFee}
          onChange={(e) => setPassThroughFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />
      </div>
      {successMessage && (
        <div className="text-secondary mt-4">{successMessage}</div>
      )}
    </EditTable>
  );
};

export default CarStickerSettings;
