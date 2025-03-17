import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from './projectManagement/ProjectList';

const Home = () => {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-6">
            {/* Hero Section */}
            <div className="max-w-4xl">
                <h1 className="text-5xl font-bold text-green-800">Welcome to Green Pulse</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Your all-in-one Eco-System Project Management Solution. Plan, track, and collaborate efficiently.
                </p>
                <div className="mt-6 space-x-4">
                    <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition">
                        Get Started
                    </Link>
                    <Link to="/about" className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-green-100 transition">
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Project Planning</h2>
                    <p className="text-gray-600 mt-2">Plan and organize your projects efficiently.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Task Tracking</h2>
                    <p className="text-gray-600 mt-2">Monitor tasks and milestones with ease.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-green-800">Team Collaboration</h2>
                    <p className="text-gray-600 mt-2">Enhance teamwork with streamlined communication.</p>
                </div>
            </div>

            <section className="max-w-6xl mx-auto py-12 px-6">
                <h2 className="text-3xl font-bold text-green-800 text-center">Explore Our Projects</h2>
                <p className="text-gray-600 text-center mt-2">Discover our latest eco-friendly projects.</p>
                <ProjectList/>
            </section>
        </div>
    );
};

export default Home;