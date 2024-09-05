// // Forms.js
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { ToastContainer, toast, Bounce} from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import * as XLSX from "xlsx";
// // import excell from "../assets/excel.png";
// // import {baseurl} from '../url'
// // function Forms({
// //   editingData,
// //   setEditingData,
// //   formData,
// //   handleChange,
// //   setFormData,
// // }) {
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [isOtherSelected, setIsOtherSelected] = useState(false);
// //   const navigate = useNavigate();

// //   const handleExport = async () => {
// //     try {
// //       // Fetch data from backend with date range
// //       const response = await axios.get(`${baseurl}/data`, {
// //         params: { startDate, endDate },
// //       });

// //       const data = response.data.data;
// //       if (data.length === 0) {
// //         alert("No data to export.");
// //         return;
// //       }

// //       // Convert data to worksheet
// //       const ws = XLSX.utils.json_to_sheet(data);
// //       const wb = XLSX.utils.book_new();
// //       XLSX.utils.book_append_sheet(wb, ws, "Expenses");

// //       // Write Excel file
// //       XLSX.writeFile(wb, "ExpensesReport.xlsx");
// //     } catch (error) {
// //       console.error("Error exporting data:", error);
// //       alert("Failed to export data.");
// //     }
// //   };

// //   const formatAmount = (value) => {
// //     if (typeof value !== "string") {
// //       value = String(value); // Ensure value is a string
// //     }
// //     const cleanValue = value.replace(/[^0-9.]/g, "");
// //     return cleanValue ? parseFloat(cleanValue).toLocaleString() : "";
// //   };

// //   const parseAmount = (value) => {
// //     if (typeof value !== "string") {
// //       value = String(value); // Ensure value is a string
// //     }
// //     return parseFloat(value.replace(/,/g, "")) || 0;
// //   };

// //   const handleAmountChange = (e) => {
// //     const rawValue = e.target.value.replace(/[^0-9.]/g, "");
// //     setFormData({
// //       ...formData,
// //       amount: rawValue, // Store raw amount for submission
// //     });
// //   };

// //   const handleDescriptionChange = (e) => {
// //     const { value } = e.target;
// //     setIsOtherSelected(value === "other");
// //     setFormData({ ...formData, description: value === "other" ? "" : value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const data = { ...formData, amount: parseAmount(formData.amount) };

// //     try {
// //       if (editingData) {
// //         await axios.put(`${baseurl}/data/${editingData}`, data);

// //         toast.success("Updated successfully!", {
// //           // position: "top-center",
// //           autoClose: 1000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //           progress: undefined,
// //           theme: "light",
// //           // transition: Bounce,
// //           style: {
// //             position: "fixed",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             zIndex: 9999,
// //           },
// //           onClose: () => {
// //             navigate(0);
// //           },
// //         });
// //       } else {
// //         await axios.post(`${baseurl}/data`, data);
// //         toast("🦄 Transaction added successfully!", {
// //           // position: "top-center",
// //           autoClose: 900,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //           progress: undefined,
// //           theme: "light",
// //           // transition: Bounce,
// //           style: {
// //             position: "fixed",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             zIndex: 9999,
// //           },
// //           onClose: () => {
// //             navigate(0);
// //           },
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Submission error: ", err);
// //     } finally {
// //       setEditingData(null);
// //       setFormData({
// //         title: "",
// //         description: "",
// //         date: "",
// //         amount: "",
// //         startDate: "",
// //         endDate: "",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (editingData) {
// //       const fetchData = async () => {
// //         try {
// //           const response = await axios.get(
// //             `http://localhost:4000/data/${editingData}`
// //           );
// //           const data = response.data;

// //           if (!data) {
// //             throw new Error("No data found for the provided ID.");
// //           }

// //           let formattedDate = "";
// //           if (data.date) {
// //             formattedDate = data.date.substring(0, 10); // Extract "YYYY-MM-DD"
// //           }

// //           setFormData({
// //             ...data,
// //             date: formattedDate,
// //           });

// //           setIsOtherSelected(data.description === "other");
// //         } catch (err) {
// //           console.error("Fetch error: ", err);
// //         }
// //       };
// //       fetchData();
// //     }
// //   }, [editingData, setFormData]);

