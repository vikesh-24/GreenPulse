import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock4,
  X
} from 'lucide-react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:5000/api/projects/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();

            if (data.data && Array.isArray(data.data)) {
                setProjects(data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to load projects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'in progress':
                return <Clock4 className="w-5 h-5 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in progress':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewDetails = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our ongoing and completed eco-friendly initiatives
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-xl p-6">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-red-600 text-lg">{error}</p>
                        <button
                            onClick={fetchProjects}
                            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div 
                                key={project._id} 
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                            {project.name}
                                        </h3>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)}
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="space-y-3 border-t border-gray-100 pt-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2 text-green-500" />
                                            <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2 text-green-500" />
                                            <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleViewDetails(project)}
                                        className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors group"
                                    >
                                        View Details
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
                        <p className="text-gray-600">There are currently no projects available.</p>
                    </div>
                )}

                {/* Project Details Modal */}
                {isModalOpen && selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-xl ${getStatusColor(selectedProject.status)}`}>
                                            {getStatusIcon(selectedProject.status)}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                                        <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Project Timeline</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                                                        <span>Start Date: {new Date(selectedProject.startDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar className="w-5 h-5 mr-2 text-green-500" />
                                                        <span>End Date: {new Date(selectedProject.endDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Project Status</h4>
                                                <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStatusColor(selectedProject.status)}`}>
                                                    {getStatusIcon(selectedProject.status)}
                                                    <span className="ml-2 font-medium">{selectedProject.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedProject.location && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Location</h4>
                                            <p className="text-gray-600">{selectedProject.location}</p>
                                        </div>
                                    )}

                                    {selectedProject.team && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Team Members</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.team.map((member, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                                                    >
                                                        {member}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
