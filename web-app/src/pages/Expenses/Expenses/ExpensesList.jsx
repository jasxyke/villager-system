import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ExpensesList = ({ expenses, handleEdit, handleDelete }) => {
  return (
    <div className="mt-6">
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-lime-50 text-[#2C3E50] rounded-lg px-4 py-3 shadow-lg border border-[#97A97C]"
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
                onClick={() => handleEdit(index)}
                className="p-2 text-[#FFEB3B] hover:text-[#F9D835]"
                aria-label="Edit Expense"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="p-2 text-[#E74C3C] hover:text-[#C0392B]"
                aria-label="Delete Expense"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesList;
