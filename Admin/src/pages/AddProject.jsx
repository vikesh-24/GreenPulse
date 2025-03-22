import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddProject = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [goals, setGoals] = useState('');
    const [status, setStatus] = useState('Not Started');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                name,
                type,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                goals: goals.split(',').map(goal => goal.trim()),
                status
            };

            const response = await fetch('http://localhost:5000/api/projects/addproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                throw new Error('Failed to add project');
            }

            const data = await response.json();
            console.log('Project added:', data);

            // Clear the form
            setName('');
            setType('');
            setDescription('');
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate('');
            setGoals('');
            setStatus('Not Started');

            navigate('/');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (

       
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Add Project</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Type:</label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full h-12 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-24 px-4 py-3 border rounded-md text-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        ></textarea>
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
                        <label className="block text-lg font-medium text-gray-700">Goals (comma-separated):</label>
                        <input
                            type="text"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
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
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
                        onClick={navigate('/adminprojectlist')}
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
