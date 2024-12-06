import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch expenses with optional filters
  const fetchExpenses = async (year, month, search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/get-expenses", {
        year,
        month,
        search,
        page,
      });

      const data = response.data.expenses;
      setTotalExpenses(response.data.total_expenses);

      console.log(data);

      setExpenses(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Change page
  const changePage = (year, month, search, page) => {
    fetchExpenses(year, month, search, page);
  };

  // Create a new expense
  const createExpense = async (expenseData) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/expenses", expenseData);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing expense
  const updateExpense = async (id, expenseData) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(`/expenses/${id}`, expenseData);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(`/expenses/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    totalExpenses,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchExpenses,
    changePage,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};

export default useExpenses;
