import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'; // Create a Home component for the root path
import ProjectList from './components/projectManagement/ProjectList';
import AddProject from './components/projectManagement/AddProject';
import EditProject from './components/projectManagement/EditProject';
import DeleteProject from './components/projectManagement/DeleteProject';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <div>
               
            <Header /> 

                <Routes>
                    {/* Root path for the home page */}
                    <Route path="/" element={<Home />} />

                    {/* Project management routes */}
                    <Route path="/projectManagement/list" element={<ProjectList />} />
                    <Route path="/projectManagement/add" element={<AddProject />} />
                    <Route path="/projectManagement/edit/:id" element={<EditProject />} />
                    <Route path="/projectManagement/delete/:id" element={<DeleteProject />} />
                </Routes>


             <Footer/>   
            </div>
        </Router>
    );
};

export default App;