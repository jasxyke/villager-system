import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import useChangePassword from "../../hooks/Account/useChangePassword"; // Update the path as needed

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const { requestChangePassword } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (newPassword !== confirmPassword) {
      setIsError(true);
      setResponseMsg("Passwords do not match");
      return;
    }

    // Call the API to change the password
    await requestChangePassword(
      oldPassword,
      newPassword,
      confirmPassword,
      (successMessage) => {
        setIsError(false);
        setResponseMsg(successMessage);

        // Reset fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      (errorMessage) => {
        setIsError(true);
        setResponseMsg(errorMessage);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <MainLogo />
      <div className="w-[90%] max-w-md bg-green p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit}>
          {responseMsg && (
            <div
              className={`p-3 mb-4 mt-4 rounded ${
                isError ? "bg-red-500" : "bg-secondary"
              } text-center`}
            >
              {responseMsg}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block mb-1">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="w-full p-2 rounded border border-gray-300 text-black"
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
              className="w-full p-2 rounded border border-gray-300 text-black"
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
              className="w-full p-2 rounded border border-gray-300 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-paleGreen p-2 rounded text-white hover:bg-darkerGreen w-[100%] mt-4"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
