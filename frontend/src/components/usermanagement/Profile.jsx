import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({}); // Form data for edits

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
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error saving changes:", err); // Log the error if the request fails
      setError("Failed to save changes.");
    }
  };

  // If still loading or if there's an error, display a message
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Profile</h2>
      <div className="space-y-4">
        <p className="text-lg"><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>Role:</strong> {user.role}</p>
        <p className="text-lg"><strong>Age:</strong> {user.age}</p>
      </div>
      
      {/* Edit Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-6">
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">First Name</label>
              <input 
                type="text" 
                name="firstname"
                value={formData.firstname} 
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Last Name</label>
              <input 
                type="text" 
                name="lastname"
                value={formData.lastname} 
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Age</label>
              <input 
                type="number" 
                name="age"
                value={formData.age} 
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
