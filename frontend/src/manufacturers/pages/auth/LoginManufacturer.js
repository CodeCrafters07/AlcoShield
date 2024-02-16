import React, { useEffect, useState } from "react"
import Header from "../../inc/Header"
// import ipfs from '../ipfs';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
// import { Link } from "react-router-dom"
import swal from "sweetalert"
import Web3 from "web3"
import qrCodeContract from "../../../abi/QrCode.json"

const ManufacturerLogin = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    //   const [data, setData] = useState("");

    const [web3, setWeb3] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [userAccounts, setUserAccounts] = useState("")

    const [regNo, setRegNo] = useState("")
    // const [sessionId, setSessionId] = useState("");

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }
    //   componentWillMount() {
    //    console.log("hellow world");
    //   };

    useEffect(() => {
        // console.log('hellow world');
        const init = async () => {
            if (window.ethereum) {
                try {
                    // Request MetaMask account access
                    await window.ethereum.request({ method: "eth_requestAccounts" })

                    // Create a new web3 instance
                    const web3Instance = new Web3(window.ethereum)
                    setWeb3(web3Instance)

                    // Get user accounts
                    const accounts = await web3Instance.eth.getAccounts()
                    setUserAccounts(accounts)
                } catch (error) {
                    console.error(`User denied account access `)
                }
            } else {
                console.error("Please install MetaMask")
            }
        }
        init()
    }, [])

    const handleManufacturerLogin = async (event) => {
        if (web3 && userAccounts.length > 0) {
            try {
                // const web3 = new Web3()

                // const accountss = await web3.eth.getAccounts();

                const abi = qrCodeContract.abi
                const address = qrCodeContract.networks[5777].address

                const contract = new web3.eth.Contract(abi, address)
                // setContracts(contractInstance);

                const selectedAccount = await web3.eth.getCoinbase()
                console.log(selectedAccount)

                const passwordHash = web3.utils.keccak256(
                    web3.eth.abi.encodeParameter("string", password),
                )
                console.log("Hashed password", passwordHash)
                const result = await contract.methods
                    .voterLogin(regNo, password)
                    .send({ from: selectedAccount, gas: 1000000 })

                if (result) {
                    window.location.hash = "/user/dashboard"
                } else {
                    console.log("Invalid email or password")
                }
            } catch (error) {
                // if(error.message.includes("Your account is not registered!")){
                //   const errorMessage = "Your account is not registered!";
                //   setErrorMessage(errorMessage);
                // }
                // if(error.message.includes("Invalid registration number")){
                //   const errorMessage = "Invalid email or Password";
                //   setErrorMessage(errorMessage);
                // }
                // if(error.message.includes("Invalid password")){
                //   const errorMessage = "Invalid email or Password";
                //   setErrorMessage(errorMessage);
                // }
                // if(error.message.includes("Voter is already registered")){
                //   const errorMessage = "Voter is already registered";
                //   setErrorMessage(errorMessage);
                // }

                console.log(error.message)
            }
        }
    }

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const handleSubmit = (values, { setSubmitting }) => {
        // Perform registration or login (this is where you would send data to the server)
        console.log("Authentication successful!", values)
        // setData(values);
        setEmail(values.email)
        setPassword(values.password)

        handleManufacturerLogin()
    }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-screen">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                    {/* Manufacturers Header component is included */}

                    <div
                        className={`w-4/5 px-4  md:w-3/4 lg:w-1/2 mt-8 flex-col items-center justify-center shadow-md bg-gray-100 dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400`}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mt-4 pt-3">Login System</h2>
                        <hr className="w-full dark:border-gray-500 dark:h-1 mt-6" />

                        <div className=" w-full rounded-md p-6 mt-4 bg-white dark:bg-transparent dark:text-gray-300">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                email:
                                            </label>
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                placeholder="Enter your email"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                            >
                                                Password:
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                placeholder="Enter your password"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-lg text-white p-2 rounded-md w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Register"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerLogin
