import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from './projectManagement/ProjectList';
import heroBgVideo from '../assets/eco.mp4'; 
import { FaLeaf, FaTasks, FaUsers, FaHandHoldingHeart, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center text-center p-6 relative w-full overflow-hidden">
            {/* Hero Section with Video Background */}
            <div 
                className="relative h-screen flex items-center justify-center bg-cover bg-center w-full transform transition-all duration-700 hover:scale-105 rounded-lg overflow-hidden" 
            >
                {/* Background video */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={heroBgVideo} type="video/mp4" />
                </video>

                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 transition-all duration-500"></div>

                {/* Content with animation */}
                <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in">
                    <h1 className="text-6xl font-bold text-white mb-6 transform transition-all duration-500 hover:scale-105">
                        Welcome to <span className="text-green-400">Green Pulse</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-100 leading-relaxed">
                        Your all-in-one Eco-System Project Management Solution. Plan, track, and collaborate efficiently.
                    </p>
                    <div className="mt-8 space-x-4">
                        <Link 
                            to="/register" 
                            className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                            Get Started
                        </Link>
                        <Link 
                            to="/about" 
                            className="bg-white/10 backdrop-blur-sm text-white border border-white px-8 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Donation Section */}
            <div className="mt-10 bg-gradient-to-r from-green-400 to-green-600 shadow-lg hover:shadow-2xl max-w-2xl min-h-32 flex flex-col gap-5 rounded-lg items-center justify-center p-8 transform transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center justify-center">
                    <FaHandHoldingHeart className="text-white text-4xl mb-4" />
                    <h1 className="font-serif text-3xl text-white">Be A Contributor By Donating</h1>
                    <Link to="/donate/add">
                        <button className="bg-white text-green-600 border border-white px-8 py-4 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 mt-6 text-lg font-semibold">
                            Donate Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <FaLeaf className="text-green-600 text-4xl mx-auto mb-4 transition-transform duration-300 transform hover:scale-110" />
                    <h2 className="text-2xl font-bold text-green-800">Project Planning</h2>
                    <p className="text-gray-600 mt-4 leading-relaxed">Plan and organize your projects efficiently with our intuitive tools.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <FaTasks className="text-green-600 text-4xl mx-auto mb-4 transition-transform duration-300 transform hover:scale-110" />
                    <h2 className="text-2xl font-bold text-green-800">Task Tracking</h2>
                    <p className="text-gray-600 mt-4 leading-relaxed">Monitor tasks and milestones with ease and precision.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <FaUsers className="text-green-600 text-4xl mx-auto mb-4 transition-transform duration-300 transform hover:scale-110" />
                    <h2 className="text-2xl font-bold text-green-800">Team Collaboration</h2>
                    <p className="text-gray-600 mt-4 leading-relaxed">Enhance teamwork with streamlined communication tools.</p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-16 bg-green-50 py-16 w-full">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-green-800 text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                            <FaQuoteLeft className="text-green-400 text-3xl mb-4" />
                            <p className="text-gray-600 italic mb-4">"Green Pulse has transformed how we manage our environmental projects. The platform is intuitive and powerful."</p>
                            <p className="font-semibold text-green-800">- Sarah Johnson, Project Manager</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                            <FaQuoteLeft className="text-green-400 text-3xl mb-4" />
                            <p className="text-gray-600 italic mb-4">"The collaboration features have made it so much easier to work with our team across different locations."</p>
                            <p className="font-semibold text-green-800">- Michael Chen, Team Lead</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project List Section */}
            <section className="max-w-6xl mx-auto py-16 px-6 w-full">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-4">Explore Our Projects</h2>
                <p className="text-gray-600 text-center text-lg mb-12">Discover our latest eco-friendly projects and initiatives</p>
                <ProjectList />
            </section>
        </div>
    );
};

export default Home;
