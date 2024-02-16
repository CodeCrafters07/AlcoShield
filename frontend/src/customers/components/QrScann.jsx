import React, { useEffect, useRef, useState } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import swal from "sweetalert";

import Web3 from "web3"
import qrCodeContract from "../../abi/QrCode.json"

const networkId = "http://127.0.0.1:7545"

const QrScann = () => {
  // QR States
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  // Result
  // const [scannedResult, setScannedResult] = useState();

  const [isOriginal, setIsOriginal] = useState(false)

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    // setScannedResult(result?.data);
    getScannItemResult(result?.data);

    
     
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl.current) {
        scanner.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  


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
  },[]);

  const getScannItemResult = async (qrHash) => {
    const web3 = new Web3(networkId)
    const abi = qrCodeContract.abi
    const address = qrCodeContract.networks[5777].address
    // const selectedAccount = await web3.eth.getCoinbase();
    // console.log("User address", selectedAccount);

    console.log("am reach here")

    const contract = new web3.eth.Contract(abi, address)
    const _isOriginal = await contract.methods.scanItem(qrHash).call()

    console.log("Is original product? ", _isOriginal)

    if(_isOriginal){

      setIsOriginal(true)

      swal({
        title: "GUINUINE PRODUCT!",
        text: "Wine is verified successfully!",
        icon: "success",
        button: "view the details",
      });
    } else {
      swal({
        title: "FAKE!",
        text: "This wine product is danger for your Health!",
        icon: "warning",
        button: "Okay",
      });
    }

    console.log(_isOriginal)

}

  // useEffect(() => {
  //   if (!qrOn) {
  //     const allowCamera = async () => {
  //       try {
  //         await navigator.mediaDevices.getUserMedia({ video: true });
  //         setQrOn(true);
  //       } catch (error) {
  //         console.error("Error accessing camera:", error);
  //       }
  //     };
  //     allowCamera();
  //   }
  // }, [qrOn]);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-2 md:text-4xl">Care Your Healthy</h1>
      <h1 className="mb-16 text-lg md:text-1xl">Verify Your Wine Qr-Code Before use</h1>
      {/* {scannedResult && (
          <p className="relative flex items-center justify-center top-0 left-0 z-50 px-4 py-2 text-black dark:text-gray-300">
            Scanned Result: {scannedResult}
          </p>
      )} */}
    <div className="relative w-full md:max-w-2xl">
      <video
        ref={videoEl}
        className="w-full h-[50%] bg-black rounded-lg "
      ></video>
      <div ref={qrBoxEl} className="flex items-center justify-center">
        <img
              src={QrFrame}
              alt="Qr Frame"
              width={456}
              height={456}
              className="h-auto absolute flex z-50 items-center justify-center"
            />
      </div>
      
    </div>
      
    </div>
  );
};

export default QrScann;
