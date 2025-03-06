import React, { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import axios from 'axios';

const AdminDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreateProject = (projectData) => {
    axios.post('http://localhost:5000/api/projects', projectData)
      .then(response => {
        console.log('Project created', response.data);
        setSelectedProject(null);
      })
      .catch(error => console.log(error));
  };

  const handleUpdateProject = (projectData) => {
    axios.put(`http://localhost:5000/api/projects/${selectedProject._id}`, projectData)
      .then(response => {
        console.log('Project updated', response.data);
        setSelectedProject(null);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteProject = (projectId) => {
    axios.delete(`http://localhost:5000/api/projects/${projectId}`)
      .then(response => console.log('Project deleted', response.data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProjectForm
        project={selectedProject}
        onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
      />
      <ProjectList role="admin" onDelete={handleDeleteProject} />
    </div>
  );
};

export default AdminDashboard;
