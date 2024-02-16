import React from 'react'
import Header from '../inc/Header'
// import Scann from '../components/Scann'
import QrScann from '../components/QrScann'

const ScannQrCode = () => {
  return (
    <div className="min-h-screen dark:bg-[#212936] dark:text-gray-300">
      <Header />
      <QrScann />
    </div>
  )
}

export default ScannQrCode