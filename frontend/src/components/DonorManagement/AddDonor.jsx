import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  Heart, 
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles
} from "lucide-react";

function AddDonor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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

    setLoading(true);
    setSuccess("");

    try {
      // Simulate a loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the mock purchase page with form data as URL params
      navigate(`/mock-purchase?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phonenumber=${encodeURIComponent(formData.phonenumber)}&amount=${encodeURIComponent(formData.amount)}`);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Make a Difference</h1>
          <p className="text-gray-600">Your contribution helps create a greener future</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { 
                label: "Full Name", 
                name: "name", 
                type: "text", 
                icon: User,
                placeholder: "John Doe"
              },
              { 
                label: "Email Address", 
                name: "email", 
                type: "email", 
                icon: Mail,
                placeholder: "john@example.com"
              },
              { 
                label: "Phone Number", 
                name: "phonenumber", 
                type: "text", 
                icon: Phone,
                placeholder: "1234567890"
              },
              { 
                label: "Donation Amount", 
                name: "amount", 
                type: "text", 
                icon: DollarSign,
                placeholder: "100"
              }
            ].map(({ label, name, type, icon: Icon, placeholder }) => (
              <div key={name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors[name] 
                        ? "border-red-500 focus:ring-red-400" 
                        : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    }`}
                  />
                </div>
                {errors[name] && (
                  <div className="flex items-center text-red-500 text-sm">
                    <XCircle className="w-4 h-4 mr-1" />
                    <p>{errors[name]}</p>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Heart className="w-5 h-5 mr-2" />
              )}
              {loading ? "Processing..." : "Make Donation"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your contribution will help us create a sustainable future</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDonor;
