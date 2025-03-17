import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goals, setGoals] = useState('');
    const [status, setStatus] = useState('Not Started');

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/project/${id}`);
            const project = response.data;
            setName(project.name);
            setType(project.type);
            setDescription(project.description);
            setStartDate(project.startDate.split('T')[0]);
            setEndDate(project.endDate.split('T')[0]);
            setGoals(project.goals.join(', '));
            setStatus(project.status);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

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
            await axios.put(`http://localhost:5000/api/projects/project/${id}`, projectData);
            navigate('/projects'); // Navigate to project list after update
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Edit Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type:</label>
                        <input 
                            type="text" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Goals (comma-separated):</label>
                        <input 
                            type="text" 
                            value={goals} 
                            onChange={(e) => setGoals(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status:</label>
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
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
                    >
                        Update Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProject;
