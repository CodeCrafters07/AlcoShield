import React, { useState, useEffect } from 'react';
import Web3 from "web3"
import qrCodeContract from "../../abi/QrCode.json"


const networkId = "http://127.0.0.1:7545"

const ManufacturerProfile = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  // const [web3, setWeb3] = useState(null)
  const [qrHash, setQrHash] = useState([])


  useEffect(() => {

    const init = async () => {
      if (window.ethereum) {
        try{
          // Request MetaMask account access
         
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create a new web3 instance
          // const web3Instance = new Web3(window.ethereum);
          // setWeb3(web3Instance);

        }
        catch(error){
          console.error(`User denied account access `);
        }
      }else {
          console.error('Please install MetaMask');
      }  
    };
    init(); 
    getQrCodeHash();
  },[]);

  const getQrCodeHash = async () => {
    const web3 = new Web3(networkId)
    const abi = qrCodeContract.abi
    const address = qrCodeContract.networks[1337].address
    // const selectedAccount = await web3.eth.getCoinbase();
    // console.log("User address", selectedAccount);

    console.log("am reach here")

    const contract = new web3.eth.Contract(abi, address)
    const qrCodeHashArray = await contract.methods.getManfItemIDList().call()

    const qrCodeData = []

    if(qrCodeHashArray.length === 0){
      console.log("NO DATA");
    }

    for (let i = 0; i < qrCodeHashArray.length; i++) {
        const qrCodeHash = qrCodeHashArray[i]
        // console.log(`the registration number is: ${voterRegNumber}`);
        const _qrHash = await contract.methods.getQrHash(qrCodeHash).call()
        qrCodeData.push(_qrHash)
        // console.log(president);
    }
    console.log(qrCodeData)

    setQrHash(qrCodeData)
}

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">List of Qr-Code Hash</h1>
      </div>

      <div className="p-4">
      
      <div className="shadow-md overflow-x-auto" style={{zIndex: '-999'}}>
        <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
          <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
            <tr className='border-none'>
              <th className="py-2 px-4 border-b text-start text-lg">ID</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Qr-Code Hash</th>

              <th className="py-2 px-4 border-b text-start text-lg flex col-span-2 justify-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {qrHash.map((item, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index+1}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{item} </td>

                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    
    </>
    
  );
};

export default ManufacturerProfile;