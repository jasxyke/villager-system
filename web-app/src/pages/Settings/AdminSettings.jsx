import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import BillsSettings from "./BillsSettings";
import PermitsSettings from "./PermitSettings";
import styles from "./AdminSettings.module.css";
import EditAmenitiesModal from "../Booking/EditAmenitiesModal";
import VillageSettings from "./VillageSettings";

const AdminSettings = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="p-5 scroll-auto">
      <div>
        <MainLogo />
      </div>

      <div className={styles.mainContainer}>
        <div className="mb-5 bg-green p-10 rounded-3xl w-[85%] mx-auto">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-secondary rounded-md text-white p-2 mx-auto"
          >
            Edit Amenities Prices
          </button>
        </div>
        <BillsSettings />
        {/* <BookingSettings /> */}
        <PermitsSettings />
        <VillageSettings />
      </div>

      <EditAmenitiesModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default AdminSettings;
