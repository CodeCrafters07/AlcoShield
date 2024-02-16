import React, { useState } from "react"
import Header from "../inc/Header"
import Sidebar from "../inc/Sidebar"
import RetailerTable from "../components/RetailerTable"
import { Link } from "react-router-dom"
import RetailerTables from "../components/RetailerTables"
import QrCodeHashTable from "../components/QrCodeHashTable"

const ViewQrCodeHash = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const data = [
        {
            id: 1,
            name: "John Doe",
            location: "New York",
            phoneNumber: "123-456-7890",
            email: "john@example.com",
            status: "Active",
        },
        {
            id: 2,
            name: "Josephat",
            location: "Tanzania",
            phoneNumber: "123-456-7897",
            email: "zeflojujo@gmail.com",
            status: "Active",
        },
        {
            id: 3,
            name: "Josephat",
            location: "Tanzania",
            phoneNumber: "123-456-7897",
            email: "zeflojujo@gmail.com",
            status: "Active",
        },
        {
            id: 4,
            name: "Josephat",
            location: "Tanzania",
            phoneNumber: "123-456-7897",
            email: "zeflojujo@gmail.com",
            status: "Active",
        },
        {
            id: 5,
            name: "Josephat",
            location: "Tanzania",
            phoneNumber: "123-456-7897",
            email: "zeflojujo@gmail.com",
            status: "Active",
        },
    ]

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-4/5">
                        <Link
                            to={"/add-retailer"}
                            className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                        >
                            Add Retailer
                        </Link>
                        <QrCodeHashTable />
                    </div>

                    {/* <RetailerTable data={data} className="dark:bg-gray-900" /> */}
                </div>
            </div>
        </div>
    )
}

export default ViewQrCodeHash
