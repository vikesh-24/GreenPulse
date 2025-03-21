import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function MockPurchase() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isPurchased, setIsPurchased] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error handling
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
    setIsPurchased(true);
    setErrorMessage(""); // Reset previous error message

    try {
      // Save the donor data in MongoDB after the purchase
      console.log("Saving donor data:", donorData);
      await axios.post("http://localhost:5000/api/donors/adddonor", donorData);
      alert("Purchase Completed Successfully!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setIsPurchased(false); // Allow user to try again
      setErrorMessage("An error occurred while processing your donation. Please try again."); // Show error message
      console.error("Error saving donor:", error);
    }
  };

  if (isPurchased) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-green-600">Purchase Completed!</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 space-y-4 border border-gray-200">
        <h2 className="text-xl font-semibold text-center text-gray-700">Mock Payment</h2>
        
        <p className="text-gray-700">Donating: ${donorData.amount}</p>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-600">Select Payment Method</label>
          <select
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <button
          onClick={handlePurchase}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}

export default MockPurchase;
