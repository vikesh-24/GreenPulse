import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Sparkles,
  ArrowLeft,
  Heart
} from "lucide-react";
import { FaPaypal } from "react-icons/fa";  // Import PayPal icon from react-icons

function MockPurchase() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isPurchased, setIsPurchased] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get donor data from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const donorData = {
    name: queryParams.get("name"),
    email: queryParams.get("email"),
    phonenumber: queryParams.get("phonenumber"),
    amount: queryParams.get("amount"),
  };

  const handlePurchase = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccess("");

    try {
      // Simulate a loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save the donor data in MongoDB after the purchase
      await axios.post("http://localhost:5000/api/donors/adddonor", donorData);
      
      setSuccess("Purchase Completed Successfully!");
      setIsPurchased(true);
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage("An error occurred while processing your donation. Please try again.");
      console.error("Error saving donor:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPurchased) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">Your donation has been processed successfully.</p>
            <div className="flex items-center justify-center text-green-600">
              <Heart className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">Redirecting to homepage...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Donation</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Donation Amount */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600"> RS.{donorData.amount}</p>
            <p className="text-gray-600">Donation Amount</p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod("credit_card")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "credit_card"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <CreditCard
                    className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "credit_card" ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "paypal"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <FaPaypal
                    className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "paypal" ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">PayPal</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "bank_transfer"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <Banknote
                    className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "bank_transfer" ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">Bank Transfer</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Heart className="w-5 h-5 mr-2" />
                )}
                {loading ? "Processing..." : "Complete Donation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockPurchase;