// //   return (
// //     <div className="form max-w-full sm:max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
// //       <ToastContainer />
// //       <form onSubmit={handleSubmit} className="space-y-4" id="forms">
// //         <div className="input-group">
// //           <select
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             required
// //             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           >
// //             <option value="">Select Type</option>
// //             <option value="Income">Income</option>
// //             <option value="Expense">Expense</option>

// //           </select>
// //         </div>

// //         <div className="input-group">
// //   <select
// //     name="description"
// //     value={isOtherSelected ? "other" : formData.description}
// //     onChange={handleDescriptionChange}
// //     required
// //     className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //   >
// //     <option value="">Select Description</option>
// //     <option value="Salary">🤑 Salary</option>
// //     <option value="Food">🍒 Food</option>
// //     <option value="Rent">🏠 Rent</option>
// //     <option value="Medicine">💊 Medicine</option>
// //     <option value="Shopping">🛍️ Shopping</option>
// //     <option value="other">Other</option>
// //   </select>
// //   {isOtherSelected && (
// //     <input
// //       type="text"
// //       name="description"
// //       placeholder="Enter description"
// //       value={formData.description}
// //       onChange={(e) =>
// //         setFormData({ ...formData, description: e.target.value })
// //       }
// //       required
// //       className="form-input w-full border border-gray-300 mt-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //     />
// //   )}
// // </div>

// //         <div className="input-group">
// //           <input
// //             type="date"
// //             id="date"
// //             name="date"
// //             value={formData.date}
// //             onChange={handleChange}
// //             required
// //             className="form-input w-full border border-gray-300 mt-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //         </div>

// //         <div className="input-group">
// //           <input
// //             type="text"
// //             name="amount"
// //             value={formatAmount(formData.amount)}
// //             onChange={handleAmountChange}
// //             placeholder="Amount"
// //             required
// //             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //         </div>

// //         <div className="input-group">
// //           <button type="submit" className="w-full button_slide slide_right">
// //             {editingData ? "Update Transaction" : "Add Transaction"}
// //           </button>
// //         </div>

// //         <div className="input-group flex flex-col sm:flex-row gap-4">
// //           <div className="flex-1">
// //             <label htmlFor="startDate" className="text-gray-500">
// //               Start Date
// //             </label>
// //             <input
// //               type="date"
// //               name="startDate"
// //               value={startDate}
// //               onChange={(e) => setStartDate(e.target.value)}
// //               className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //           </div>

// //           <div className="flex-1">
// //             <label htmlFor="endDate" className="text-gray-500">
// //               End Date
// //             </label>
// //             <input
// //               type="date"
// //               name="endDate"
// //               value={endDate}
// //               onChange={(e) => setEndDate(e.target.value)}
// //               className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex justify-center">
// //           <button
// //             onClick={handleExport}
// //             type="button"
// //             className="mt-3 px-4 py-2  shadow-md  flex items-center gap-2 transition duration-150 ease-in-out button_slide slide_right"
// //           >
// //             Export to Excel
// //             <img src={excell} alt="Excel icon" className="w-6 h-6" />
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Forms;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as XLSX from "xlsx";
// import excell from "../assets/excel.png";
// import { baseurl } from "../url";

// function Forms({
//   editingData,
//   setEditingData,
//   formData,
//   handleChange,
//   setFormData,
// }) {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const navigate = useNavigate();

//   const handleExport = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/data`, {
//         params: { startDate, endDate },
//       });

//       const data = response.data.data;
//       if (data.length === 0) {
//         alert("No data to export.");
//         return;
//       }

//       const ws = XLSX.utils.json_to_sheet(data);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Expenses");

//       XLSX.writeFile(wb, "ExpensesReport.xlsx");
//     } catch (error) {
//       console.error("Error exporting data:", error);
//       alert("Failed to export data.");
//     }
//   };

//   const formatAmount = (value) => {
//     if (typeof value !== "string") {
//       value = String(value);
//     }
//     const cleanValue = value.replace(/[^0-9.]/g, "");
//     return cleanValue ? parseFloat(cleanValue).toLocaleString() : "";
//   };

//   const parseAmount = (value) => {
//     if (typeof value !== "string") {
//       value = String(value);
//     }
//     return parseFloat(value.replace(/,/g, "")) || 0;
//   };

