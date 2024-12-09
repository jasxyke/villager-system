import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";

const ExpensesList = ({ expenses, handleView, handleEdit, handleDelete }) => {
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      handleDelete(id);
    }
  };

  return (
    <div className="max-w-5xl mt-1 gap-6 border-l-8 bg-primary bg-opacity-45 border-opacity-50 rounded-2xl border-primary p-4 shadow-lg">
      <div className="max-w-5xl mt-1p-2 rounded-lg">
        {/* Header */}
        <div className="">
          <div className="pl-2 pb-2">
            <div className="font-bold text-2xl text-white">Expense Summary</div>
            <div className="flex justify-between text-white">
              <p>List of the expenses for the month</p>
              <button className="flex items-center mr-2 bg-green text-white px-3 py-1.5 rounded-md shadow-md hover:from-green-500 hover:to-green-700 text-sm">
                <BiFilter className="text-lg mr-2" />
                <div className="text-xs">Filter</div>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-green rounded-2xl bg-opacity-80 shadow-2xl">
          <div className="grid grid-cols-4 bg-gradient-to-r from-green-100 to-green-200 text-white text-sm font-medium rounded-t-lg text-center">
            <div className="px-4 py-2">Expense Name</div>
            <div className="px-4 py-2">Date</div>
            <div className="px-4 py-2">Amount</div>
            <div className="px-4 py-2">Actions</div>
          </div>
          <div>
            {expenses.map((expense, index) => {
              const isLastRow = index === expenses.length - 1; // Check if this is the last row
              return (
                <div
                  key={index}
                  className={`grid grid-cols-4 border-t border-gray-300 text-center cursor-pointer hover:bg-gray-300 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } ${isLastRow ? "rounded-b-lg" : ""}`} // Add rounded-b-lg if it's the last row
                  onClick={() => handleView(expense.id)}
                >
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {expense.expense_name}
                  </div>
                  <div className="px-4 py-2 text-sm text-green-600">
                    {expense.expenses_date}
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-800">
                    ₱ {expense.amount}
                  </div>
                  <div className="px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(expense.id);
                      }}
                      className="flex items-center px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 hover:text-blue-800 transition duration-200"
                    >
                      <FaEdit size={14} className="mr-1" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(expense.id);
                      }}
                      className="flex items-center px-3 py-1 text-xs text-red-600 border border-red-600 rounded-md hover:bg-red-50 hover:text-red-800 transition duration-200"
                    >
                      <FaTrashAlt size={14} className="mr-1" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;
