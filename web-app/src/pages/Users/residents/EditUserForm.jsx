import React from "react";

const EditUserForm = ({ isFormVisible }) => {
  return (
    <>
      {isFormVisible && (
        <div className={`${styles.modal} ${isFormVisible ? styles.show : ""}`}>
          <div className={styles.modalContent}>
            <span
              className={styles.closeButton}
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </span>
            <h2 className={styles.modalTitle}>Add Resident</h2>
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
    </>
  );
};

export default EditUserForm;
