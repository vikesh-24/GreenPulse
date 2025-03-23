import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch goals from the backend API
        const fetchGoals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/goals/getgoal');
                if (!response.ok) {
                    throw new Error('Failed to fetch goals');
                }
                const data = await response.json();
                setGoals(data.data); // Assuming `data.data` holds the list of goals
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, []); // Empty dependency array means this effect runs once after initial render

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">View Goals</h2>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : goals.length === 0 ? (
                    <div className="text-center">No goals available</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 border">Goal Type</th>
                                    <th className="px-4 py-2 border">Target Value</th>
                                    <th className="px-4 py-2 border">Current Value</th>
                                    <th className="px-4 py-2 border">Start Date</th>
                                    <th className="px-4 py-2 border">End Date</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {goals.map((goal) => (
                                    <tr key={goal._id}>
                                        <td className="px-4 py-2 border">{goal.goalType}</td>
                                        <td className="px-4 py-2 border">{goal.targetValue}</td>
                                        <td className="px-4 py-2 border">{goal.currentValue}</td>
                                        <td className="px-4 py-2 border">{new Date(goal.startDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 border">{new Date(goal.endDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 border">{goal.status}</td>
                                        
                                            
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewGoals;
