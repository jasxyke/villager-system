import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosClient from "../../utils/axios";

const EditAmenitiesModal = ({ isOpen, onRequestClose }) => {
  const [amenities, setAmenities] = useState([]);

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

  const handleSave = async () => {
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
      <div className="grid grid-cols-6 gap-4 mb-2 font-semibold text-sm text-gray-600">
        <div className="col-span-1">Amenity Name</div>
        <div className="col-span-1 text-center">Day Price</div>
        <div className="col-span-1 text-center">Night Price</div>
        <div className="col-span-1 text-center">Guest Add. Price</div>
        <div className="col-span-1 text-center">Extension Price</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      <div className="space-y-4">
        {amenities.map((amenity) => (
          <div
            key={amenity.id || Math.random()}
            className="grid grid-cols-6 gap-4 items-center"
          >
            <input
              type="text"
              value={amenity.name}
              onChange={(e) =>
                handleInputChange(amenity.id, "name", e.target.value)
              }
              className="col-span-1 p-2 border rounded-md"
            />
            <input
              type="number"
              value={amenity.day_price}
              onChange={(e) =>
                handleInputChange(amenity.id, "day_price", e.target.value)
              }
              className="col-span-1 p-2 border rounded-md text-right"
            />
            <input
              type="number"
              value={amenity.night_price}
              onChange={(e) =>
                handleInputChange(amenity.id, "night_price", e.target.value)
              }
              className="col-span-1 p-2 border rounded-md text-right"
            />
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
              className="col-span-1 p-2 border rounded-md text-right"
            />
            <input
              type="number"
              value={amenity.extension_price}
              onChange={(e) =>
                handleInputChange(amenity.id, "extension_price", e.target.value)
              }
              className="col-span-1 p-2 border rounded-md text-right"
            />
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
          className="bg-green text-white px-4 py-2 rounded-md hover:bg-secondary"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditAmenitiesModal;
