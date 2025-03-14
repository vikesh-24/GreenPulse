import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [goals, setGoals] = useState('');
    const [status, setStatus] = useState('Not Started');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                name,
                type,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                goals: goals.split(',').map(goal => goal.trim()), // Convert comma-separated string to array
                status
            };
            const response = await axios.post('/api/projects/addproject', projectData);
            console.log('Project added:', response.data);
            // Clear the form
            setName('');
            setType('');
            setDescription('');
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate('');
            setGoals('');
            setStatus('Not Started');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div>
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <div>
                    <label>Goals (comma-separated):</label>
                    <input type="text" value={goals} onChange={(e) => setGoals(e.target.value)} required />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
                <button type="submit">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;