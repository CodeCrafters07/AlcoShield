import { Link } from "react-router-dom";
import QrCodeImage from "../../assets/scanqrcode.png";
const Banner = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-center">
        <img src={QrCodeImage} alt="qrcode" width={100} className="dark:bg-gray-400 w-36 md:w-56 rounded mb-8 mt-16"/>

        <h2 className="flex justify-center mx-auto font-semibold text-2xl md:text-3xl mb-5 ">
            Wine QrCode Verification
        </h2>
        <p className="text-lg mb-2">1. Avoid light reflections or shadows on the code</p>
        <p className="text-lg mb-2">2. Make your phone face the code without tilting</p>

        <div className="flex flex-col justify-start items-center mt-8 space-x-3">
            
                <Link to="/customer/scann" className="px-6 py-2.5 bg-blue-600 font-medium text-base text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
                    hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
                    dark:bg-transparent dark:shadow-transparent md:text-1xl lg:text-2xl md:px-16">
                    Start Scanning
                </Link>
        </div>
    </div>
  )
}

export default Banner