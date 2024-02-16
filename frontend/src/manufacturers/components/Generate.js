import React, { useEffect, useState } from "react"
import QRCode from "qrcode.react"
import { PiDownloadSimpleDuotone } from "react-icons/pi"

// const networkId = "http://127.0.0.1:7545"

const Generate = ({ qrDetails }) => {
    // download QR code
    const downloadQRCode = () => {
        const qrCodeURL = document
            .getElementById("qrCodeEl")
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        console.log(qrCodeURL)
        let aEl = document.createElement("a")
        aEl.href = qrCodeURL
        aEl.download = "QR_Code.png"
        document.body.appendChild(aEl)
        aEl.click()
        document.body.removeChild(aEl)
    }

    return (
        <div className="flex flex-col justify-center mt-4">
            <QRCode
                id="qrCodeEl"
                value={qrDetails}
                size={138}
                className="flex justify-center m-auto"
            />
            <button
                onClick={downloadQRCode}
                className="flex items-center w-3/4 justify-center mt-2 bg-orange-500 text-white rounded-md space-x-2 text-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium text-center me-2"
            >
                <PiDownloadSimpleDuotone size={20} /> <span className="space-x-3">Download</span>
            </button>
        </div>
    )
}

export default Generate
