import React, { useState, useEffect } from 'react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        console.log("Updated projects:", projects);
    }, [projects]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            console.log("Fetched data:", data);

            if (data.data && Array.isArray(data.data)) {
                setProjects(data.data);
            } else {
                console.error("Unexpected data format:", data);
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Project List</h2>
                
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold text-green-600">{project.name}</h3>
                                <p className="text-gray-700 mt-2">{project.description}</p>
                                <p className="mt-4 text-sm text-gray-500">Status: <span className="font-medium text-green-500">{project.status}</span></p>
                                <p className="mt-1 text-sm text-gray-500">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
                            </div>
                            
                        ))}
                        
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg mt-10">No projects found</p>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
