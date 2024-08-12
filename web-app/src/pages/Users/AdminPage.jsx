import React, { useState } from 'react';
import styles from './Users.module.css';
import UsersPage from './UsersPage';

function AdminPage() {
    const [admins, setAdmins] = useState([
        { name: 'Raymond Junatas', position: 'Manager', email: 'junatas@gmail.com', password: 'password1' },
        { name: 'John Olive', position: 'Supervisor', email: 'olives@gmail.com', password: 'password2' },
        { name: 'Jessie Yambroww', position: 'Coordinator', email: 'yambroww@gmail.com', password: 'password3' }
    ]);

    const [form, setForm] = useState({ name: '', position: '', email: '', password: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedAdmins = admins.map((admin, index) =>
                index === editingIndex ? form : admin
            );
            setAdmins(updatedAdmins);
            setEditingIndex(null);
        } else {
            setAdmins([...admins, form]);
        }
        setForm({ name: '', position: '', email: '', password: '' });
        setIsFormVisible(false);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setForm(admins[index]);
        setIsFormVisible(true);
    };

    const handleDelete = (index) => {
        setAdmins(admins.filter((_, i) => i !== index));
    };

    const handleAddClick = () => {
        setForm({ name: '', position: '', email: '', password: '' });
        setEditingIndex(null);
        setIsFormVisible(true);
    };

    return (
        <UsersPage>
            <div className={styles.adminContainer}>
                <div className={styles.adminHeader}>
                    <div className={styles.adminHeaderItem}>Full Name</div>
                    <div className={styles.adminHeaderItem}>Position</div>
                    <div className={styles.adminHeaderItem}>Email</div>
                    <div className={styles.adminHeaderItem}>Password</div>
                    <div className={styles.adminHeaderItem}>Actions</div>
                </div>
                <div className={styles.adminBody}>
                    {admins.map((admin, index) => (
                        <div key={index} className={styles.adminRow}>
                            <div className={styles.adminItem}>{admin.name}</div>
                            <div className={styles.adminItem}>{admin.position}</div>
                            <div className={styles.adminItem}>{admin.email}</div>
                            <div className={styles.adminItem}>**********</div>
                            <div className={styles.adminActions}>
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
                            <h2 className={styles.modalTitle}>{editingIndex !== null ? 'Edit Admin' : 'Add Admin'}</h2>
                            <form className={styles.adminForm} onSubmit={handleSubmit}>
                                <label className={styles.adminLabel}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={styles.adminInput}
                                    required
                                />
                                <label className={styles.adminLabel}>Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    className={styles.adminInput}
                                    required
                                />
                                <label className={styles.adminLabel}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={styles.adminInput}
                                    required
                                />
                                <label className={styles.adminLabel}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={styles.adminInput}
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

export default AdminPage;
