import React from 'react';

import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>

                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/projectManagement">Project Management</Link></li>
                    </ul>
                </nav>

            <h2>Welcome to the Home Page</h2>
            <p>This is the home page of the Project Management System.</p>
      
        </div>
    );
};

export default Home;