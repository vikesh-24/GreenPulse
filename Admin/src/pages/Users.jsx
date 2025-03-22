import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BadgeX } from 'lucide-react';

function Users() {
    const [userData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/allusers");
                setUsersData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                const response = await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
                if (response.status === 200) {
                    setUsersData((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Use _id here
                }
            }
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users Joined in GreenPulse</h2>

            <div className="space-y-4">
                {userData.length > 0 ? (
                    userData.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div>
                                <p className="text-lg font-medium text-gray-900">
                                    <strong>First Name:</strong> {user.firstname}
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    <strong>Last Name:</strong> {user.lastname}
                                </p>
                                <p className="text-md text-gray-600">
                                    <strong>Role:</strong> {user.role}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                            >
                                <BadgeX className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No users found.</p>
                )}
            </div>
        </div>
    );
}

export default Users;
