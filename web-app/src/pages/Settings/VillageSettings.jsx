import React, { useState, useEffect } from "react";
import EditTable from "./EditTable";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useSettings } from "../../contexts/SettingsContext";

const VillageSettings = () => {
  const { settings, loading, error, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    village_name: "",
    village_address: "",
    village_contact_number_1: "",
    village_contact_number_2: "",
    village_email: "",
    village_hoa_reg_num: "",
    village_tin_no: "",
    village_blocks: 10,
    logo_1: null,
    logo_2: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && settings) {
      setFormData((prevState) => ({
        ...prevState,
        village_name: settings.village_name || "",
        village_address: settings.village_address || "",
        village_contact_number_1: settings.village_contact_number_1 || "",
        village_contact_number_2: settings.village_contact_number_2 || "",
        village_email: settings.village_email || "",
        village_hoa_reg_num: settings.village_hoa_reg_num || "",
        village_tin_no: settings.village_tin_no || "",
        village_blocks: settings.village_blocks || 10,
      }));
    }
  }, [loading, settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0], // Store the selected file
    }));
  };

  const handleSave = async () => {
    const updatedSettings = { ...formData };

    // Exclude null or empty fields for logos if they aren't updated
    if (!updatedSettings.logo_1) delete updatedSettings.logo_1;
    if (!updatedSettings.logo_2) delete updatedSettings.logo_2;

    const message = await updateSettings(updatedSettings);
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 3000); // Reset message after 3 seconds
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
    <EditTable title={"Village Settings"} handleSave={handleSave}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mb-6 items-center">
        {/* Village Name */}
        <label htmlFor="village_name" className="text-white">
          Village Name
        </label>
        <input
          type="text"
          id="village_name"
          name="village_name"
          value={formData.village_name}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Village Address */}
        <label htmlFor="village_address" className="text-white">
          Village Address
        </label>
        <input
          type="text"
          id="village_address"
          name="village_address"
          value={formData.village_address}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Village Contact Number 1 */}
        <label htmlFor="village_contact_number_1" className="text-white">
          Contact Number 1
        </label>
        <input
          type="text"
          id="village_contact_number_1"
          name="village_contact_number_1"
          value={formData.village_contact_number_1}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Village Contact Number 2 */}
        <label htmlFor="village_contact_number_2" className="text-white">
          Contact Number 2
        </label>
        <input
          type="text"
          id="village_contact_number_2"
          name="village_contact_number_2"
          value={formData.village_contact_number_2}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Village Email */}
        <label htmlFor="village_email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="village_email"
          name="village_email"
          value={formData.village_email}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* HOA Registration Number */}
        <label htmlFor="village_hoa_reg_num" className="text-white">
          HOA Registration Number
        </label>
        <input
          type="text"
          id="village_hoa_reg_num"
          name="village_hoa_reg_num"
          value={formData.village_hoa_reg_num}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* TIN Number */}
        <label htmlFor="village_tin_no" className="text-white">
          TIN Number
        </label>
        <input
          type="text"
          id="village_tin_no"
          name="village_tin_no"
          value={formData.village_tin_no}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Village Blocks */}
        <label htmlFor="village_blocks" className="text-white">
          Village Blocks
        </label>
        <input
          type="number"
          id="village_blocks"
          name="village_blocks"
          value={formData.village_blocks}
          onChange={handleInputChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Logo 1 */}
        <div className="flex justify-between items-center">
          <label htmlFor="logo_1" className="text-white">
            Logo 1
          </label>
          {settings?.logo_1_url && (
            <img
              src={settings.logo_1_url}
              alt="Village Logo"
              className="w-16 h-16 mr-4 rounded-lg"
            />
          )}
        </div>
        <input
          type="file"
          id="logo_1"
          name="logo_1"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded-lg p-2 bg-greyGreen"
        />

        {/* Logo 2 */}
        <div className="flex justify-between items-center">
          <label htmlFor="logo_2" className="text-white">
            Logo 2
          </label>
          {settings?.logo_2_url && (
            <img
              src={settings.logo_2_url}
              alt="City Logo"
              className="w-16 h-16 mr-4 rounded-lg"
            />
          )}
        </div>
        <input
          type="file"
          id="logo_2"
          name="logo_2"
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

export default VillageSettings;
