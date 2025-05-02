import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Target, Settings2, Users, FileText, BarChart2 } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-green-600 to-blue-500 text-white p-4 fixed inset-0 z-50">
      <div className="flex items-center space-x-3 mb-10">
        <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center">
          <Home className="w-6 h-6" />
        </div>
        <span className="text-2xl font-bold">Admin Dashboard</span>
      </div>
      
      <nav className="space-y-6">
        <Link to="/admin" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Home className="w-6 h-6" />
          <span>Dashboard</span>
        </Link>

        <Link to="/adminGoal" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Target className="w-6 h-6" />
          <span>Goals</span>
        </Link>

        <Link to="/admin/users" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Users className="w-6 h-6" />
          <span>Users</span>
        </Link>

        <Link to="/addproject" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Settings2 className="w-6 h-6" />
          <span>Project</span>
        </Link>

        <Link to="/settings" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Settings2 className="w-6 h-6" />
          <span>Settings</span>
        </Link>
        <Link to="/donations" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Settings2 className="w-6 h-6" />
          <span>Donations</span>
        </Link>

        <Link to="/donationactions" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <Settings2 className="w-6 h-6" />
          <span>Refund Donations</span>
        </Link>

        {/* Analytics Dashboard Link */}
        <Link to="/analytics" className="flex items-center space-x-2 text-lg hover:bg-green-700 p-2 rounded">
          <BarChart2 className="w-6 h-6" />
          <span>Analytics</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
