import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ExpensesList = ({ expenses, handleView, handleEdit, handleDelete }) => {
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      handleDelete(id);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevents the row's onClick from firing
  };

  return (
    <div className="mt-6">
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div
            key={index}
            onClick={() => handleView(expense.id)}
            className="flex justify-between items-center bg-lime-50 text-[#2C3E50] rounded-lg px-3 py-2 shadow-lg border border-[#97A97C] cursor-pointer"
          >
            {/* Expense Name */}
            <div className="font-medium text-lg">{expense.expense_name}</div>

            {/* Amount & Date */}
            <div className="text-sm text-[#2C3E50]">
              PHP {expense.amount} | {expense.expense_date}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  handleEdit(expense.id);
                }}
                className="p-4 text-[#FFEB3B] hover:text-[#F9D835]"
                aria-label="Edit Expense"
              >
                <FaEdit size={25} />
              </button>
              <button
                onClick={(e) => {
                  handleButtonClick(e);
                  confirmDelete(expense.id);
                }}
                className="p-4 text-[#E74C3C] hover:text-[#C0392B]"
                aria-label="Delete Expense"
              >
                <FaTrashAlt size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesList;
