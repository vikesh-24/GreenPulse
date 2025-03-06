import React from 'react';
import ProjectList from '../components/ProjectList';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ProjectList role="user" />
    </div>
  );
};

export default UserDashboard;
