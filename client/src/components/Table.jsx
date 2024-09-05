// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import editIcon from "../assets/edit.png";
// import deleteIcon from "../assets/deletes.png";
// import Swal from "sweetalert2";
// import deletes from "../assets/deletes.jpeg";
// import down from "../assets/down.png";
// import { baseurl } from "../url";

// const Table = ({ transactions, setFormData, setEditingData }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [titleFilter, setTitleFilter] = useState("all");
//   const [descriptionFilter, setDescriptionFilter] = useState("all");
//   const [amountFilter, setAmountFilter] = useState("all");
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc"); // Sorting state

//   const navigate = useNavigate();

//   const formatNumber = (num) => {
//     return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
//   };

//   const deleteTransaction = async (id) => {
//     try {
//       const result = await Swal.fire({
//         html: `
//         <div style="text-align: center;">
//           <img src="${deletes}" alt="Delete Icon" style="width: 150px; height: 150px; display: block; margin: 0 auto;" />
//           <p>Are you sure you want to delete ?</p>
//         </div>
//       `,
//         text: "Are you sure you want to delete ?",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//         didOpen: () => {
//           const popup = Swal.getPopup();
//           popup.style.width = "300px";
//           popup.style.padding = "20px";
//         },
//       });

//       if (result.isConfirmed) {
//         await axios.delete(`${baseurl}/data/${id}`);
//         await Swal.fire({
//           title: "Deleted!",
//           text: "The transaction has been deleted.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//           didOpen: () => {
//             const popup = Swal.getPopup();
//             popup.style.width = "300px";
//             popup.style.padding = "20px";
//           },
//         });
//         navigate(0);
//       }
//     } catch (err) {
//       console.error("Error deleting transaction:", err);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while deleting the transaction.",
//         icon: "error",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const bulkDeleteTransactions = async () => {
//     try {
//       const result = await Swal.fire({
//         html: `
//         <div style="text-align: center;">
//           <img src="${deletes}" alt="Delete Icon" style="width: 150px; height: 150px; display: block; margin: 0 auto;" />
//           <p>Are you sure you want to delete ?</p>
//         </div>
//       `,
//         text: "Are you sure you want to delete ?",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete them!",
//         didOpen: () => {
//           const popup = Swal.getPopup();
//           popup.style.width = "300px";
//           popup.style.padding = "20px";
//         },
//       });

//       if (result.isConfirmed) {
//         await Promise.all(
//           selectedRows.map((id) => axios.delete(`${baseurl}/data/${id}`))
//         );
//         await Swal.fire({
//           title: "Deleted!",
//           text: "The transactions have been deleted.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//           didOpen: () => {
//             const popup = Swal.getPopup();
//             popup.style.width = "300px";
//             popup.style.padding = "20px";
//           },
//         });
//         navigate(0);
//       }
//     } catch (err) {
//       console.error("Error deleting transactions:", err);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while deleting the transactions.",
//         icon: "error",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const handleDeleteSelected = () => {
//     if (selectedRows.length === 0) {
//       Swal.fire({
//         text: "No Selection!",
//         icon: "warning",
//         timer: 2000,
//         showConfirmButton: false,
//         didOpen: () => {
//           const popup = Swal.getPopup();
//           popup.style.width = "200px";
//           popup.style.height = "250px";
//         },
//       });
//       return;
//     }
//     bulkDeleteTransactions();
//   };

//   const editTransaction = (transaction) => {
//     setFormData({
//       title: transaction.title,
//       description: transaction.description,
//       date: transaction.date,
//       amount: transaction.amount,
//       reason: transaction.reason,
//     });
//     setEditingData(transaction._id);
//   };

//   const handleRowClick = (id, e) => {
//     e.stopPropagation();
//     setSelectedRows((prevSelectedRows) =>
//       prevSelectedRows.includes(id)
//         ? prevSelectedRows.filter((rowId) => rowId !== id)
//         : [...prevSelectedRows, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === transactions.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(transactions.map((transaction) => transaction._id));
//     }
//   };

//   const uniqueTitles = ["all", ...new Set(transactions.map((t) => t.title))];
//   const uniqueDescriptions = [
//     "all",
//     ...new Set(transactions.map((t) => t.description)),
//   ];
//   const amountRanges = [
//     "all",
//     "Below Rs.100",
//     "Rs.100 - Rs.500",
//     "Rs.500 - Rs.1000",
//     "Above Rs.1000",
//   ];

