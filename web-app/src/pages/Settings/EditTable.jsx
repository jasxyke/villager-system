import React from "react";
import styles from "./AdminSettings.module.css";
const EditTable = ({ title, children, handleSave, loading = false }) => {
  return (
    <div
      className={
        styles.settingsTable + " bg-green p-10 rounded-3xl w-[85%] mx-auto"
      }
    >
      {!loading && <p className="mb-4 text-xl">{title}</p>}
      {children}
      <div
        className="w-full"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {!loading && (
          <button
            className="text-white rounded-md bg-secondary w-[100px] px-4 py-2 mx-auto"
            value="EDIT"
            onClick={handleSave}
          >
            SAVE
          </button>
        )}
      </div>
    </div>
  );
};

export default EditTable;
