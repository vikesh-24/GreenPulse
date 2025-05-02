import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Invoice from './Invoice';

function Donations() {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donors/donors');
        if (response.status === 200) {
          setApiData(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDonations();
  }, []);

  const calculateTotalDonations = () => {
    return filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);
  };

  const filteredDonations = apiData.filter(donation =>
    donation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Overall Donations Received</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by donor name..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3 mb-6">
        {filteredDonations.map((donation, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-md flex justify-between items-center"
          >
            <p className="text-lg font-medium">{donation.name}</p>
            <p className="text-green-600 font-semibold">Rs. {donation.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Invoice totalAmount={calculateTotalDonations()} />

    </div>
  );
}

export default Donations;
