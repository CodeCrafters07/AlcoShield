import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import ViewFakeProduct from "./manufacturers/pages/ViewFakeProduct"
import ViewQrCodes from "./manufacturers/pages/ViewQrCodes"
import LoginManufacturer from "./manufacturers/pages/auth/LoginManufacturer"
import RegisterManufacturer from "./sysOwner/pages/RegisterManufacturer"
import GenerateQrCode from "./manufacturers/pages/GenerateQrCode"
import ScannQrCode from "./customers/pages/ScannQrCode"
import RegisterRetailers from "./manufacturers/pages/Retailers"
import AddRetailers from "./manufacturers/pages/RegisterRetailer"
import CustomerHome from "./customers/pages/Home"
import Dashboard from "./manufacturers/pages/Dashboard"
import AddProduct from "./manufacturers/pages/AddProduct"
import Home from "./Home"
import SysOwnerLogin from "./sysOwner/pages/auth/SysOwnerLogin"
import SysOwnerDashboard from "./sysOwner/pages/SysOwnerDashboard"

const App = () => {
    return (
        <Router>
            <Routes>
                {/* System Home Page */}
                <Route path="/" element={<Home />} />

                {/* System Login Authentication */}
                <Route path="/sys/auth" element={<SysOwnerLogin />} />

                {/* System Owner Dashboard */}
                <Route path="/sys/dashboard" element={<SysOwnerDashboard />} />
                <Route path="/sys/register" element={<RegisterManufacturer />} />

                {/* Manufacturer Dashboard */}
                <Route path="/manufacturer/dashboard" element={<Dashboard />} />
                <Route path="/manufacturer/fake-product" element={<ViewFakeProduct />} />
                <Route path="/manufacturer/qrcodes" element={<ViewQrCodes />} />
                <Route path="/manufacturer/generate-qrcode" element={<GenerateQrCode />} />
                <Route path="/manufacturer/retailers" element={<RegisterRetailers />} />
                <Route path="/manufacturer/add-retailer" element={<AddRetailers />} />
                <Route path="/manufacturer/add-product" element={<AddProduct />} />

                {/* Manufacturer Auth */}
                <Route path="/manufacturer/login" element={<LoginManufacturer />} />

                {/* costumer */}
                <Route path="/customer" element={<CustomerHome />} />
                <Route path="/customer/scann" element={<ScannQrCode />} />
            </Routes>
        </Router>
    )
}

export default App
