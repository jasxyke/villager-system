import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root"); // Set the app element for accessibility

const AdminModal = ({
  isOpen,
  onRequestClose,
  selectedAdmin,
  createAdmin,
  updateAdmin,
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role_type: "admin",
  });

  useEffect(() => {
    if (selectedAdmin) {
      setFormData({
        firstname: selectedAdmin.user.firstname,
        lastname: selectedAdmin.user.lastname,
        email: selectedAdmin.user.email,
        password: "",
        role_type: selectedAdmin.user.role_type,
      });
    } else {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role_type: "admin",
      });
    }
  }, [selectedAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAdmin) {
        await updateAdmin(selectedAdmin.id, formData);
      } else {
        await createAdmin(formData);
      }
      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0"
      contentLabel="Admin Modal"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">
          {selectedAdmin ? "Edit Admin" : "Add Admin"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          {!selectedAdmin && (
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              name="role_type"
              value={formData.role_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="admin">Admin</option>
              <option value="treasurer">Treasurer</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green text-white px-4 py-2 rounded hover:bg-secondary"
          >
            {selectedAdmin ? "Update Admin" : "Add Admin"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AdminModal;
