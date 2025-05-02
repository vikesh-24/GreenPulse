import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Edit2, 
  X, 
  Save, 
  Loader2,
  CheckCircle2,
  XCircle
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({}); // Form data for edits
  const [success, setSuccess] = useState("");

  // Function to decode the JWT token
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload (second part of the token)
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      console.log("Decoded Payload:", jsonPayload); // Log the decoded payload for debugging
      return JSON.parse(jsonPayload); // Parse the JSON string into an object
    } catch (error) {
      console.error('Error decoding JWT:', error); // Catch and log errors
      return null; // Return null if there's an issue with decoding
    }
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Get the token from localStorage

    if (!authToken) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const decodedToken = decodeJwt(authToken); // Decode the JWT token to extract user info
    if (!decodedToken) {
      setError("Invalid or expired token.");
      setLoading(false);
      return;
    }

    console.log("Decoded Token:", decodedToken); // Log the decoded token for debugging

    const userId = decodedToken.id; // Use the user ID from the token (adjust based on your JWT structure)
    if (!userId) {
      setError("User ID missing in the token.");
      setLoading(false);
      return;
    }

    // Set up axios request with authorization token
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/user/${userId}`, {
          headers: {
            "Authorization": `Bearer ${authToken}` // Send the token in the Authorization header
          }
        });

        console.log("User Data:", response.data); // Log the user data response for debugging
        setUser(response.data.data); // Set user data
        setFormData(response.data.data); // Set initial form data to current user data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error("Error fetching user details:", err); // Log the error if the request fails
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding field in form data
    });
  };

  // Handle form submission (Save Changes)
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setSuccess("");

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("You are not logged in.");
      return;
    }

    try {
      const userId = user._id;
      console.log(userId);
      // Send the updated data to the backend
      const response = await axios.put(
        `http://localhost:5000/api/users/user/${userId}`, // Fixed this line to include the user id properly
        formData,
        {
          headers: {
            "Authorization": `Bearer ${authToken}`, // Send the token in the Authorization header
          },
        }
      );

      console.log("Updated User Data:", response.data); // Log the updated user data for debugging
      setUser(response.data.data);
      setIsEditing(false); // Exit edit mode
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving changes:", err); // Log the error if the request fails
      setError("Failed to save changes. Please try again.");
    }
  };

  // If still loading or if there's an error, display a message
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.firstname} {user.lastname}</h2>
                  <p className="text-gray-600">@{user.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-gray-900">{user.firstname} {user.lastname}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Mail className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-gray-900">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Role</span>
                  </div>
                  <p className="text-gray-900 capitalize">{user.role}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Age</span>
                  </div>
                  <p className="text-gray-900">{user.age}</p>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <Edit2 className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="firstname"
                      value={formData.firstname} 
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="lastname"
                      value={formData.lastname} 
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age} 
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)} 
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
