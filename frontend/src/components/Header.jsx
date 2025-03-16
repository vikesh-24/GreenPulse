import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-green-800 to-green-300 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">GREEN PULSE</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/projects" className="hover:text-gray-200 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/addproject" className="hover:text-gray-200 transition">Projects</Link>
                        </li>
                        <li>
                            <Link to="/addproject" className="hover:text-gray-200 transition">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
