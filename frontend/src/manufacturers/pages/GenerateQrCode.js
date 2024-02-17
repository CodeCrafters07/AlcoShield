import { useEffect, useState } from "react"
import Header from "../inc/Header"
import Sidebar from "../inc/Sidebar"
import Generate from "../components/Generate"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Web3 from "web3"
import qrCodeContract from "../../abi/QrCode.json"
import CryptoJS from "crypto-js"
import swal from "sweetalert"

// const networkId = "http://127.0.0.1:7545"

const GenerateQrCode = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [data, setData] = useState([])
    // const [ipfsHash, setIpfsHash] = useState("")
    const [web3, setWeb3] = useState(null)
    const [dataHash, setDataHash] = useState()

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        init()
        hashQrCodeData()
    }, [])

    const hashQrCodeData = async () => {
        const concatenatedData = data.join("")

        // Generate a random number
        const randomNumber = Math.random()

        // Concatenate the random number to the concatenated data
        const dataWithRandomNumber = concatenatedData + randomNumber

        // Hash the concatenated data using SHA-1
        const hashedData = CryptoJS.SHA1(dataWithRandomNumber).toString()
        setDataHash(hashedData)
        console.log("Check hash data from component", hashedData)

        handleStoreQrCodeHash()

        // const timestamp = Date.now()
        // const keyIdentifier = CryptoJS.SHA1(timestamp).toString()
        // setKeyIdentity(keyIdentifier)
        // console.log("the identifier is: ", keyIdentifier)
    }

    const init = async () => {
        if (window.ethereum) {
            try {
                // Request MetaMask account access
                await window.ethereum.request({ method: "eth_requestAccounts" })

                // Create a new web3 instance
                const web3Instance = new Web3(window.ethereum)
                setWeb3(web3Instance)
            } catch (error) {
                console.error(`User denied account access `)
            }
        } else {
            console.error("Please install MetaMask")
        }
    }

    const handleStoreQrCodeHash = async (event) => {
        try {
            const abi = qrCodeContract.abi
            const address = qrCodeContract.networks[1337].address
            const contract = new web3.eth.Contract(abi, address)
            console.log("contract", contract)

            const selectedAccount = await web3.eth.getCoinbase()
            console.log("The account is", selectedAccount)

            await contract.methods
                .storeQrHash(dataHash)
                .send({ from: selectedAccount, gas: "1000000", gasPrice: 1000000000 })

            // from: accounts[0], gas: '1000000',gasPrice:1000000000

            swal({
                title: "Good job!",
                text: "QrCode is stored successfully!",
                icon: "success",
                button: "Aww yess!",
            })

            // window.location.hash = "/admin/listPresident"

            //   setFirstName("");
            //   setLastName("");
            //   setCollege("");
            //   setGender("");
        } catch (error) {
            //   if(error.message.includes("Only admin can perform this action")){
            //     const errorMessage = "Only admin can perform this action";
            //     setErrorMessage(errorMessage);
            //     setErrorMessageOpen(true);
            //     window.location.href = "/admin/auth";
            //   }
            //   else if(error.message.includes("You have already registered this President.")){
            //     const errorMessage = "Candidate President is already registered!!!";
            //     setErrorMessage(errorMessage);
            //     setErrorMessageOpen(true);
            //   } else {
            //     setErrorMessage("");
            //     setErrorMessageOpen(false);
            //   }

            console.error(error.message)
        }
    }

    const initialValues = {
        Status: "",
        Model: "",
        Brand: "",
        ManufacturerName: "",
        ManufacturerLocation: "",
    }

    const validationSchema = Yup.object().shape({
        Status: Yup.string().required("Status is required"),
        Model: Yup.string().required("Model is required"),
        Brand: Yup.string().required("Brand is required"),
        ManufacturerName: Yup.string().required("Manufacturer Name is required"),
        ManufacturerLocation: Yup.string().required("Manufacturer Location is required"),
    })

    const handleGenerateQrCode = async (values, { setSubmitting }) => {
        try {
            // Perform registration or login (this is where you would send data to the server)
            console.log("Authentication successful!", values)

            // setData(values)
            const updateDataState = [
                values.Status,
                values.Brand,
                values.ManufacturerName,
                values.ManufacturerLocation,
                values.Model,
            ]

            setData(updateDataState)

            hashQrCodeData()

            if (dataHash) {
                swal({
                    title: "Good job!",
                    text: "QrCode is generated successfully!",
                    icon: "success",
                    button: "Aww yess!",
                })

                //Clear the fields
                values.Status = ""
                values.Brand = ""
                values.ManufacturerName = ""
                values.ManufacturerLocation = ""
                values.Model = ""
                setSubmitting(false)
            } else {
                alert("data not set")
            }

            // return result.cid;
        } catch (error) {
            console.log(error)

            throw error
        }
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
                            Manufactuerers Generate QrCode
                        </h1>

                        <div className="w-3/4 rounded-md p-0 pb-4 mb-6 shadow-md">
                            <span className="flex space-x-1 text-lg md:text-lg lg:text-xl text-gray-500 font-semibold ">
                                <span className="hidden md:block">Fill This Form inorder to </span>
                                <span> Generate QrCode</span>
                            </span>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleGenerateQrCode}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="Status"
                                                    className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                                >
                                                    Status
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="Status"
                                                    name="Status"
                                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                    placeholder="Enter your Status"
                                                />
                                                <ErrorMessage
                                                    name="Status"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="Brand"
                                                    className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                                >
                                                    Brand:
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="Brand"
                                                    name="Brand"
                                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                    placeholder="Enter Manufacturer Brand"
                                                />
                                                <ErrorMessage
                                                    name="Brand"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full">
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="ManufacturerName"
                                                    className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                                >
                                                    Manufacturer Name:
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="ManufacturerName"
                                                    name="ManufacturerName"
                                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                    placeholder="Enter Manufacturer Name"
                                                />
                                                <ErrorMessage
                                                    name="ManufacturerName"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="ManufacturerLocation"
                                                    className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                                >
                                                    Manufacturer Location:
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="ManufacturerLocation"
                                                    name="ManufacturerLocation"
                                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                    placeholder="Enter Manufacturer Location"
                                                />
                                                <ErrorMessage
                                                    name="ManufacturerLocation"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <label
                                                htmlFor="Model"
                                                className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                            >
                                                Product Model:
                                            </label>
                                            <Field
                                                type="text"
                                                id="Model"
                                                name="Model"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                placeholder="Enter Product Model"
                                            />
                                            <ErrorMessage
                                                name="Model"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? `${(
                                                      <svg
                                                          aria-hidden="true"
                                                          role="status"
                                                          class="inline w-4 h-4 me-3 text-white animate-spin"
                                                          viewBox="0 0 100 101"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                          <path
                                                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                              fill="#E5E7EB"
                                                          />
                                                          <path
                                                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                              fill="currentColor"
                                                          />
                                                      </svg>
                                                  )}
                                            Loading...`
                                                : "Generate"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            {data.length > 0 && <Generate qrDetails={dataHash} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateQrCode
