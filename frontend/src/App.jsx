import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Create a Home component for the root path
import ProjectList from './components/projectManagement/ProjectList';
import AddProject from './components/projectManagement/AddProject';
import EditProject from './components/projectManagement/EditProject';
import DeleteProject from './components/projectManagement/DeleteProject';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/usermanagement/Register';
import Login from './components/usermanagement/Login';
import About from './components/about';
import AddDonor from './components/DonorManagement/AddDonor';
import MockPurchase from './components/DonorManagement/MockPurchase';
import Donors from './components/DonorManagement/Donors';
import AdminDashboard from './components/Admin/Admindashboard';
import Profile from './components/usermanagement/Profile';

const App = () => {
    return (
        <Router>
            <div>
                {/* Header is displayed on all pages */}
                <Header />

                {/* Main Routes */}
                <Routes>
                    {/* Root path for the home page */}
                    <Route path="/" element={<Home />} />

                    {/* Project management routes */}
                    <Route path="/projectManagement/list" element={<ProjectList />} />
                    <Route path="/projectManagement/add" element={<AddProject />} />
                    <Route path="/projectManagement/edit/:id" element={<EditProject />} />
                    <Route path="/projectManagement/delete/:id" element={<DeleteProject />} />

                    {/* User routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* About page */}
                    <Route path="/about" element={<About />} />

                    {/* Donor management routes */}
                    <Route path="/donate/add" element={<AddDonor />} />
                    <Route path="/mock-purchase" element={<MockPurchase />} />
                    <Route path="/donors" element={<Donors />} />

                    {/* Admin dashboard */}
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>

                {/* Footer is displayed on all pages */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
