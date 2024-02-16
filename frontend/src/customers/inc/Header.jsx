import React, { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { IoMenuSharp } from 'react-icons/io5'
import { MdLightMode } from 'react-icons/md'

const Header = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const themeColor = theme === "dark" ? "light" : "dark";
    const darken = theme === "dark" ? true : false;

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(themeColor);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [themeColor, theme])

    const toggleLight = () => {
        const root = window.document.documentElement;
        root.classList.remove(themeColor);
        root.classList.add(theme);
        setTheme(themeColor)
    }

    
  return (
    <div className="sticky top-0 z-50 text-gray-900 dark:text-blue-500">
        <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-[#212936]">
            <div className="px-6 w-full flex flex-wrap items-center justify-center">
                <div className="grow flex justify-between items-center p-2"> 
                <button className="text-blue-600">
                    <IoMenuSharp size={36} />
                </button>

                    <div className="flex justify-center items-center space-x-5">
                        {darken ? (
                            <MdLightMode 
                                onClick={toggleLight} 
                                className="cursor-pointer" 
                                size={25}
                            />
                        ) : 
                        (
                            <FaMoon 
                                onClick={toggleLight} 
                                className="corso-pointer" 
                                size={25} 
                            />

                        )}
                        <button className="hidden px-4 py-2.5 bg-blue-600 font-medium text-sm text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
                        hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
                        dark:bg-transparent dark:shadow-transparent md:block">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header