import React, { useState } from 'react';
import styles from "./Users.module.css";
import UsersPage from './UsersPage';

function GuestPage() {
    const [guests, setGuests] = useState([
        { name: 'John Rey', contact: '1234567890', username: 'jrey', password: 'password1' },
        { name: 'Rydel Fuentes', contact: '0987654321', username: 'rydes', password: 'password2' },
        { name: 'Danhill Lapura', contact: '5555555555', username: 'hills', password: 'password3' }
    ]);

    const [form, setForm] = useState({ name: '', contact: '', username: '', password: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedGuests = guests.map((guest, index) =>
                index === editingIndex ? form : guest
            );
            setGuests(updatedGuests);
            setEditingIndex(null);
        } else {
            setGuests([...guests, form]);
        }
        setForm({ name: '', contact: '', username: '', password: '' });
        setIsFormVisible(false);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setForm(guests[index]);
        setIsFormVisible(true);
    };

    const handleDelete = (index) => {
        setGuests(guests.filter((_, i) => i !== index));
    };

    const handleAddClick = () => {
        setForm({ name: '', contact: '', username: '', password: '' });
        setEditingIndex(null);
        setIsFormVisible(true);
    };

    return (
        <UsersPage>
            <div className={styles.guestContainer}>
                <div className={styles.guestHeader}>
                    <div className={styles.guestHeaderItem}>Full Name</div>
                    <div className={styles.guestHeaderItem}>Contact Num</div>
                    <div className={styles.guestHeaderItem}>Username</div>
                    <div className={styles.guestHeaderItem}>Password</div>
                    <div className={styles.guestHeaderItem}>Actions</div>
                </div>
                <div className={styles.guestBody}>
                    {guests.map((guest, index) => (
                        <div key={index} className={styles.guestRow}>
                            <div className={styles.guestItem}>{guest.name}</div>
                            <div className={styles.guestItem}>{guest.contact}</div>
                            <div className={styles.guestItem}>{guest.username}</div>
                            <div className={styles.guestItem}>**********</div>
                            <div className={styles.guestActions}>
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
                            <h2 className={styles.modalTitle}>{editingIndex !== null ? 'Edit Guest' : 'Add Guest'}</h2>
                            <form className={styles.guestForm} onSubmit={handleSubmit}>
                                <label className={styles.guestLabel}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={styles.guestInput}
                                    required
                                />
                                <label className={styles.guestLabel}>Contact Num</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={form.contact}
                                    onChange={handleChange}
                                    className={styles.guestInput}
                                    required
                                />
                                <label className={styles.guestLabel}>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className={styles.guestInput}
                                    required
                                />
                                <label className={styles.guestLabel}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={styles.guestInput}
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

export default GuestPage;
