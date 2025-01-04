import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import BillsSettings from "./BillsSettings";
import PermitsSettings from "./PermitSettings";
import styles from "./AdminSettings.module.css";
import EditAmenitiesModal from "../Booking/EditAmenitiesModal";
import VillageSettings from "./VillageSettings";
import CarStickerSettings from "./CarStickerSettings";
import BookingSettings from "./BookingSettings";
import AmenitiesSettings from "./AmenitiesSettings";

const AdminSettings = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="p-5 scroll-auto">
      <div>
        <MainLogo />
      </div>

      <div className={styles.mainContainer}>
        <AmenitiesSettings />
        {/* <BookingSettings /> */}
        <BillsSettings />
        <PermitsSettings />
        <CarStickerSettings />
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
