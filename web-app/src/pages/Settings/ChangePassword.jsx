import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Handle password change logic (send request to backend, etc.)
    // You can implement the API call or state change here

    alert("Password changed successfully!");
  };

  return (
    <div className="bg-green-500 p-6 rounded-lg text-white max-w-sm mx-auto">
      <MainLogo />
      <div className="bg-green p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block mb-1">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="w-full p-2 rounded border border-gray-300"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 rounded border border-gray-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 rounded border border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary mt-4 p-2 rounded text-white hover:bg-darkerGreen"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
