import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGoal = () => {
    const [goalType, setGoalType] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0); // Track current value
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('not-started');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to send to backend
        const goalData = {
            goalType,
            targetValue,
            currentValue, // Include current value here
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status
        };

        console.log("Goal data being sent to backend:", goalData); // Log goal data

        try {
            // Send POST request to the backend
            const response = await fetch('http://localhost:5000/api/goals/addgoal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goalData)
            });

            if (!response.ok) {
                throw new Error('Failed to add goal');
            }

            const data = await response.json();
            console.log('Goal added:', data);

            // Reset form after submission
            setGoalType('');
            setTargetValue('');
            setCurrentValue(0); // Reset current value
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate('');
            setStatus('not-started');

            // Navigate to goals list after successful submission
            navigate('/adminGoal');
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Add Goal</h2>
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
                        Add Goal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddGoal;