//   const handleAmountChange = (e) => {
//     const rawValue = e.target.value.replace(/[^0-9.]/g, "");
//     setFormData({
//       ...formData,
//       amount: rawValue,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = { ...formData, amount: parseAmount(formData.amount) };

//     try {
//       if (editingData) {
//         await axios.put(`${baseurl}/data/${editingData}`, data);
//         toast.success("Updated successfully!", {
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           style: {
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 9999,
//           },
//           onClose: () => {
//             navigate(0);
//           },
//         });
//       } else {
//         await axios.post(`${baseurl}/data`, data);
//         toast("🦄 Transaction added successfully!", {
//           position: "bottom-center",
//           autoClose: 900,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           style: {
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 9999,
//           },
//           onClose: () => {
//             navigate(0);
//           },
//         });
//       }
//       console.log(data);
//     } catch (err) {
//       console.error("Submission error: ", err);
//     } finally {
//       setEditingData(null);
//       setFormData({
//         title: "",
//         description: "",
//         reason: "", // Clear the reason field
//         date: "",
//         amount: "",
//         startDate: "",
//         endDate: "",
//       });
//     }
//   };

//   useEffect(() => {
//     if (editingData) {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`${baseurl}/data/${editingData}`);
//           const data = response.data;

//           if (!data) {
//             throw new Error("No data found for the provided ID.");
//           }

//           let formattedDate = "";
//           if (data.date) {
//             formattedDate = data.date.substring(0, 10);
//           }

//           setFormData({
//             ...data,
//             date: formattedDate,
//           });
//         } catch (err) {
//           console.error("Fetch error: ", err);
//         }
//       };
//       fetchData();
//     }
//   }, [editingData, setFormData]);

//   return (
//     <div className="form max-w-full sm:max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="space-y-4" id="forms">
//         <div className="input-group">
//           <select
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select Type</option>
//             <option value="Income">Income</option>
//             <option value="Expense">Expense</option>
//           </select>
//         </div>

//         <div className="input-group">
//           <select
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select Description</option>
//             <option value="Salary">🤑 Salary</option>
//             <option value="Food">🍒 Food</option>
//             <option value="Rent">🏠 Rent</option>
//             <option value="Medicine">💊 Medicine</option>
//             <option value="Shopping">🛍️ Shopping</option>
//           </select>
//         </div>

//         <div className="input-group">
//           <input
//             type="text"
//             name="reason"
//             id="reason"
//             placeholder="Enter description"
//             value={formData.reason}
//             onChange={handleChange}
//             required
//             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="input-group">
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             className="form-input w-full border border-gray-300 mt-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="input-group">
//           <input
//             type="text"
//             name="amount"
//             value={formatAmount(formData.amount)}
//             onChange={handleAmountChange}
//             placeholder="Amount"
//             required
//             className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="input-group">
//           <button type="submit" className="w-full button_slide slide_right">
//             {editingData ? "Update Transaction" : "Add Transaction"}
//           </button>
//         </div>

//         <div className="input-group flex flex-col sm:flex-row gap-4">
//           <div className="flex-1">
//             <label htmlFor="startDate" className="text-gray-500">
//               Start Date
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div className="flex-1">
//             <label htmlFor="endDate" className="text-gray-500">
//               End Date
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="form-input w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <button
//             onClick={handleExport}
//             type="button"
//             className="mt-3 px-4 py-2 shadow-md flex items-center gap-2 transition duration-150 ease-in-out button_slide slide_right"
//           >
//             Export to Excel
//             <img src={excell} alt="Excel icon" className="w-6 h-6" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Forms;
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
        alert("🦄 Transaction added successfully!");

        // Optionally perform navigation or any other action after alert closes
        setTimeout(() => navigate(0), 10);
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
        <div className="input-group">
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

        <div className="input-group flex">
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
              className="form-input ml-2 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>

        <div className="input-group">
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input w-full border border-gray-300 mt-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
            className="
    w-full 
    bg-gradient-to-r 
    from-blue-400 
    to-blue-600 
    text-white 
    font-bold 
    py-2 
    px-4 
    rounded 
    transition 
    duration-200 
    active:bg-blue-700 
    active:shadow-inner 
    active:text-gray-300 
    focus:outline-none 
    focus:ring 
    focus:ring-blue-300"
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

      {/* ToastContainer component to display toast notifications */}
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
