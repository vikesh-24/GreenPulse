import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from './AdminSidebar'; // Sidebar Import
import { 
    Target, 
    Edit2, 
    Trash2, 
    Loader2,
    CheckCircle2,
    XCircle,
    Calendar,
    TrendingUp,
    BarChart2,
    Clock,
    Sparkles
} from 'lucide-react';

const AdminGoalDashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/goals/getgoal");
      console.log("Fetched goals:", response.data);

      if (response.data.data && Array.isArray(response.data.data)) {
        setGoals(response.data.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setGoals([]);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      setError("Failed to load goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculating the total completed and in-progress goals
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress').length;
  const totalGoals = goals.length;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-gray-600 mt-2">Overview of your project goals</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Total Goals</h3>
                    <p className="text-2xl font-bold text-gray-700">{totalGoals}</p>
                  </div>
                  <Target className="w-12 h-12 text-blue-500" />
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Completed Goals</h3>
                    <p className="text-2xl font-bold text-green-600">{completedGoals}</p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">In Progress</h3>
                    <p className="text-2xl font-bold text-blue-600">{inProgressGoals}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-blue-500" />
                </div>
              </div>

              {/* Goal Progress Visualization */}
              <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Goal Completion Analysis</h3>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex flex-col items-center">
                    <BarChart2 className="w-8 h-8 text-purple-500 mb-2" />
                    <span className="text-gray-700">Goals Progress</span>
                  </div>
                  <div className="w-full">
                    <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500" style={{ width: `${(completedGoals / totalGoals) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>


            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGoalDashboard;
