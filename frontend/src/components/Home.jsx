import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectList from './projectManagement/ProjectList';
import Header from './Header';
import heroBgVideo from '../assets/eco.mp4';
import { FaLeaf, FaTasks, FaUsers, FaHandHoldingHeart, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Header />
            
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center bg-cover bg-center w-full overflow-hidden">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={heroBgVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
                <div className={`relative z-10 text-center max-w-4xl px-4 transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 transform transition-all duration-500 hover:scale-105">
                        Welcome to <span className="text-green-400 animate-pulse">Green Pulse</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-100 leading-relaxed transform transition-all duration-700 delay-200">
                        Your all-in-one Eco-System Project Management Solution. Plan, track, and collaborate efficiently.
                    </p>
                    <div className="mt-8 space-x-4 transform transition-all duration-700 delay-300">
                        <Link 
                            to="/register" 
                            className="inline-block bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-subtle"
                        >
                            Get Started
                        </Link>
                        <Link 
                            to="/about" 
                            className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white px-8 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Rest of the content */}
            <div className="pt-16">
                {/* Donation Section */}
                <div className={`mt-10 bg-gradient-to-r from-green-400 to-green-600 shadow-lg hover:shadow-2xl max-w-2xl mx-auto min-h-32 flex flex-col gap-5 rounded-lg items-center justify-center p-8 transform transition-all duration-300 hover:scale-105 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <FaHandHoldingHeart className="text-white text-4xl mb-4 animate-bounce" />
                    <h1 className="font-serif text-3xl text-white text-center transform transition-all duration-500 hover:scale-105">
                        Be A Contributor By Donating
                    </h1>
                    <Link to="/donate/add">
                        <button className="bg-white text-green-600 border border-white px-8 py-4 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 mt-6 text-lg font-semibold animate-pulse-subtle">
                            Donate Now
                        </button>
                    </Link>
                </div>

                {/* Features Section */}
                <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group animate-fade-in">
                        <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors transform group-hover:rotate-12">
                            <FaLeaf className="text-green-600 text-2xl transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800 text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Project Planning
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Plan and organize your projects efficiently with our intuitive tools.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group animate-fade-in delay-200">
                        <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors transform group-hover:rotate-12">
                            <FaTasks className="text-green-600 text-2xl transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800 text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Task Tracking
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Monitor tasks and milestones with ease and precision.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group animate-fade-in delay-400">
                        <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors transform group-hover:rotate-12">
                            <FaUsers className="text-green-600 text-2xl transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800 text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Team Collaboration
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed text-center transform transition-all duration-300 group-hover:translate-y-1">
                            Enhance teamwork with streamlined communication tools.
                        </p>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className={`mt-16 bg-green-50 py-16 w-full transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-green-800 text-center mb-12 transform transition-all duration-500 hover:scale-105">
                            What Our Users Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 animate-slide-in-left">
                                <FaQuoteLeft className="text-green-400 text-3xl mb-4 transform transition-transform duration-300 hover:rotate-12" />
                                <p className="text-gray-600 italic mb-4 transform transition-all duration-300 hover:translate-y-1">
                                    "Green Pulse has transformed how we manage our environmental projects. The platform is intuitive and powerful."
                                </p>
                                <p className="font-semibold text-green-800 transform transition-all duration-300 hover:translate-y-1">
                                    - Sarah Johnson, Project Manager
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 animate-slide-in-right">
                                <FaQuoteLeft className="text-green-400 text-3xl mb-4 transform transition-transform duration-300 hover:rotate-12" />
                                <p className="text-gray-600 italic mb-4 transform transition-all duration-300 hover:translate-y-1">
                                    "The collaboration features have made it so much easier to work with our team across different locations."
                                </p>
                                <p className="font-semibold text-green-800 transform transition-all duration-300 hover:translate-y-1">
                                    - Michael Chen, Team Lead
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project List Section */}
                <section className={`max-w-6xl mx-auto py-16 px-6 w-full transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                    <h2 className="text-4xl font-bold text-green-800 text-center mb-4 transform transition-all duration-500 hover:scale-105">
                        Explore Our Projects
                    </h2>
                    <p className="text-gray-600 text-center text-lg mb-12 transform transition-all duration-500 hover:translate-y-1">
                        Discover our latest eco-friendly projects and initiatives
                    </p>
                    <ProjectList />
                </section>
            </div>
        </div>
    );
};

export default Home;
