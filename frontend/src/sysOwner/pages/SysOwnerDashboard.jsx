import { useEffect, useState } from "react"
import Header from "../inc/Header"
import Sidebar from "../inc/Sidebar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Web3 from "web3"
import qrCodeContract from "../../abi/QrCode.json"
import CryptoJS from "crypto-js"
import swal from "sweetalert"

// const networkId = "http://127.0.0.1:7545"

const SysOwnerDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RegisterManufacturer = ({ isLogin }) => {
        <div className="flex dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full overflow-auto">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex justify-center items-center mx-auto w-full">
                    {/* Manufacturers Header component is included */}

                    <div className="w-3/4 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                        <h1 className="hidden md:flex text-2xl justify-center md:text-3xl lg:text-4xl font-bold mb-4">
                            Welcome to the C.E.O Dashboard
                        </h1>

                        {/* <div className="w-3/4 rounded-md p-0 pb-4 mb-6 shadow-md">
                            <span className="flex space-x-1 text-lg md:text-lg lg:text-xl text-gray-500 font-semibold ">
                                <span className="hidden md:block">Fill This Form inorder to </span>
                                <span> Register Manufacturer</span>
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SysOwnerDashboard
