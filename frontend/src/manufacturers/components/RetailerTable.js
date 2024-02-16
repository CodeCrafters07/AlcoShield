// import React, { useState } from 'react';
// import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table';
// import Modal from '../components/RetailerModal';

// const RetailerTable = ({ data }) => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleFormSubmit = (formData) => {
//     // Handle the form submission logic here
//     console.log('Form submitted with data:', formData);
//     // Close the modal after submission
//     setModalOpen(false);
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: 'ID', accessor: 'id' },
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Location', accessor: 'location' },
//       { Header: 'Phone Number', accessor: 'phoneNumber' },
//       { Header: 'Email', accessor: 'email' },
//       { Header: 'Status', accessor: 'status' },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     setGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy
//   );

//   const { globalFilter } = state;

//   return (
//     <div>

//       <input
//         type="text"
//         value={globalFilter || ''}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//         placeholder="Search..."
//       />
//       <div>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute top-4 right-4"
//           onClick={() => setModalOpen(true)}
//         >
//           Add Data
//         </button>
//         <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onFormSubmit={handleFormSubmit} />
//         {/* {/* Rest of your content */}
//       </div>

//       <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render('Header')}
//                   <span>
//                     {column.isSorted ? (column.isSortedDesc ? ' Descending' : ' Ascending') : ''}
//                   </span>
//                   <div>{column.canFilter ? column.render('Filter') : null}</div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RetailerTable;

import React from "react";
import DataTable from "react-data-table-component";
import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";

const RetailerTable = ({ data }) => {
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(row)}
          >
            <FaTrash />
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleUpdate(row)}
          >
            <FaEdit />
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => handleDownload(row)}
          >
            <FaDownload />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (row) => {
    // Handle delete logic
    console.log("Delete", row);
  };

  const handleUpdate = (row) => {
    // Handle update logic
    console.log("Update", row);
  };

  const handleDownload = (row) => {
    // Handle download logic
    console.log("Download", row);
  };

  return (
    <>
      <div className="w-4/5 flex justify-center flex-col dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
        <DataTable
          title="Retailers List"
          columns={columns}
          data={data}
          pagination
          selectableRows
          className="dark:bg-gray-900"
        />
      </div>
    </>
  );
};

export default RetailerTable;
