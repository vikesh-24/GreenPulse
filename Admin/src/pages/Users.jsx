import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BadgeX, 
  Users2, 
  UserPlus, 
  Edit2, 
  Search, 
  Loader2,
  CheckCircle2,
  XCircle,
  Shield,
  Mail,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

function Users() {
    const [userData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/users/allusers");
                setUsersData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                const response = await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
                if (response.status === 200) {
                    setUsersData((prevUsers) => prevUsers.filter((user) => user._id !== id));
                    setSuccessMessage("User deleted successfully!");
                    setTimeout(() => setSuccessMessage(null), 3000);
                }
            }
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
            setError("Failed to delete user. Please try again.");
        }
    };

    const filteredUsers = userData.filter(user => 
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            User Management
                        </h2>
                        <p className="text-gray-600 mt-2">Manage and track your users</p>
                    </div>
                    <button
                        className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        onClick={() => window.location.href = '/adduser'}
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Add User</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                        <p className="text-green-700">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                        <XCircle className="w-5 h-5 text-red-500 mr-3" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100"
                            >
                                {/* User Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {user.firstname.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{user.firstname} {user.lastname}</h3>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => window.location.href = `/edituser/${user._id}`}
                                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                            title="Edit User"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                            title="Delete User"
                                        >
                                            <BadgeX className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                        <span className="text-sm">{user.email || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                                        <span className="text-sm">{user.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                        <span className="text-sm">
                                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* User Status */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Shield className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="text-sm text-gray-600">Status</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            user.isActive 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users2 className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Users Found</h3>
                            <p className="text-gray-600 mb-4">Get started by adding your first user</p>
                            <button
                                onClick={() => window.location.href = '/adduser'}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
