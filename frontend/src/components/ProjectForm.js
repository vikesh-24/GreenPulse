import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectForm = ({ project, onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goals, setGoals] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setType(project.type);
      setDescription(project.description);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setGoals(project.goals);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { name, type, description, startDate, endDate, goals };
    onSubmit(newProject);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Project Type</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter project type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Goals</label>
        <textarea
          className="form-control"
          placeholder="Enter project goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {project ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
