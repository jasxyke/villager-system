import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosClient from "../../utils/axios";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const EditAmenitiesModal = ({ isOpen, onRequestClose }) => {
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axiosClient.get("/amenities");
        setAmenities(response.data);
      } catch (error) {
        console.error("Failed to fetch amenities:", error);
      }
    };

    if (isOpen) {
      fetchAmenities();
    }
  }, [isOpen]);

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
      if (typeof amenity.is_per_group !== "boolean") {
        newErrors[`is_per_group-${index}`] = "Is Per Group must be specified.";
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
          if (amenity.id) {
            const response = await axiosClient.put(`/amenities/${amenity.id}`, {
              name: amenity.name,
              is_per_group: amenity.is_per_group,
              day_price: amenity.day_price,
              night_price: amenity.night_price,
              day_per_person_price: amenity.day_per_person_price,
              night_per_person_price: amenity.night_per_person_price,
              guest_additional_price: amenity.guest_additional_price,
              extension_price: amenity.extension_price,
            });
            return response.data;
          } else {
            const response = await axiosClient.post("/amenities", {
              name: amenity.name,
              is_per_group: amenity.is_per_group,
              day_price: amenity.day_price,
              night_price: amenity.night_price,
              day_per_person_price: amenity.day_per_person_price,
              night_per_person_price: amenity.night_per_person_price,
              guest_additional_price: amenity.guest_additional_price,
              extension_price: amenity.extension_price,
            });
            return response.data;
          }
        })
      );
      setAmenities(updatedAmenities);
      showAlert("Amenities updated successfully", false);
      onRequestClose();
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
        is_per_group: false,
        day_price: "",
        night_price: "",
        day_per_person_price: "",
        night_per_person_price: "",
        guest_additional_price: "",
        extension_price: "",
      },
    ]);
  };

  const handleDeleteAmenity = (id) => {
    setConfirmDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmDeleteId) {
      try {
        await axiosClient.delete(`/amenities/${confirmDeleteId}`);
        setAmenities(
          amenities.filter((amenity) => amenity.id !== confirmDeleteId)
        );
        showAlert("Deleted Amenity Successfully", false);
      } catch (error) {
        console.error("Failed to delete amenity:", error);
        showAlert("Failed to delete amenity. Please try again.", true);
      }
    }
    setIsDeleteConfirmationOpen(false);
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setConfirmDeleteId(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg max-w-3xl mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Edit Amenities</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          &times;
        </button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-9 gap-4 mb-2 font-semibold text-sm text-gray-600">
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
        {amenities.map((amenity, index) => (
          <div key={index} className="grid grid-cols-9 gap-4 items-center">
            <div className="col-span-1">
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
            <div className="col-span-1">
              <input
                type="checkbox"
                defaultChecked={amenity.is_per_group}
                checked={amenity.is_per_group}
                onChange={(e) =>
                  handleInputChange(
                    amenity.id,
                    "is_per_group",
                    e.target.checked
                  )
                }
                className={`p-2 border rounded-md w-full ${
                  errors[`is_per_group-${index}`] ? "border-red-500" : ""
                }`}
              />
              {errors[`is_per_group-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`is_per_group-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.day_price}
                onChange={(e) =>
                  handleInputChange(amenity.id, "day_price", e.target.value)
                }
                className={`p-2 border rounded-md w-full ${
                  errors[`day_price-${index}`] ? "border-red-500" : ""
                }`}
              />
              {errors[`day_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`day_price-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.night_price}
                onChange={(e) =>
                  handleInputChange(amenity.id, "night_price", e.target.value)
                }
                className={`p-2 border rounded-md w-full ${
                  errors[`night_price-${index}`] ? "border-red-500" : ""
                }`}
              />
              {errors[`night_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`night_price-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.night_per_person_price}
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
                }`}
              />
              {errors[`night_per_person_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`night_per_person_price-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.day_per_person_price}
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
                }`}
              />
              {errors[`day_per_person_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`day_per_person_price-${index}`]}
                </p>
              )}
            </div>

            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.guest_additional_price}
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
              {errors[`guest_additional_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`guest_additional_price-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 text-right">
              <input
                type="number"
                value={amenity.extension_price}
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
              {errors[`extension_price-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`extension_price-${index}`]}
                </p>
              )}
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => handleDeleteAmenity(amenity.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleAddAmenity}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Amenity
        </button>
        <button
          onClick={handleSave}
          className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>
      <Modal
        isOpen={isDeleteConfirmationOpen}
        onRequestClose={cancelDelete}
        className="bg-white p-6 rounded-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-lg font-semibold">
          Are you sure you want to delete this amenity?
        </h3>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={cancelDelete}
          >
            No
          </button>
        </div>
      </Modal>
    </Modal>
  );
};

export default EditAmenitiesModal;
