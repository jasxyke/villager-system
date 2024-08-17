import React, { useEffect, useState } from "react";
import UsersPage from "./UsersPage";
import styles from "./Users.module.css";
import ResidentDetails from "../../components/ResidentsInformation/ResidentDetails";
//import useResidents from "../../hooks/useResidents";
//import LoadingPage from "../../components/LoadingScreen/LoadingPage";
//import { formatFullName } from "../../utils/DataFormatter";

const Residents = () => {
  const blockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //Gawin ko munang comment tong useResidents
  //const { residents, getResidents } = useResidents();
  //ito muna gamitin ko para sa residents
  const [residents, setResidents] = useState([
    {
      name: "John Rey kintao",
      block: "1",
      lot: "2",
      email: "john.rey@gmail.com",
      type: "Owner",
      age: "20",
      birthday: "April 01, 2022",
      sex: "Male",
      status: "Single",
      facebook: "jrey.2.42",
      occupation: "student",
      membersInHouse: "3",
    },
    {
      name: "Jessie Yams",
      block: "1",
      lot: "4",
      email: "Jessie.Yams@gmail.com",
      type: "Tenant",
    },
    {
      name: "kagura Johnson",
      block: "1",
      lot: "3",
      email: "odette.johnson@gmail.com",
      type: "Owner",
    },
  ]);

  const handleSuccess = () => {
    //
  };

  const handleError = (msg) => {
    console.log(msg);
  };

  useEffect(() => {
    //comment ko din muna to
    //getResidents(1, handleSuccess, handleError);
  }, []);

  const [form, setForm] = useState({ name: "", block: "", lot: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const blockButtons = blockNumbers.map((number) => (
    <p
      key={number}
      className={styles.blockButton}
      onClick={() => {
        getResidents(number, handleSuccess, handleError);
      }}
    >
      Block {number}
    </p>
  ));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedResidents = residents.map((resident, index) =>
        index === editingIndex ? form : resident
      );
      setResidents(updatedResidents);
      setEditingIndex(null);
    } else {
      setResidents([...residents, form]);
    }
    setForm({ name: "", block: "", lot: "", email: "" });
    setIsFormVisible(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(residents[index]);
    setIsFormVisible(true);
  };

  const handleDelete = (index) => {
    setResidents(residents.filter((_, i) => i !== index));
  };

  const handleAddClick = () => {
    setForm({ name: "", block: "", lot: "", email: "" });
    setEditingIndex(null);
    setIsFormVisible(true);
  };

  // ADDED: State to hold the selected resident's details
  const [selectedResident, setSelectedResident] = useState(null);

  // ADDED: Function to handle viewing resident details
  const handleViewDetails = (index) => {
    setSelectedResident(residents[index]);
  };

  return (
    <UsersPage>
      <div className={styles.blockButtonContainer}>{blockButtons}</div>
      <div className={styles.residentContainer}>
        {/* mag add ako ng funtion dito para ma select yung mga residents */}
        {!selectedResident ? (
          <>
            <div className={styles.residentHeader}>
              <div className={styles.residentHeaderItem}>Full Name</div>
              <div className={styles.residentHeaderItem}>Block No</div>
              <div className={styles.residentHeaderItem}>Lot No</div>
              <div className={styles.residentHeaderItem}>Email</div>
              <div className={styles.residentHeaderItem}>Type</div>
            </div>
            <div className={styles.residentBody}>
              {residents.map((resident, index) => (
                // MODIFIED: Added onClick to handle viewing resident details
                <div
                  key={index}
                  className={`${styles.residentRow} ${
                    selectedResident === residents[index] ? styles.selected : ""
                  }`}
                  onClick={() => handleViewDetails(index)}
                >
                  <div className={styles.residentItem}>{resident.name}</div>
                  <div className={styles.residentItem}>{resident.block}</div>
                  <div className={styles.residentItem}>{resident.lot}</div>
                  <div className={styles.residentItem}>{resident.email}</div>
                  <div className={styles.residentItem}>{resident.type}</div>
                </div>
              ))}
              <button className={styles.addDataButton} onClick={handleAddClick}>
                ➕ Add Data
              </button>
            </div>
          </>
        ) : (
          <ResidentDetails
            resident={selectedResident}
            onBack={() => setSelectedResident(null)}
          />
        )}
      </div>

      {/* GAWIN KO MUNANG COMMENT TO */}
      {/*<div className={styles.residentHeader}>
          <div className={styles.residentHeaderItem}>Full Name</div>
          <div className={styles.residentHeaderItem}>Block No</div>
          <div className={styles.residentHeaderItem}>Lot No</div>
          <div className={styles.residentHeaderItem}>Email</div>
          <div className={styles.residentHeaderItem}>Actions</div>
        </div>
        <div className={styles.residentBody}>
          {residents.map((resident, index) => (
            <div key={index} className={styles.residentRow}>
              <div className={styles.residentItem}>
                {formatFullName(
                  resident.firstname,
                  resident.middlename,
                  resident.lastname,
                  false
                )}
              </div>
              <div className={styles.residentItem}>
                {resident.resident.house.block}
              </div>
              <div className={styles.residentItem}>
                {resident.resident.house.lot}
              </div>
              <div className={styles.residentItem}>{resident.email}</div>
              <div className={styles.residentActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(index)}
                >
                  ✏️
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(index)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.addDataButton} onClick={handleAddClick}>
          ➕ Add Data
        </button>*/}

      {isFormVisible && (
        <div className={`${styles.modal} ${isFormVisible ? styles.show : ""}`}>
          <div className={styles.modalContent}>
            <span
              className={styles.closeButton}
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </span>
            <h2 className={styles.modalTitle}>
              {editingIndex !== null ? "Edit Resident" : "Add Resident"}
            </h2>
            <form className={styles.residentForm} onSubmit={handleSubmit}>
              <label className={styles.residentLabel}>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.residentInput}
                required
              />
              <label className={styles.residentLabel}>Block No</label>
              <input
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                className={styles.residentInput}
                required
              />
              <label className={styles.residentLabel}>Lot No</label>
              <input
                type="text"
                name="lot"
                value={form.lot}
                onChange={handleChange}
                className={styles.residentInput}
                required
              />
              <label className={styles.residentLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.residentInput}
                required
              />
              <label className={styles.residentLabel}>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={styles.residentInput}
                required
              >
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
              <div className={styles.formButtons}>
                <button type="submit" className={styles.submitButton}>
                  {editingIndex !== null ? "Update Data" : "Submit"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </UsersPage>
  );
};

export default Residents;
