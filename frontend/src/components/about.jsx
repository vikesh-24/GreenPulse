import React from "react";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Target, 
  BarChart3, 
  Users, 
  Globe, 
  Rocket, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-green-300/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">Green Pulse</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Green Pulse is a powerful ecosystem project management platform
            designed to help teams manage and execute eco-friendly projects with
            efficiency and sustainability at its core.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Planning</h3>
            <p className="text-gray-600 leading-relaxed">
              We provide tools for planning and executing environmentally
              friendly projects with precision and care.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency & Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Track project progress with real-time analytics and transparent
              reporting for complete visibility.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Engagement</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with like-minded individuals and collaborate on
              sustainability-driven initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-700 to-green-600 p-8 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-100 text-lg leading-relaxed">
              To empower organizations and individuals with tools that promote
              sustainable project execution while ensuring maximum efficiency and
              productivity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-800 to-green-700 p-8 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-gray-100 text-lg leading-relaxed">
              A world where eco-friendly project management is the standard, not
              the exception, and sustainability is at the heart of every project.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of eco-conscious project managers and start making an impact today.
          </p>
          <Link
            to="/projectManagement/list"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Projects
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
