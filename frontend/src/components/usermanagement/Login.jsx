import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Response:", response.data); // Debugging

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("firstName", response.data.firstname); // Ensure firstName is stored before navigation

        // Trigger event to update Header immediately
        window.dispatchEvent(new Event("storage"));

        switch (response.data.role) {
          case "user":
            window.location.href = "/";
            break;
          case "doner":
            window.location.href = "/doner-dashboard";
            break;
          case "admin":
            window.location.href = "/admin-dashboard";
            break;
          default:
            setError("Invalid role");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-green-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Login</h2>
        
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-green-700 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
