import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const PermitsSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [buildingClearanceFee, setBuildingClearanceFee] = useState(100);
  const [constructionClearanceFee, setConstructionClearanceFee] = useState(100);
  const [processingFee, setProcessingFee] = useState(100);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setBuildingClearanceFee(settings.building_clearance_fee || 100);
      setConstructionClearanceFee(settings.construction_clearance_fee || 100);
      setProcessingFee(settings.processing_fee || 100);
    }
  }, [loading, settings]);

  const editPermitsSettings = async () => {
    const updatedSettings = {
      building_clearance_fee: buildingClearanceFee,
      construction_clearance_fee: constructionClearanceFee,
      processing_fee: processingFee,
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
    <EditTable title={"Clearance Settings"} handleSave={editPermitsSettings}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Building Clearance Fee */}
        <label htmlFor="buildingClearanceFee" className="text-white">
          Building Clearance Fee
        </label>
        <input
          type="number"
          id="buildingClearanceFee"
          value={buildingClearanceFee}
          onChange={(e) => setBuildingClearanceFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Construction Clearance Fee */}
        <label htmlFor="constructionClearanceFee" className="text-white">
          Construction Clearance Fee
        </label>
        <input
          type="number"
          id="constructionClearanceFee"
          value={constructionClearanceFee}
          onChange={(e) => setConstructionClearanceFee(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />

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
