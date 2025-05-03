import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Create a Home component for the root path
import ProjectList from './components/projectManagement/ProjectList';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/usermanagement/Register';
import Login from './components/usermanagement/Login';
import About from './components/about';
import AddDonor from './components/DonorManagement/AddDonor';
import MockPurchase from './components/DonorManagement/MockPurchase';
import Donors from './components/DonorManagement/Donors';
import Profile from './components/usermanagement/Profile';
import Settings from './components/usermanagement/Settings';
import ViewGoals from './components/GoalManagement/ViewGoals';
import NotFound from './components/NotFound';

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
                   

                    {/* User routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />

                    {/* About page */}
                    <Route path="/about" element={<About />} />

                    {/* Donor management routes */}
                    <Route path="/donate/add" element={<AddDonor />} />
                    <Route path="/mock-purchase" element={<MockPurchase />} />
                    <Route path="/donors" element={<Donors />} />
                    <Route path="/viewGoals" element={<ViewGoals />} />
                    <Route path='*' element={<NotFound/>}/>

                    {/* Admin dashboard */}
                   
                </Routes>

                {/* Footer is displayed on all pages */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