//   const filteredTransactions = transactions.filter((transaction) => {
//     const amount = transaction.amount;
//     let amountMatch = false;
//     if (amountFilter === "all") amountMatch = true;
//     else if (amountFilter === "Below Rs.100") amountMatch = amount < 100;
//     else if (amountFilter === "Rs.100 - Rs.500")
//       amountMatch = amount >= 100 && amount <= 500;
//     else if (amountFilter === "Rs.500 - Rs.1000")
//       amountMatch = amount > 500 && amount <= 1000;
//     else if (amountFilter === "Above Rs.1000") amountMatch = amount > 1000;

//     return (
//       (titleFilter === "all" || transaction.title === titleFilter) &&
//       (descriptionFilter === "all" ||
//         transaction.description === descriptionFilter) &&
//       amountMatch
//     );
//   });

//   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
//     const dateA = new Date(a.date);
//     const dateB = new Date(b.date);
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//   });

//   const groupedByMonth = sortedTransactions.reduce((acc, transaction) => {
//     const monthYear = new Date(transaction.date).toLocaleDateString("en-GB", {
//       month: "long",
//       year: "numeric",
//     });
//     if (!acc[monthYear]) {
//       acc[monthYear] = [];
//     }
//     acc[monthYear].push(transaction);
//     return acc;
//   }, {});

//   return (
//     <div className="mt-6">
//       <div className="flex justify-between mb-4">
//         <button
//           onClick={handleDeleteSelected}
//           className="p-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
//         >
//           Delete Selected
//         </button>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={selectedRows.length === transactions.length}
//             onChange={handleSelectAll}
//             className="mr-2"
//           />
//           <span>Select All</span>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-100 border-b border-gray-200">
//               <th className="px-4 py-2 text-center text-gray-600">S.No</th>
//               <th className="relative px-4 py-2 text-center text-gray-600">
//                 Type
//                 <button
//                   onClick={() =>
//                     setDropdownOpen(dropdownOpen === "type" ? null : "type")
//                   }
//                   className="ml-2 text-gray-600 focus:outline-none"
//                 >
//                   <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
//                 </button>
//                 {dropdownOpen === "type" && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
//                     {uniqueTitles.map((title) => (
//                       <button
//                         key={title}
//                         onClick={() => setTitleFilter(title)}
//                         className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
//                       >
//                         {title}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </th>
//               <th className="relative px-4 py-2 text-center text-gray-600">
//                 Description
//                 <button
//                   onClick={() =>
//                     setDropdownOpen(
//                       dropdownOpen === "description" ? null : "description"
//                     )
//                   }
//                   className="ml-2 text-gray-600 focus:outline-none"
//                 >
//                   <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
//                 </button>
//                 {dropdownOpen === "description" && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
//                     {uniqueDescriptions.map((description) => (
//                       <button
//                         key={description}
//                         onClick={() => setDescriptionFilter(description)}
//                         className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
//                       >
//                         {description}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </th>
//               <th className="relative px-4 py-2 text-center text-gray-600">
//                 Date
//                 <button
//                   onClick={() =>
//                     setSortOrder((prevOrder) =>
//                       prevOrder === "asc" ? "desc" : "asc"
//                     )
//                   }
//                   className="ml-2 text-gray-600 focus:outline-none"
//                 >
//                   {sortOrder === "asc" ? "▲" : "▼"}
//                 </button>
//               </th>
//               <th className="relative px-4 py-2 text-center text-gray-600">
//                 Amount
//                 <button
//                   onClick={() =>
//                     setDropdownOpen(dropdownOpen === "amount" ? null : "amount")
//                   }
//                   className="ml-2 text-gray-600 focus:outline-none"
//                 >
//                   <img src={down} alt="arrow" className="w-3 h-3 inline"></img>
//                 </button>
//                 {dropdownOpen === "amount" && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
//                     {amountRanges.map((range) => (
//                       <button
//                         key={range}
//                         onClick={() => setAmountFilter(range)}
//                         className="block w-full px-4 py-2 text-gray-700 text-left hover:bg-gray-100"
//                       >
//                         {range}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </th>
//               <th className="px-4 py-2 text-center text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(groupedByMonth).length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-4 py-2 text-center text-gray-600">
//                   No transactions found.
//                 </td>
//               </tr>
//             ) : (
//               Object.keys(groupedByMonth).map((monthYear) => (
//                 <React.Fragment key={monthYear}>
//                   <tr className="bg-gray-200">
//                     <td
//                       colSpan="6"
//                       className="px-4 py-2 text-center font-bold text-gray-600"
//                     >
//                       {monthYear}
//                     </td>
//                   </tr>
//                   {groupedByMonth[monthYear].map((transaction, index) => {
//                     const isSelected = selectedRows.includes(transaction._id);
//                     const bgColor =
//                       transaction.title === "Income"
//                         ? isSelected
//                           ? "bg-blue-100 text-green-500"
//                           : "bg-green-50"
//                         : isSelected
//                         ? "bg-blue-100 text-red-600"
//                         : "bg-red-50";
//                     const textColor =
//                       transaction.title === "Income"
//                         ? "text-green-800"
//                         : "text-red-800";

