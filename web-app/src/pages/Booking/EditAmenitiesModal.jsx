import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosClient from "../../utils/axios";

const EditAmenitiesModal = ({ isOpen, onRequestClose }) => {
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch the list of amenities
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
      if (amenity.day_price < 0) {
        newErrors[`day_price-${index}`] =
          "Day price must be a positive number.";
      }
      if (amenity.night_price < 0) {
        newErrors[`night_price-${index}`] =
          "Night price must be a positive number.";
      }
      if (amenity.guest_additional_price < 0) {
        newErrors[`guest_additional_price-${index}`] =
          "Guest additional price must be a positive number.";
      }
      if (amenity.extension_price < 0) {
        newErrors[`extension_price-${index}`] =
          "Extension price must be a positive number.";
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
          // If the amenity has an id, update it, otherwise create a new one
          if (amenity.id) {
            const response = await axiosClient.put(`/amenities/${amenity.id}`, {
              name: amenity.name,
              day_price: amenity.day_price,
              night_price: amenity.night_price,
              guest_additional_price: amenity.guest_additional_price,
              extension_price: amenity.extension_price,
            });
            return response.data;
          } else {
            const response = await axiosClient.post("/amenities", {
              name: amenity.name,
              day_price: amenity.day_price,
              night_price: amenity.night_price,
              guest_additional_price: amenity.guest_additional_price,
              extension_price: amenity.extension_price,
            });
            return response.data;
          }
        })
      );
      setAmenities(updatedAmenities); // Update the state with the updated amenities
      alert("Amenities updated successfully");
      onRequestClose();
    } catch (error) {
      console.error("Failed to update amenities:", error.response || error);
      alert(
        "Failed to update amenities. Please check the console for more details."
      );
    }
  };

  const handleAddAmenity = () => {
    setAmenities([
      ...amenities,
      {
        id: null, // New amenities won't have an id yet
        name: "",
        day_price: "",
        night_price: "",
        guest_additional_price: "",
        extension_price: "",
      },
    ]);
  };

  const handleDeleteAmenity = (id) => {
    if (id) {
      // If the amenity has an id, delete it from the database
      axiosClient
        .delete(`/amenities/${id}`)
        .then(() => {
          setAmenities(amenities.filter((amenity) => amenity.id !== id));
        })
        .catch((error) => {
          console.error("Failed to delete amenity:", error);
          alert("Failed to delete amenity. Please try again.");
        });
    } else {
      // If it's a new amenity (not yet saved to the database), just remove it from the state
      setAmenities(amenities.filter((amenity) => amenity.id !== id));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg max-w-3xl mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Edit Amenities Prices</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          &times;
        </button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-4 gap-4 mb-2 font-semibold text-sm text-gray-600">
        <div className="col-span-1">Amenity Name</div>
        <div className="col-span-1 text-center">Day Price</div>
        <div className="col-span-1 text-center">Night Price</div>
        <div className="col-span-1 text-center">Guest Add. Price</div>
        {/* <div className="col-span-1 text-center">Extension Price</div> */}
        {/* <div className="col-span-1 text-center">Actions</div> */}
      </div>

      <div className="space-y-4">
        {amenities.map((amenity, index) => (
          <div
            key={amenity.id || Math.random()}
            className="grid grid-cols-4 gap-4 items-center"
          >
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
            {/* <div className="col-span-1 text-right">
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
            </div> */}
            {/* <div className="col-span-1 flex justify-center">
              <button
                onClick={() => handleDeleteAmenity(amenity.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div> */}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        {/* <button
          onClick={handleAddAmenity}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Amenity
        </button> */}
        <button
          onClick={handleSave}
          className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditAmenitiesModal;
