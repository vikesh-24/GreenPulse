import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Calendar, 
  Target, 
  FileText, 
  ListChecks,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const AddProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        status: 'Not Started'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation for end date must be after start date
        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            setError('End date must be after the start date.');
            setLoading(false);
            return;
        }

        // Validation for description length
        if (formData.description.length < 10 || formData.description.length > 20) {
            setError('Description must be between 10 and 20 characters.');
            setLoading(false);
            return;
        }

        try {
            const projectData = {
                ...formData,
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate),
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

            setSuccess(true);
            setTimeout(() => {
                navigate('/adminprojectlist');
            }, 1500);
        } catch (error) {
            console.error('Error adding project:', error);
            setError('Failed to add project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Add New Project
                    </h2>
                </div>

                {/* Add Goal Button */}
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        onClick={() => navigate('/addGoal')}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add a Goal
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                        <p className="text-green-700">Project added successfully!</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                        <XCircle className="w-5 h-5 text-red-500 mr-3" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Project Name */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Project Name
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                                    placeholder="Enter project name"
                                />
                            </div>
                        </div>

                        {/* Project Type */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Project Type
                            </label>
                            <div className="relative">
                                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                                    placeholder="Enter project type"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                                placeholder="Enter project description"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
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
                            disabled={loading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                "Add Project"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