//                     return (
//                       <tr
//                         key={transaction._id}
//                         onClick={(e) => handleRowClick(transaction._id, e)}
//                         className={`${bgColor} ${textColor} border-b border-gray-200 cursor-pointer`}
//                       >
//                         <td className="px-4 py-2">{index + 1}</td>
//                         <td className="px-4 py-2">{transaction.title}</td>
//                         <td className="px-4 py-2">
//                           {transaction.description}
//                           {/* {transaction.reason ? ` - ${transaction.reason}` : ""} */}
//                         </td>
//                         <td className="px-4 py-2">
//                           {new Date(transaction.date).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "numeric",
//                               month: "numeric",
//                               year: "2-digit",
//                             }
//                           )}
//                         </td>
//                         <td className="px-4 py-2">
//                           {formatNumber(transaction.amount)}
//                         </td>

//                         <td className="py-2 flex justify-around">
//                           <button
//                             className="p-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               editTransaction(transaction);
//                             }}
//                           >
//                             <img
//                               src={editIcon}
//                               alt="Edit"
//                               className="w-6 h-6"
//                             />
//                           </button>
//                           <button
//                             className="p-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               deleteTransaction(transaction._id);
//                             }}
//                           >
//                             <img
//                               src={deleteIcon}
//                               alt="Delete"
//                               className="w-6 h-6"
//                             />
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/deletes.png";
import Swal from "sweetalert2";
import deletes from "../assets/deletes.jpeg";
import down from "../assets/down.png";
import { baseurl } from "../url";

const Table = ({ transactions, setFormData, setEditingData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [titleFilter, setTitleFilter] = useState("all");
  const [descriptionFilter, setDescriptionFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state

  const navigate = useNavigate();

  const formatNumber = (num) => {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

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
        didOpen: () => {
          const popup = Swal.getPopup();
          popup.style.width = "200px";
          popup.style.height = "250px";
        },
      });
      return;
    }
    bulkDeleteTransactions();
  };

  const editTransaction = (transaction) => {
    const [description, reason] = transaction.description.includes(' - ')
    ? transaction.description.split(' - ')
    : [transaction.description, ''];
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

  const filteredTransactions = transactions.filter((transaction) => {
    const amount = transaction.amount;
    let amountMatch = false;
    if (amountFilter === "all") amountMatch = true;
    else if (amountFilter === "Below Rs.100") amountMatch = amount < 100;
    else if (amountFilter === "Rs.100 - Rs.500")
      amountMatch = amount >= 100 && amount <= 500;
    else if (amountFilter === "Rs.500 - Rs.1000")
      amountMatch = amount > 500 && amount <= 1000;
    else if (amountFilter === "Above Rs.1000") amountMatch = amount > 1000;

    return (
      (titleFilter === "all" || transaction.title === titleFilter) &&
      (descriptionFilter === "all" ||
        transaction.description === descriptionFilter) &&
      amountMatch
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const groupedByMonth = sortedTransactions.reduce((acc, transaction) => {
    const monthYear = new Date(transaction.date).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(transaction);
    return acc;
  }, {});

  return (
    <div className="mt-6">
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
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
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
                <button
                  onClick={() =>
                    setSortOrder((prevOrder) =>
                      prevOrder === "asc" ? "desc" : "asc"
                    )
                  }
                  className="ml-2 text-gray-600 focus:outline-none"
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </button>
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
            {Object.keys(groupedByMonth).length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-600">
                  No transactions found.
                </td>
              </tr>
            ) : (
              Object.keys(groupedByMonth).map((monthYear) => (
                <React.Fragment key={monthYear}>
                  <tr className="bg-gray-200">
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-center font-bold text-gray-600"
                    >
                      {monthYear}
                    </td>
                  </tr>
                  {groupedByMonth[monthYear].map((transaction, index) => {
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
                        onClick={(e) => handleRowClick(transaction._id, e)}
                        className={`${bgColor} ${textColor} border-b border-gray-200 cursor-pointer`}
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{transaction.title}</td>
                        <td className="px-4 py-2">
                          {transaction.description}
                          {transaction.reason ? ` - ${transaction.reason}` : ""}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "numeric",
                              year: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4 py-2">
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
                            <img
                              src={editIcon}
                              alt="Edit"
                              className="w-6 h-6"
                            />
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
                  })}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
