import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

const ProjectList = ({ role, onDelete }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {projects
        .filter(project => role === 'admin' || project.status !== 'completed')
        .map((project) => (
          <ProjectCard key={project._id} project={project} onDelete={onDelete} />
        ))}
    </div>
  );
};

export default ProjectList;
