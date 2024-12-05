import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import MainLogo from "../../components/MainLogo";
import { FaFile } from "react-icons/fa";
import Income from "./Income";

const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    console.log("New Expense Added:", newExpense);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <MainLogo />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-green rounded-lg p-6">
        {/* INCOME SECTION */}
        <Income />

        {/* Expense Section */}
        <div>
          <h2 className="text-xl text-white font-semibold mb-4">EXPENSE</h2>
          <div className="space-y-4">
            {/* Expense Item */}
            {[
              {
                name: "Salary and Wages",
                amount: "PHP 500.00",
                date: "October 21, 2020",
              },
              {
                name: "Transportation",
                amount: "PHP 1,500.00",
                date: "October 21, 2020",
              },
              {
                name: "Electricity",
                amount: "PHP 5,500.00",
                date: "October 29, 2020",
              },
            ].map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#B5C99A] p-4 rounded-md"
              >
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm">{`${expense.amount} | ${expense.date}`}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-[#718355]">
                    <FaEdit />
                  </button>
                  <button className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Expense Button */}
            <button
              className="flex items-center space-x-2 text-[#718355] mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlusCircle />
              <span className="font-medium">Add Expenses</span>
            </button>
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="flex justify-end items-center mt-6">
          <button className="bg-secondary flex items-center bg-mute text-white px-4 py-2 rounded-md">
            Generate Report
            <FaFile className="text-2xl text-white ml-2" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Expense Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newExpense.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Official Receipt Number
                </label>
                <input
                  type="text"
                  name="receipt"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green text-white rounded-md"
                onClick={handleAddExpense}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
