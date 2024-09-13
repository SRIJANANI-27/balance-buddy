
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import excell from "../assets/excel.png";
import { baseurl } from "../url";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forms({
  editingData,
  setEditingData,
  formData,
  handleChange,
  setFormData,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleExport = async () => {
    try {
      const response = await axios.get(`${baseurl}/data`, {
        params: { startDate, endDate },
      });

      const data = response.data.data;
      if (data.length === 0) {
        toast.warn("No data to export.", { transition: Slide });
        return;
      }

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Expenses");

      XLSX.writeFile(wb, "ExpensesReport.xlsx");
      toast.success("Data exported successfully!", { transition: Slide });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data.", { transition: Slide });
    }
  };

  const formatAmount = (value) => {
    if (typeof value !== "string") {
      value = String(value);
    }
    const cleanValue = value.replace(/[^0-9.]/g, "");
    return cleanValue ? parseFloat(cleanValue).toLocaleString() : "";
  };

  const parseAmount = (value) => {
    if (typeof value !== "string") {
      value = String(value);
    }
    return parseFloat(value.replace(/,/g, "")) || 0;
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    setFormData({
      ...formData,
      amount: rawValue,
    });
  };

  const combinedDescription = formData.reason
    ? `${formData.description} - ${formData.reason}`
    : formData.description;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: parseAmount(formData.amount),
      description: combinedDescription,
    };

    try {
      if (editingData) {
        await axios.put(`${baseurl}/data/${editingData}`, data);
        alert("🔥 Updated successfully!");

        // Optionally perform navigation or any other action after alert closes
        setTimeout(() => navigate(0), 10);
      } else {
        await axios.post(`${baseurl}/data`, data);
        alert("✅ Transaction added successfully!");

        // Optionally perform navigation or any other action after alert closes
        setTimeout(() => navigate(0), 4);
      }
      console.log(data);
    } catch (err) {
      console.error("Submission error: ", err);
      toast.error("Submission failed. Please try again.", {
        transition: Slide,
      });
    } finally {
      setEditingData(null);
      setFormData({
        title: "",
        description: "",
        reason: "",
        date: "",
        amount: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  useEffect(() => {
    if (editingData) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseurl}/data/${editingData}`);
          const data = response.data;

          if (!data) {
            throw new Error("No data found for the provided ID.");
          }

          let formattedDate = "";
          if (data.date) {
            formattedDate = data.date.substring(0, 10);
          }

          setFormData({
            ...data,
            date: formattedDate,
          });
        } catch (err) {
          console.error("Fetch error: ", err);
        }
      };
      fetchData();
    }
  }, [editingData, setFormData]);

  return (
    <div className="form max-w-full sm:max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
  <form onSubmit={handleSubmit} className="space-y-4" id="forms">
    <div className="input-group flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="flex-1">
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <div className="input-group flex flex-col sm:flex-row gap-2">
      <select
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Description</option>
        <option value="Salary">🤑 Salary</option>
        <option value="Food">🥪 Food</option>
        <option value="Rent">🏠 Rent</option>
        <option value="Medicine">💊 Healthcare</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Utilities">💡 Utilities</option>
        <option value="Transportation">🚗 Transportation</option>
        <option value="Education">📚 Education</option>
        <option value="Transportation">🚉 Transportation</option>
        <option value="other">✏️ Other (Specify)</option>
      </select>

      {formData.description && (
        <input
          type="text"
          name="reason"
          value={formData.reason || ""}
          onChange={handleChange}
          placeholder="Add details (optional)"
          className="form-input mt-2 sm:mt-0 sm:ml-2 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>

    <div className="input-group">
      <input
        type="text"
        name="amount"
        value={formatAmount(formData.amount)}
        onChange={handleAmountChange}
        placeholder="Amount"
        required
        className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="input-group">
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 active:bg-blue-700 active:shadow-inner active:text-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {editingData ? "Update Transaction" : "Add Transaction"}
      </button>
    </div>

    <div className="input-group flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="startDate" className="text-gray-500">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="endDate" className="text-gray-500">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <div className="flex justify-center">
      <button
        onClick={handleExport}
        type="button"
        className="mt-3 px-4 py-2 shadow-md flex items-center gap-2 transition duration-150 ease-in-out button_slide slide_right"
      >
        Export to Excel
        <img src={excell} alt="Excel icon" className="w-6 h-6" />
      </button>
    </div>
  </form>

  <ToastContainer
    className="custom-toast-container"
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    draggable
    progress={undefined}
    theme="light"
    transition={Slide}
  />
</div>

  );
}

export default Forms;
