import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/deletes.png";
import axios from "axios";
import deletes from "../assets/deletes.jpeg";
import down from "../assets/down.png";
import { baseurl } from "../url";

const Table = ({ transactions, setFormData, setEditingData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [titleFilter, setTitleFilter] = useState("all");
  const [descriptionFilter, setDescriptionFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [monthFilter, setMonthFilter] = useState("");

  const navigate = useNavigate();

  const formatNumber = (num) =>
    num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  const deleteTransaction = async (id) => {
    try {
      const result = await Swal.fire({
        html: `
        <div style="text-align: center;">
          <img src="${deletes}" alt="Delete Icon" style="width: 150px; height: 150px; display: block; margin: 0 auto;" />
          <p>Are you sure you want to delete ?</p>
        </div>
      `,
        text: "Are you sure you want to delete ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        didOpen: () => {
          const popup = Swal.getPopup();
          popup.style.width = "300px";
          popup.style.padding = "20px";
        },
      });

      if (result.isConfirmed) {
        await axios.delete(`${baseurl}/data/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "The transaction has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          didOpen: () => {
            const popup = Swal.getPopup();
            popup.style.width = "300px";
            popup.style.padding = "20px";
          },
        });
        navigate(0);
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the transaction.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const bulkDeleteTransactions = async () => {
    try {
      const result = await Swal.fire({
        html: `
        <div style="text-align: center;">
          <img src="${deletes}" alt="Delete Icon" style="width: 150px; height: 150px; display: block; margin: 0 auto;" />
          <p>Are you sure you want to delete ?</p>
        </div>
      `,
        text: "Are you sure you want to delete ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete them!",
        didOpen: () => {
          const popup = Swal.getPopup();
          popup.style.width = "300px";
          popup.style.padding = "20px";
        },
      });

      if (result.isConfirmed) {
        await Promise.all(
          selectedRows.map((id) => axios.delete(`${baseurl}/data/${id}`))
        );
        await Swal.fire({
          title: "Deleted!",
          text: "The transactions have been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          didOpen: () => {
            const popup = Swal.getPopup();
            popup.style.width = "300px";
            popup.style.padding = "20px";
          },
        });
        navigate(0);
      }
    } catch (err) {
      console.error("Error deleting transactions:", err);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the transactions.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        text: "No Selection!",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    bulkDeleteTransactions();
  };
  const uniqueTitles = ["all", ...new Set(transactions.map((t) => t.title))];
  const uniqueDescriptions = [
    "all",
    ...new Set(transactions.map((t) => t.description)),
  ];
  const amountRanges = [
    "all",
    "Below Rs.100",
    "Rs.100 - Rs.500",
    "Rs.500 - Rs.1000",
    "Above Rs.1000",
  ];

  const filterByMonth = (data) => {
    if (!monthFilter) return data;

    const [year, month] = monthFilter.split("-");

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === parseInt(year, 10) &&
        itemDate.getMonth() + 1 === parseInt(month, 10)
      );
    });
  };

  const editTransaction = (transaction) => {
    const [description, reason] = transaction.description.includes(" - ")
      ? transaction.description.split(" - ")
      : [transaction.description, ""];
    setFormData({
      title: transaction.title,
      description: description,
      date: transaction.date,
      amount: transaction.amount,
      reason: reason,
    });
    setEditingData(transaction._id);
  };

  const handleRowClick = (id, e) => {
    e.stopPropagation();
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === transactions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(transactions.map((transaction) => transaction._id));
    }
  };

  const filteredTransactions = filterByMonth(transactions).filter(
    (transaction) => {
      const amount = transaction.amount;
      let amountMatch = false;
      switch (amountFilter) {
        case "all":
          amountMatch = true;
          break;
        case "Below Rs.100":
          amountMatch = amount < 100;
          break;
        case "Rs.100 - Rs.500":
          amountMatch = amount >= 100 && amount <= 500;
          break;
        case "Rs.500 - Rs.1000":
          amountMatch = amount > 500 && amount <= 1000;
          break;
        case "Above Rs.1000":
          amountMatch = amount > 1000;
          break;
        default:
          amountMatch = false;
      }

      return (
        (titleFilter === "all" || transaction.title === titleFilter) &&
        (descriptionFilter === "all" ||
          transaction.description === descriptionFilter) &&
        amountMatch
      );
    }
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // If formatDate is defined in the same file
  function formatDate(dateString) {
    const options = { year: "2-digit", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="mt-6">
      {/* Actions */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleDeleteSelected}
          className="p-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Selected
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedRows.length === transactions.length}
            onChange={handleSelectAll}
            className="mr-2"
          />
          <span>Select All</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-center text-gray-600">S.No</th>
              <th className="relative px-4 py-2 text-center text-gray-600">
                Type
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "type" ? null : "type")
                  }
                  className="ml-2 text-gray-600 focus:outline-none"
                >
                  <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
                </button>
                {dropdownOpen === "type" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {uniqueTitles.map((title) => (
                      <button
                        key={title}
                        onClick={() => setTitleFilter(title)}
                        className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                )}
              </th>
              <th className="relative px-4 py-2 text-center text-gray-600">
                Description
                <button
                  onClick={() =>
                    setDropdownOpen(
                      dropdownOpen === "description" ? null : "description"
                    )
                  }
                  className="ml-2 text-gray-600 focus:outline-none"
                >
                  <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
                </button>
                {dropdownOpen === "description" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {uniqueDescriptions.map((description) => (
                      <button
                        key={description}
                        onClick={() => setDescriptionFilter(description)}
                        className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
                      >
                        {description}
                      </button>
                    ))}
                  </div>
                )}
              </th>
              <th className="relative px-4 py-2 text-center text-gray-600">
                Date
                <div className="d-flex flex-column me-3 inline-block ml-4">
                  <input
                    type="month"
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="p-1 border border-gray-300 rounded-md w-7"
                  />
                </div>
              </th>

              <th className="relative px-4 py-2 text-center text-gray-600">
                Amount
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "amount" ? null : "amount")
                  }
                  className="ml-2 text-gray-600 focus:outline-none"
                >
                  <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
                </button>
                {dropdownOpen === "amount" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {amountRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => setAmountFilter(range)}
                        className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </th>
              <th className="px-4 py-2 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-600">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((transaction, index) => {
                const isSelected = selectedRows.includes(transaction._id);
                const bgColor =
                  transaction.title === "Income"
                    ? isSelected
                      ? "bg-blue-100 text-green-500"
                      : "bg-green-50"
                    : isSelected
                    ? "bg-blue-100 text-red-600"
                    : "bg-red-50";
                const textColor =
                  transaction.title === "Income"
                    ? "text-green-800"
                    : "text-red-800";

                return (
                  <tr
                    key={transaction._id}
                    className={`border-b border-gray-200 ${bgColor}`}
                    onClick={(e) => handleRowClick(transaction._id, e)}
                  >
                    <td className="px-4 py-2 text-center text-gray-600">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td
                      className={`px-4 py-2 cursor-pointer ${textColor}`}
                      // onClick={() => handleRowClick(transaction._id)}
                    >
                      {transaction.title}
                    </td>
                    <td
                      className={`px-4 py-2 cursor-pointer ${textColor}`}
                      // onClick={() => handleRowClick(transaction._id)}
                    >
                      {transaction.description}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-600">
                      {/* {new Date(transaction.date).toLocaleDateString("en-IN")} */}
                      
                        {formatDate(transaction.date)}
                      
                    </td>
                    <td className="px-4 py-2 text-center text-gray-600">
                      {formatNumber(transaction.amount)}
                    </td>
                    <td className="py-2 flex justify-around">
                      <button
                        className="p-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          editTransaction(transaction);
                        }}
                      >
                        <img src={editIcon} alt="Edit" className="w-6 h-6" />
                      </button>
                      <button
                        className="p-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTransaction(transaction._id);
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="w-6 h-6"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="flex items-center mt-4 justify-center">
  <button
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
    className="px-4 py-2 me-3 border border-gray-400 bg-white text-gray-800 rounded-lg shadow-md disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-gray-100"
  >
    ⬅️ Previous
  </button>
  <span className="text-gray-600 me-3">
    Page {currentPage} of {totalPages}
  </span> 
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className="px-4 py-2 border border-gray-400 bg-white text-gray-800 rounded-lg shadow-md disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-gray-100"
  >
    Next ➡️
  </button>
</nav>

    </div>
  );
};

export default Table;
