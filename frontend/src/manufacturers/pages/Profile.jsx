import { useEffect, useState } from "react"
import Header from "../inc/Header"
import Sidebar from "../inc/Sidebar"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Web3 from "web3"
import qrCodeContract from "../../abi/QrCode.json"
import swal from "sweetalert"

const Profile = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    // const [data, setData] = useState([])
    const [web3, setWeb3] = useState(null)
    // const [oldPassword, setOldPassword] = useState();
    // const [newPassword, setNewPassword] = useState()

    const [errorMessage, setErrorMessage] = useState();
    const [errorMessageOpen, setErrorMessageOpen] = useState();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        init()
    }, [])


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

    const handleChangePassword = async (oldPassword, newPassword) => {
        try {
            const abi = qrCodeContract.abi
            const address = qrCodeContract.networks[1337].address
            const contract = new web3.eth.Contract(abi, address)
            console.log("contract", contract)

            const selectedAccount = await web3.eth.getCoinbase()
            console.log("The account is", selectedAccount)
            console.log(oldPassword,newPassword)

            if(newPassword != oldPassword){
              console.log("valid password")

              const oldPasswordHash = web3.utils.keccak256(
                web3.eth.abi.encodeParameter("string", oldPassword),
              )
  
              const newPasswordHash = web3.utils.keccak256(
                web3.eth.abi.encodeParameter("string", newPassword),
              )
  
              await contract.methods
                  .changePassword(oldPasswordHash, newPasswordHash)
                  .send({ from: selectedAccount, gas: "1000000", gasPrice: 1000000000 })
  
              swal({
                  title: "Good job!",
                  text: "Password is changed successfully!",
                  icon: "success",
                  button: "Aww yess!",
              })
            }
            else{
              setErrorMessage("New password should be different with old password")
              setErrorMessageOpen(true);
            }

        } catch (error) {
              if(error.message.includes("Invalid old password")){
                const errorMessage = "Invalid old password";
                console.log(errorMessage)
                setErrorMessage(errorMessage);
                setErrorMessageOpen(true);
              }
              else if(error.message.includes("Password should not be empty")){
                const errorMessage = "Password should not be empty!!!";
                setErrorMessage(errorMessage);
                setErrorMessageOpen(true);
              }
              else if(error.message.includes("Invalid new password")){
                const errorMessage = "Invalid new password!!!";
                setErrorMessage(errorMessage);
                setErrorMessageOpen(true);
              } 
              else if(error.message.includes("Not logged in")){
                const errorMessage = "Not logged in";
                setErrorMessage(errorMessage);
                setErrorMessageOpen(true);
                window.location.href = "/manufacturer/login";
              } 
              else {
                setErrorMessage("");
                setErrorMessageOpen(false);
              }

            console.error(error.message)
        }
    }

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Old Password field is required"),
        newPassword: Yup.string().required("New Password field is required"),
        confirmPassword: Yup.string().required("Confirm Password is required"),
    })

    const handleGenerateQrCode = async (values, { setSubmitting }) => {
        try {
            // Perform registration or login (this is where you would send data to the server)
            console.log("Authentication successful!", values)

            // setData(values)
            // const updateDataState = [
            //     values.oldPassword,
            //     values.confirmPassword,
            //     values.newPassword,
            // ]

            // setData(updateDataState)
            // setOldPassword(values.oldPassword)
            // setNewPassword(values.newPassword)

            handleChangePassword(values.oldPassword, values.newPassword)

            // if (dataHash) {
                

                //Clear the fields
                values.oldPassword = ""
                values.confirmPassword = ""
                values.newPassword = ""
                setSubmitting(false)
            // } else {
            //     alert("data not set")
            // }

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
                            Manufactuerers Profile
                        </h1>

                        <div className="w-3/4 rounded-md p-0 pb-4 mb-6 shadow-md">
                            <span className="flex space-x-1 text-1xl md:text-3xl lg:text-3xl text-gray-500 font-semibold ">
                                Change Password
                            </span>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleGenerateQrCode}
                            >
                                {({ isSubmitting }) => (
                                    <Form>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="oldPassword"
                                                className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                            >
                                                Old Password
                                            </label>
                                            <Field
                                                type="text"
                                                id="oldPassword"
                                                name="oldPassword"
                                                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                placeholder="Enter your old password"
                                            />
                                            <ErrorMessage
                                                name="oldPassword"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
                                            
                                          <div className="mb-8">
                                              <label
                                                  htmlFor="newPassword"
                                                  className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                              >
                                                  New Password:
                                              </label>
                                              <Field
                                                  type="text"
                                                  id="newPassword"
                                                  name="newPassword"
                                                  className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                  placeholder="Enter new password"
                                              />
                                              <ErrorMessage
                                                  name="newPassword"
                                                  component="div"
                                                  className="text-red-500 text-sm mt-1"
                                              />
                                          </div>
                                            
                                          <div className="mb-4">
                                              <label
                                                  htmlFor="confirmPassword"
                                                  className="block text-sm md:text-base lg:text-lg font-medium text-gray-600"
                                              >
                                                  confirmPassword:
                                              </label>
                                              <Field
                                                  type="text"
                                                  id="confirmPassword"
                                                  name="confirmPassword"
                                                  className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                                  placeholder="Confirm Password"
                                              />
                                              <ErrorMessage
                                                  name="confirmPassword"
                                                  component="div"
                                                  className="text-red-500 text-sm mt-1"
                                              />
                                          </div>
                                          {errorMessageOpen ? <div className="text-red-500 text-base mx-3 my-1 w-full">{errorMessage}</div>: ""}
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
                                                          role="oldPassword"
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
