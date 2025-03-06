import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

export const createProject = (projectData) => axios.post(API_URL, projectData);
export const updateProject = (projectId, projectData) => axios.put(`${API_URL}/${projectId}`, projectData);
export const deleteProject = (projectId) => axios.delete(`${API_URL}/${projectId}`);
export const getProjects = () => axios.get(API_URL);
