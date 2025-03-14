import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'; // Create a Home component for the root path
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import DeleteProject from './components/DeleteProject';

const App = () => {
    return (
        <Router>
            <div>
               
                <h1>Project Management System</h1>

                <Routes>
                    {/* Root path for the home page */}
                    <Route path="/Home" element={<Home />} />

                    {/* Project management routes */}
                    <Route path="/" element={<ProjectList />} />
                    <Route path="/projectManagement/add" element={<AddProject />} />
                    <Route path="/projectManagement/edit/:id" element={<EditProject />} />
                    <Route path="/projectManagement/delete/:id" element={<DeleteProject />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;