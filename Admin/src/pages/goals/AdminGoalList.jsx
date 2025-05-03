import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
    Target, 
    Plus, 
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const printRef = useRef();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/goals/getgoal");
      if (response.data.data && Array.isArray(response.data.data)) {
        setGoals(response.data.data);
      } else {
        setGoals([]);
      }
    } catch (error) {
      setError("Failed to load goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editGoal/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await axios.delete(`http://localhost:5000/api/goals/delete/${id}`);
        setGoals(goals.filter((goal) => goal._id !== id));
        setSuccessMessage("Goal deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        setError("Failed to delete goal. Please try again.");
      }
    }
  };

  // Search filter
  const filteredGoals = goals.filter(goal =>
    goal.goalType.toLowerCase().includes(searchQuery.toLowerCase())
    || (goal.status && goal.status.toLowerCase().includes(searchQuery.toLowerCase()))
    || (goal.targetValue && goal.targetValue.toString().includes(searchQuery))
    || (goal.currentValue && goal.currentValue.toString().includes(searchQuery))
  );

  // PDF download handler
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4"
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("goals-table.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Goal Management
            </h2>
            <p className="text-gray-600 mt-2">Track and manage your goals</p>
          </div>
          <button
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            onClick={() => navigate("/addGoal")}
          >
            <Plus className="w-5 h-5" />
            <span>Add Goal</span>
          </button>
        </div>

        {/* Search and PDF Download */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search goals..."
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 md:mb-0"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleDownloadPDF}
            className="ml-0 md:ml-4 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            Download PDF
          </button>
        </div>

        {/* Hidden Table for PDF Export */}
        <div ref={printRef} style={{ position: "absolute", left: "-9999px" }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-green-500 to-blue-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Goal Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Target Value</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredGoals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No goals found.</td>
                </tr>
              ) : (
                filteredGoals.map(goal => (
                  <tr key={goal._id}>
                    <td className="px-6 py-4">{goal.goalType}</td>
                    <td className="px-6 py-4">{goal.targetValue}</td>
                    <td className="px-6 py-4">{goal.currentValue}</td>
                    <td className="px-6 py-4">{new Date(goal.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(goal.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{goal.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

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
        ) : filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map((goal) => (
              <div
                key={goal._id}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100"
              >
                {/* Goal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{goal.goalType}</h3>
                      <p className="text-sm text-gray-500">ID: {goal._id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal._id)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Edit Goal"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal._id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Goal Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">Target: {goal.targetValue}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BarChart2 className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">Current: {goal.currentValue}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    <span className="text-sm">
                      Start: {new Date(goal.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-pink-500" />
                    <span className="text-sm">
                      End: {new Date(goal.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Goal Status */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Status</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : goal.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Goals Found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first goal</p>
              <button
                onClick={() => navigate("/addGoal")}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Add Goal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewGoals;
