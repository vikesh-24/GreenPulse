import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "user",  // Default role set to "user"
    password: "",
    age: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Used for redirecting to the login page after success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.age
    ) {
      setError("All fields are required!");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Invalid email format!");
      return;
    }

    // Additional check for password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Sending form data to the backend to register the user
      const response = await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after a successful registration
      }, 2000);
    } catch (err) {
      // Displaying error message from the backend if available
      setError(err.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-800">Register</h2>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-700 border border-green-500 p-3 rounded-lg text-sm text-center mt-4">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-500 p-3 rounded-lg text-sm text-center mt-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your age"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
