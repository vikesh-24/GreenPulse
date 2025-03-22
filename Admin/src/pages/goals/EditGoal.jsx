import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditGoal = () => {
    const [goalType, setGoalType] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('not-started');
    const { id } = useParams(); // Get the goal ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the goal data to pre-fill the form
        const fetchGoal = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/goals/getgoal/${id}`);
                const data = await response.json();
                if (response.ok) {
                    const goal = data.data;
                    setGoalType(goal.goalType);
                    setTargetValue(goal.targetValue);
                    setCurrentValue(goal.currentValue);
                    setStartDate(new Date(goal.startDate).toISOString().split('T')[0]);
                    setEndDate(new Date(goal.endDate).toISOString().split('T')[0]);
                    setStatus(goal.status);
                } else {
                    alert('Goal not found');
                }
            } catch (error) {
                console.error('Error fetching goal data:', error);
                alert('Error fetching goal data');
            }
        };

        fetchGoal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGoal = {
            goalType,
            targetValue,
            currentValue,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status
        };

        try {
            const response = await fetch(`http://localhost:5000/api/goals/putgoal/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGoal),
            });

            if (!response.ok) {
                throw new Error('Failed to update goal');
            }

            const data = await response.json();
            console.log('Goal updated:', data);
            navigate('/adminGoal'); // Redirect to the goals list after successful update
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Edit Goal</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Goal Type:</label>
                        <input
                            type="text"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Target Value:</label>
                        <input
                            type="number"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Current Value:</label>
                        <input
                            type="number"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
                    >
                        Update Goal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditGoal;
