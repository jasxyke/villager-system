import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const VillageSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [villageBlocks, setVillageBlocks] = useState(10); // default to 10
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setVillageBlocks(settings.village_blocks || 10); // get from settings or default to 10
    }
  }, [loading, settings]);

  const editVillageSettings = async () => {
    const updatedSettings = {
      village_blocks: villageBlocks, // update the village_blocks value
    };

    const message = await updateSettings(updatedSettings);
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 3000); // reset success message after 3 seconds
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
    <EditTable title={"Village Settings"} handleSave={editVillageSettings}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
        {/* Village Blocks Input */}
        <label htmlFor="villageBlocks" className="text-white">
          Village Blocks
        </label>
        <input
          type="number"
          id="villageBlocks"
          value={villageBlocks}
          onChange={(e) => setVillageBlocks(e.target.value)}
          className="border rounded-lg p-2 bg-greyGreen"
        />
      </div>
      {successMessage && (
        <div className="text-secondary mt-4">{successMessage}</div>
      )}
    </EditTable>
  );
};

export default VillageSettings;
