import React, { useEffect, useState } from 'react';
import Header from "../../inc/Header";
// import ipfs from '../ipfs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import swal from 'sweetalert';
import retailerContract from "../../../abi/QrCode.json"
import Web3 from 'web3';

const ManufacturerLogin = () => {
const [isSidebarOpen, setSidebarOpen] = useState(false);
const [password, setPassword] = useState("");
const [username, setusername] = useState("")
const [address, setAddress] = useState("")
const [ipfsHash, setIpfsHash] = useState("")

const [web3, setWeb3] = useState("")
//   const [data, setData] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
//   componentWillMount() {
//    console.log("hellow world");
//   };

useEffect(() => {
  const init = async () => {
    if (window.ethereum) {
      try{
        // Request MetaMask account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new web3 instance
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

      }
      catch(error){
        console.error(`User denied account access `);
      }
    }else {
      console.error('Please install MetaMask');
    }

  };
  init(); 
},[]);



const handleRegisterRetailer = async (event) => {
  try{
    const abi = retailerContract.abi;
    const contractAddress = retailerContract.networks[5777].address;

    const contract = new web3.eth.Contract(abi, contractAddress);

    const selectedAccount = await web3.eth.getCoinbase();
    await contract.methods.addRetailer( username, password ).send({ from: selectedAccount, gas: 1000000 });
    swal({
      title: "Good job!",
      text: "Woop woop! Retailer is registered successfully!!!",
      icon: "success",
      button: "Aww yess!",
    });

    window.username.href="/user/login"

    setPassword("");
    setusername("");

  }catch(error){
    // if(error.message.includes("Only admin can perform this action")){
    //   const errorMessage = "Someone is trying to register voter but fails";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    //   }
    // if(error.message.includes("Voter is already registered")){
    //   const errorMessage = "Voter is already registered!!!";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // }
    // if (error.message.includes("Invalid year of Study")) {
    //   const errorMessage = "Invalid year of Study. Please check your inputs.";
    //   setErrorMessage(errorMessage);
    //   setErrorMessageOpen(true);
    // } 
     
    console.error('Error:', error.message);

  }
}

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Perform registration or login (this is where you would send data to the server)
    console.log('Authentication successful!', values);
    // setData(values);
    setusername(values.username)
    setPassword(values.password)

  };

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

            <div className={`w-4/5 px-4  md:w-3/4 lg:w-1/2 mt-8 flex-col items-center justify-center shadow-md bg-gray-100 dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400`}>
                <h2 className="text-2xl md:text-3xl font-bold mt-4 pt-3">Login System</h2>
                <hr className="w-full dark:border-gray-500 dark:h-1 mt-6"/>
                
                <div className=" w-full rounded-md p-6 mt-4 bg-white dark:bg-transparent dark:text-gray-300">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>

                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                Username:
                                </label>
                                <Field
                                type="text"
                                id="username"
                                name="username"
                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                placeholder="Enter your username"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                Password:
                                </label>
                                <Field
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                           

                        <button
                            type="submit"
                            className="bg-blue-500 text-lg text-white p-2 rounded-md w-full"
                            disabled={isSubmitting}

                        >
                            {isSubmitting ? 'Processing...' : 'Register'}
                        </button>
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
        </div>
    </div>

  );
}

export default ManufacturerLogin;