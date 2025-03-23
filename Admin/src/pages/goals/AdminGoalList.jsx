import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
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
      } catch (error) {
        console.error("Error deleting goal:", error);
        alert("Failed to delete goal. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Goal List</h2>
          <button
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => {
              navigate("/addGoal");
            }}
          >
            ➕ Add Goal
          </button>
        </div>

        {goals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-green-600">{goal.goalType}</h3>
                <p className="text-gray-700 mt-2">Target Value: {goal.targetValue}</p>
                <p className="text-gray-700 mt-2">Current Value: {goal.currentValue}</p>
                <p className="mt-4 text-sm text-gray-500">
                  Status: <span className="font-medium text-green-500">{goal.status}</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Start Date: {new Date(goal.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  End Date: {new Date(goal.endDate).toLocaleDateString()}
                </p>

                {/* Buttons Section */}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(goal._id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">No goals found</p>
        )}
      </div>
    </div>
  );
};

export default ViewGoals;
