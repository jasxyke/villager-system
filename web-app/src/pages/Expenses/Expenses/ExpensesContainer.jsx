import React, { useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";
import useExpenses from "../../../hooks/IncomeExpenses/useExpenses";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const ExpensesContainer = ({ year, month }) => {
  const { expenses, createExpense, fetchExpenses, totalExpenses } =
    useExpenses(); // Destructure necessary functions from the hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expense_name: "",
    amount: "",
    expenses_date: "",
    or_number: "",
    or_date: "", // Added or_date field
  });

  useEffect(() => {
    fetchExpenses(year, month, "");
  }, [year, month]);

  // useEffect(() => {
  //   fetchExpenses(year, month, "");
  // }, []);

  const [isEditing, setIsEditing] = useState(null); // Track which expense is being edited

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data

    try {
      await createExpense(formData); // Ensure this sends the correct data
      fetchExpenses(year, month, "");

      // Reset form state
      setFormData({
        expense_name: "",
        amount: "",
        expenses_date: "",
        or_number: "",
        or_date: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error.response?.data || error);
    }
  };

  // Handle modal toggle
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <div className="bg-lime-50 rounded-lg flex flex-col lg:flex-row justify-between items-center p-6">
        <div className="text-3xl text-primary lg:text-4xl font-semibold mb-4 lg:mb-0">
          Total Expenses: ₱{totalExpenses}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing !== null ? "Edit Expense" : "Add New Expense"}
            </h2>
            <form onSubmit={handleSubmit}>
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
          </div>
        </div>
      )}

      {/* Render the ExpensesList component */}
      {expenses.length > 0 && <ExpensesList expenses={expenses} />}

      <div className="mt-5">
        <button onClick={toggleModal} className="bg-mutedGreen p-5 rounded-md">
          Add expenses
        </button>
      </div>
    </div>
  );
};

export default ExpensesContainer;
