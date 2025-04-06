import EditTable from "./EditTable";
import React, { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";
import { useAmenities } from "../../contexts/AmenitiesContext";
import { useConfirmDialog } from "../../components/ConfirmDialog/useConfirmDialog";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const AmenitiesSettings = () => {
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});
  const { confirm, ConfirmDialogComponent } = useConfirmDialog(
    "Delete Amenity",
    "Are you sure you want to delete this amenity?"
  );

  const { showAlert } = useAlert();
  const { amenities: amenitiesConext } = useAmenities();

  useEffect(() => {
    if (amenitiesConext.length > 0) setAmenities(amenitiesConext);
  }, [amenitiesConext]);

  const handleInputChange = (id, field, value) => {
    setAmenities((prev) =>
      prev.map((amenity) =>
        amenity.id === id ? { ...amenity, [field]: value } : amenity
      )
    );
  };

  const validateAmenities = () => {
    const newErrors = {};
    amenities.forEach((amenity, index) => {
      if (!amenity.name.trim()) {
        newErrors[`name-${index}`] = "Amenity name is required.";
      }
      if (amenity.day_price < 0) {
        newErrors[`day_price-${index}`] =
          "Day price must be a positive number.";
      }
      if (amenity.night_price < 0) {
        newErrors[`night_price-${index}`] =
          "Night price must be a positive number.";
      }
      if (amenity.day_per_person_price < 0) {
        newErrors[`day_per_person_price-${index}`] =
          "Day per person price must be positive.";
      }
      if (amenity.night_per_person_price < 0) {
        newErrors[`night_per_person_price-${index}`] =
          "Night per person price must be positive.";
      }
      if (amenity.guest_additional_price < 0) {
        newErrors[`guest_additional_price-${index}`] =
          "Guest additional price must be positive.";
      }
      if (amenity.extension_price < 0) {
        newErrors[`extension_price-${index}`] =
          "Extension price must be positive.";
      }
    });
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateAmenities();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedAmenities = await Promise.all(
        amenities.map(async (amenity) => {
          const payload = {
            name: amenity.name,
            is_per_group: amenity.is_per_group,
            day_price: amenity.day_price,
            night_price: amenity.night_price,
            day_per_person_price: amenity.day_per_person_price,
            night_per_person_price: amenity.night_per_person_price,
            guest_additional_price: amenity.guest_additional_price,
            extension_price: amenity.extension_price,
          };

          const response = amenity.id
            ? await axiosClient.put(`/amenities/${amenity.id}`, payload)
            : await axiosClient.post("/amenities", payload);

          return response.data;
        })
      );
      setAmenities(updatedAmenities);
      showAlert("Amenities updated successfully", false);
    } catch (error) {
      console.error("Failed to update amenities:", error);
      showAlert("Failed to update amenities. Please try again.", true);
    }
  };

  const handleAddAmenity = () => {
    setAmenities([
      ...amenities,
      {
        id: null,
        name: "",
        is_per_group: true,
        day_price: "",
        night_price: "",
        day_per_person_price: "",
        night_per_person_price: "",
        guest_additional_price: "",
        extension_price: "",
      },
    ]);
  };

  const handleDeleteAmenity = async (id) => {
    if (!id) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== id)
      );
      return;
    }

    try {
      const shouldDelete = await confirm();
      if (shouldDelete) {
        await axiosClient.delete(`/amenities/${id}`);
        setAmenities((prevAmenities) =>
          prevAmenities.filter((amenity) => amenity.id !== id)
        );
        showAlert("Amenity deleted successfully.", false);
      }
    } catch (error) {
      console.error("Failed to delete amenity:", error);
      showAlert(
        error.response?.data?.message ||
          "Failed to delete amenity. Please try again.",
        true
      );
    }
  };

  return (
    <EditTable title={"Amenities Settings"} handleSave={handleSave}>
      <div className="grid grid-cols-9 gap-4 mb-2 font-semibold text-sm text-white">
        <div>Amenity Name</div>
        <div>Is Per Group</div>
        <div>Day Price</div>
        <div>Night Price</div>
        <div>Day Per Person</div>
        <div>Night Per Person</div>
        <div>Guest Additional Price</div>
        <div>Extension Price</div>
        <div>Actions</div>
      </div>

      <div className="space-y-4">
        {amenities.map((amenity, index) => {
          const isPerGroup = parseInt(amenity.is_per_group) === 1;

          return (
            <div key={index} className="grid grid-cols-9 gap-4 items-center">
              <div>
                <input
                  type="text"
                  value={amenity.name}
                  onChange={(e) =>
                    handleInputChange(amenity.id, "name", e.target.value)
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`name-${index}`] ? "border-red-500" : ""
                  }`}
                />
                {errors[`name-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`name-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <select
                  value={amenity.is_per_group}
                  onChange={(e) =>
                    handleInputChange(
                      amenity.id,
                      "is_per_group",
                      e.target.value
                    )
                  }
                  className="p-2 border rounded-md w-full"
                >
                  <option value={1}>Per Group</option>
                  <option value={0}>Per Person</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.day_price || ""}
                  disabled={!isPerGroup}
                  onChange={(e) =>
                    handleInputChange(amenity.id, "day_price", e.target.value)
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`day_price-${index}`] ? "border-red-500" : ""
                  } ${!isPerGroup ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.night_price || ""}
                  disabled={!isPerGroup}
                  onChange={(e) =>
                    handleInputChange(amenity.id, "night_price", e.target.value)
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`night_price-${index}`] ? "border-red-500" : ""
                  } ${!isPerGroup ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.day_per_person_price || ""}
                  disabled={isPerGroup}
                  onChange={(e) =>
                    handleInputChange(
                      amenity.id,
                      "day_per_person_price",
                      e.target.value
                    )
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`day_per_person_price-${index}`]
                      ? "border-red-500"
                      : ""
                  } ${isPerGroup ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.night_per_person_price || ""}
                  disabled={isPerGroup}
                  onChange={(e) =>
                    handleInputChange(
                      amenity.id,
                      "night_per_person_price",
                      e.target.value
                    )
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`night_per_person_price-${index}`]
                      ? "border-red-500"
                      : ""
                  } ${isPerGroup ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.guest_additional_price || ""}
                  onChange={(e) =>
                    handleInputChange(
                      amenity.id,
                      "guest_additional_price",
                      e.target.value
                    )
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`guest_additional_price-${index}`]
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              <div>
                <input
                  type="number"
                  value={amenity.extension_price || ""}
                  onChange={(e) =>
                    handleInputChange(
                      amenity.id,
                      "extension_price",
                      e.target.value
                    )
                  }
                  className={`p-2 border rounded-md w-full ${
                    errors[`extension_price-${index}`] ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <button
                  onClick={() => handleDeleteAmenity(amenity.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddAmenity}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Amenity
        </button>
      </div>

      {ConfirmDialogComponent}
    </EditTable>
  );
};

export default AmenitiesSettings;
