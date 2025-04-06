import React, { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import useExpenses from "../../../hooks/IncomeExpenses/useExpenses";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";
import TotalExpensesCard from "./TotalExpensesCard";
import { BiFilter } from "react-icons/bi";

const ExpensesContainer = ({ year, month }) => {
  const {
    expenses,
    createExpense,
    updateExpense,
    fetchExpenses,
    totalExpenses,
    deleteExpense,
    loading,
    currentPage,
    lastPage,
  } = useExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expense_name: "",
    amount: "",
    expenses_date: "",
    or_number: "",
    or_date: "",
  });
  const [isEditing, setIsEditing] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    fetchExpenses(year, month, "", currentPage);
  }, [year, month, currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing !== null) {
        await updateExpense(isEditing, formData);
      } else {
        await createExpense(formData);
      }
      fetchExpenses(year, month, "", currentPage);
      resetForm();
    } catch (error) {
      console.error("Error saving expense:", error.response?.data || error);
    }
  };

  const handleView = (id) => {
    const expenseToView = expenses.find((expense) => expense.id === id);
    setFormData({
      expense_name: expenseToView.expense_name,
      amount: expenseToView.amount,
      expenses_date: expenseToView.expenses_date,
      or_number: expenseToView.or_number,
      or_date: expenseToView.or_date,
    });
    setIsViewing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setFormData({
      expense_name: expenseToEdit.expense_name,
      amount: expenseToEdit.amount,
      expenses_date: expenseToEdit.expenses_date,
      or_number: expenseToEdit.or_number,
      or_date: expenseToEdit.or_date,
    });
    setIsEditing(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses(year, month, "", currentPage);
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error);
    }
  };

  const resetForm = () => {
    setFormData({
      expense_name: "",
      amount: "",
      expenses_date: "",
      or_number: "",
      or_date: "",
    });
    setIsModalOpen(false);
    setIsEditing(null);
    setIsViewing(false);
  };

  const toggleModal = () => {
    if (isEditing !== null || isViewing) resetForm();
    setIsModalOpen(!isModalOpen);
  };

  const handlePageClick = ({ selected }) => {
    fetchExpenses(year, month, "", selected + 1);
  };

  return (
    <div className="rounded-2xl shadow-xl mb-2 bg-primary bg-opacity-20 p-2">
      {/* Total Expenses Card */}
      <TotalExpensesCard
        totalExpenses={totalExpenses}
        onAddExpenseClick={toggleModal}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {isViewing
                ? "Expense Details"
                : isEditing !== null
                ? "Edit Expense"
                : "Add New Expense"}
            </h2>
            {isViewing ? (
              <div>
                <div className="mb-2">
                  <strong>Expense Name:</strong> {formData.expense_name}
                </div>
                <div className="mb-2">
                  <strong>Amount:</strong> PHP {formData.amount}
                </div>
                <div className="mb-2">
                  <strong>Expense Date:</strong> {formData.expenses_date}
                </div>
                <div className="mb-2">
                  <strong>OR Number:</strong> {formData.or_number || "N/A"}
                </div>
                <div className="mb-4">
                  <strong>OR Date:</strong> {formData.or_date || "N/A"}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={toggleModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Input Fields */}
                {[
                  "expense_name",
                  "amount",
                  "expenses_date",
                  "or_number",
                  "or_date",
                ].map((field, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block text-gray-700 font-medium mb-2 capitalize">
                      {field.replace("_", " ")}
                    </label>
                    <input
                      type={field.includes("date") ? "date" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 transition"
                      required={field !== "or_number" && field !== "or_date"}
                    />
                  </div>
                ))}
                {/* Form Buttons */}
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-green text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  >
                    {isEditing !== null ? "Save Changes" : "Add Expense"}
                  </button>
                  <button
                    onClick={toggleModal}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Expenses List or Loading */}
      {loading ? (
        <LoadingContainer />
      ) : expenses.length > 0 ? (
        <ExpensesList
          expenses={expenses}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="text-center text-gray-300 text-xl mt-4">
          No expenses found for this period.
        </div>
      )}
      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            pageCount={lastPage}
            onPageChange={handlePageClick}
            containerClassName="flex items-center gap-2"
            pageClassName="px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-green-300 transition"
            activeClassName="bg-green-500 text-white"
          />
        </div>
      )}
    </div>
  );
};

export default ExpensesContainer;
