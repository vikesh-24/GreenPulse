import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    responsible_member: '',
  });

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', deadline: '', responsible_member: '' });
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const handleComplete = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch((error) => console.error('Error marking task complete:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Eco Club Project Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="responsible_member"
          value={newTask.responsible_member}
          onChange={handleChange}
          placeholder="Responsible Member"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Responsible: {task.responsible_member}</p>
            <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
            <button onClick={() => handleComplete(task._id)}>Complete Task</button>
            <button onClick={() => handleDelete(task._id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
