import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: '',
        type: '',
        description: '',
        startDate: '',
        endDate: '',
        goals: '',
        status: 'Not Started',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/project/${id}`);
            const data = response.data.data;

            setProject({
                ...data,
                startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
                endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
                goals: Array.isArray(data.goals) ? data.goals.join(', ') : '',
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching project:', error);
            setError('Failed to fetch project details. Please try again later.');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                ...project,
                startDate: project.startDate ? new Date(project.startDate) : null,
                endDate: project.endDate ? new Date(project.endDate) : null,
                goals: project.goals ? project.goals.split(',').map(goal => goal.trim()) : [],
            };

            await axios.put(`http://localhost:5000/api/projects/project/${id}`, projectData);
            navigate('/adminprojectlist');
        } catch (error) {
            console.error('Error updating project:', error);
            setError('Failed to update project. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    if (loading) {
        return <div className="min-h-screen bg-green-50 flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-700">{error}</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Edit Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={project.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={project.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={project.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Goals (comma-separated):</label>
                        <input
                            type="text"
                            name="goals"
                            value={project.goals}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status:</label>
                        <select
                            name="status"
                            value={project.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
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
