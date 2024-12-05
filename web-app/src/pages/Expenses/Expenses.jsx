import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import MainLogo from "../../components/MainLogo";
import { FaFile } from "react-icons/fa";
import Income from "./Income";
import ExpensesContainer from "./Expenses/ExpensesContainer";

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
        <div>
          <Income />
        </div>

        {/* Expense Section */}
        <div className="mt-10">
          <div>
            <ExpensesContainer />
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
    </div>
  );
};

export default Expenses;
