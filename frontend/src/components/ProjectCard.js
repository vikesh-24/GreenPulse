import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.type}</p>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <p>Goals: {project.goals}</p>
      <Link to={`/projects/edit/${project._id}`}>Edit</Link>
      <button onClick={() => onDelete(project._id)}>Delete</button>
    </div>
  );
};

export default ProjectCard;
