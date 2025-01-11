import React, { useEffect, useState } from "react";
import UsersPage from "./UsersPage";
import useAdmins from "../../hooks/useAdmins";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import AdminModal from "./admins/AdminModal"; // Import the modal component
import { formatFullName } from "../../utils/DataFormatter";

function AdminPage() {
  const {
    admins,
    fetchAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loading,
    error,
  } = useAdmins();

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  if (loading) return <LoadingPage />;
  return (
    <UsersPage>
      <div className="p-6 bg-green text-white shadow-md rounded-lg">
        <div className="grid grid-cols-4 gap-4 mb-4 font-bold text-lg text-center">
          <div className="p-2 border-b border-white">Full Name</div>
          <div className="p-2 border-b border-white">Position</div>
          <div className="p-2 border-b border-white">Email</div>
          <div className="p-2 border-b border-white">Actions</div>
        </div>
        <div>
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="grid grid-cols-4 gap-4 border-b border-white py-2 items-center text-center"
            >
              <div className="p-2">
                {formatFullName(
                  admin.user.firstname,
                  null,
                  admin.user.lastname,
                  false
                )}
              </div>
              <div className="p-2">{admin.user.role_type}</div>
              <div className="p-2">{admin.user.email}</div>
              <div className="p-2 flex justify-center space-b-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(admin)}
                >
                  <FaEdit size={20} />
                </button>
                {/* <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(admin.id)}
                >
                  <FaRegTrashAlt size={20} />
                </button> */}
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={() => handleEdit(null)} // Open modal for adding a new admin
        >
          ➕ Add New Admin
        </button>
        <AdminModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          selectedAdmin={selectedAdmin}
          createAdmin={createAdmin}
          updateAdmin={updateAdmin}
        />
      </div>
    </UsersPage>
  );
}

export default AdminPage;
