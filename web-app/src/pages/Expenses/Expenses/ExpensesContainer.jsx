import React, { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import useExpenses from "../../../hooks/IncomeExpenses/useExpenses";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";

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
    <div>
      <div className="bg-lime-50 rounded-lg flex flex-col lg:flex-row justify-between items-center p-6">
        <div className="text-3xl text-primary lg:text-4xl font-semibold mb-4 lg:mb-0">
          Total Expenses: ₱{totalExpenses}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isViewing
                ? "Expense Details"
                : isEditing !== null
                ? "Edit Expense"
                : "Add New Expense"}
            </h2>
            {isViewing ? (
              <div>
                <p>
                  <strong>Expense Name:</strong> {formData.expense_name}
                </p>
                <p>
                  <strong>Amount:</strong> PHP {formData.amount}
                </p>
                <p>
                  <strong>Expense Date:</strong> {formData.expenses_date}
                </p>
                <p>
                  <strong>OR Number:</strong> {formData.or_number || "N/A"}
                </p>
                <p>
                  <strong>OR Date:</strong> {formData.or_date || "N/A"}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="expense_name"
                  >
                    Expense Name
                  </label>
                  <input
                    type="text"
                    id="expense_name"
                    name="expense_name"
                    value={formData.expense_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="expenses_date"
                  >
                    Expense Date
                  </label>
                  <input
                    type="date"
                    id="expenses_date"
                    name="expenses_date"
                    value={formData.expenses_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="or_number"
                  >
                    OR Number
                  </label>
                  <input
                    type="text"
                    id="or_number"
                    name="or_number"
                    value={formData.or_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="or_date"
                  >
                    OR Date
                  </label>
                  <input
                    type="date"
                    id="or_date"
                    name="or_date"
                    value={formData.or_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                  >
                    {isEditing !== null ? "Save Changes" : "Add Expense"}
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <LoadingContainer />
      ) : (
        expenses.length > 0 && (
          <ExpensesList
            expenses={expenses}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )
      )}

      {/* Pagination Controls */}
      {lastPage > 1 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={lastPage}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"previous-item"}
            nextClassName={"next-item"}
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
};

export default ExpensesContainer;
