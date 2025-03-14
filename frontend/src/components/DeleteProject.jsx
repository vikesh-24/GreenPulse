import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteProject = () => {
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/projects/delete/${id}`);
            console.log('Project deleted:', response.data);
            // Redirect or update the project list after deletion
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div>
            <h2>Delete Project</h2>
            <p>Are you sure you want to delete this project?</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteProject;