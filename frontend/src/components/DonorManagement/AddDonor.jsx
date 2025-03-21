import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDonor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate Name
    if (!formData.name.trim()) newErrors.name = "Name is required";

    // Validate Email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    // Validate Phone Number (10 digits only)
    if (!formData.phonenumber.trim() || !/^\d{10}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = "Valid 10-digit phone number is required";
    }

    // Validate Amount (positive number)
    if (!formData.amount.trim() || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = "Valid donation amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Navigate to the mock purchase page with form data as URL params
      navigate(`/mock-purchase?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phonenumber=${encodeURIComponent(formData.phonenumber)}&amount=${encodeURIComponent(formData.amount)}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-96 space-y-4 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Donor Form</h2>
        
        {[ 
          { label: "Name", name: "name", type: "text" },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Phone Number", name: "phonenumber", type: "text" },  // Changed to text for phone number
          { label: "Amount", name: "amount", type: "text" },  // Changed to text for amount
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="font-medium text-gray-600">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`border rounded-md p-2 focus:outline-none focus:ring-2 ${errors[name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full h-12 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
        >
          Donate
        </button>
      </form>
    </div>
  );
}

export default AddDonor;
