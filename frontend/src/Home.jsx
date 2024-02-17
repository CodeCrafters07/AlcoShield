import React from 'react';
import HomeImg from "./assets/home.png"
import { Link } from 'react-router-dom';

const SysHomePage = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-8">
          <img
            className="h-64 md:h-[400px] lg:h-[480px] w-full object-cover rounded-lg shadow-md"
            src={HomeImg}
            alt="Slideshow"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manufacturer Login</h2>
            <p className="text-gray-700 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Link to="/manufacturer/login" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-300 font-bold py-2 px-4 rounded">
              Go to Manufacturer Login
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SysOwner Login</h2>
            <p className="text-gray-700 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Link to="/Sys/Auth" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-300 font-bold py-2 px-4 rounded">
              Go to SysOwner Login
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Homepage</h2>
            <p className="text-gray-700 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Link to="/customer" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-300 font-bold py-2 px-4 rounded">
              Go to Customer Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SysHomePage;
