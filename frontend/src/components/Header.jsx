import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="mx-auto w-full max-w-[340px]  sm:max-w-[500px] md:max-w-[740px] lg:max-w-[900px] xl:max-w-[1320px] py-2 bg-gradient-to-r from-green-800 to-green-300 text-white  px-4 shadow-lg sticky top-2 z-50 rounded-full">
            <div className="max-w-6xl mx-auto flex justify-between items-center relative">
                <h1 className="text-xl font-bold">GREEN PULSE</h1>
                
                {/* Hamburger Menu for Mobile */}
                <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
                
                <nav className={`md:flex space-x-4 items-center ${menuOpen ? 'block' : 'hidden'} absolute md:relative top-14 md:top-0 left-0 md:left-auto w-full md:w-auto bg-green-800 md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-full md:rounded-none` }>
                    <ul className="md:flex md:space-x-4 items-center">
                        <li>
                            <Link to="/" className="block py-1 md:py-0 hover:text-gray-200 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/projectManagement/list" className="block py-1 md:py-0 hover:text-gray-200 transition">Projects</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-1 md:py-0 hover:text-gray-200 transition">About</Link>
                        </li>
                        <li className="relative">
                            <button 
                                className="hover:text-gray-200 transition focus:outline-none px-3 py-1 bg-white text-green-800 rounded-full shadow-md hover:bg-gray-100"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Profile ▼
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-xl rounded-lg overflow-hidden border border-gray-200">
                                    <li className="border-b border-gray-300">
                                        <Link to="/login" className="block px-4 py-2 hover:bg-green-100 transition">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="block px-4 py-2 hover:bg-green-100 transition">Register</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
