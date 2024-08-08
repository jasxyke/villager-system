import React, { useState } from 'react';
import UsersPage from './UsersPage';
import styles from './Users.module.css';

const Residents = () => {
    const blockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const blockButtons = blockNumbers.map((number) => (
        <p key={number} className={styles.blockButton}>Block {number}</p>
    ));

    const [residents, setResidents] = useState([
        { name: 'Sakura Haruno', block: 'BLOCK 02', lot: 'LOT 1', email: 'sakura@gmail.com' },
        { name: 'Kakashi Hatake', block: 'BLOCK 02', lot: 'LOT 2', email: 'kakashi@gmail.com' },
        { name: 'Sasuke Uchiha', block: 'BLOCK 02', lot: 'LOT 3', email: 'sasuke@gmail.com' }
    ]);

    const [form, setForm] = useState({ name: '', block: '', lot: '', email: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
        setForm({ name: '', block: '', lot: '', email: '' });
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
        setForm({ name: '', block: '', lot: '', email: '' });
        setEditingIndex(null);
        setIsFormVisible(true);
    };

    return (
        <UsersPage>
            <div className={styles.blockButtonContainer}>
                {blockButtons}
            </div>
            <div className={styles.residentContainer}>
                <div className={styles.residentHeader}>
                    <div className={styles.residentHeaderItem}>Full Name</div>
                    <div className={styles.residentHeaderItem}>Block No</div>
                    <div className={styles.residentHeaderItem}>Lot No</div>
                    <div className={styles.residentHeaderItem}>Email</div>
                    <div className={styles.residentHeaderItem}>Actions</div>
                </div>
                <div className={styles.residentBody}>
                    {residents.map((resident, index) => (
                        <div key={index} className={styles.residentRow}>
                            <div className={styles.residentItem}>{resident.name}</div>
                            <div className={styles.residentItem}>{resident.block}</div>
                            <div className={styles.residentItem}>{resident.lot}</div>
                            <div className={styles.residentItem}>{resident.email}</div>
                            <div className={styles.residentActions}>
                                <button className={styles.editButton} onClick={() => handleEdit(index)}>✏️</button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(index)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={styles.addDataButton} onClick={handleAddClick}>➕ Add Data</button>
                
                {isFormVisible && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.closeButton} onClick={() => setIsFormVisible(false)}>&times;</span>
                            <h2 className={styles.modalTitle}>{editingIndex !== null ? 'Edit Resident' : 'Add Resident'}</h2>
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
                                <div className={styles.formButtons}>
                                    <button type="submit" className={styles.submitButton}>
                                        {editingIndex !== null ? 'Update Data' : 'Submit'}
                                    </button>
                                    <button type="button" className={styles.cancelButton} onClick={() => setIsFormVisible(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </UsersPage>
    );
}

export default Residents;
