import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDonation from './EditDonation';

function DonationActions() {
  const [donorData, setDonorData] = useState([]);
  const [editDonor, setEditDonor] = useState(null);

  useEffect(() => {
    const getDonors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donors/donors');
        if (response.status === 200) {
          setDonorData(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDonors();
  }, []);

  const handleUpdate = async (donorId, updatedStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/donors/donor/${donorId}`, { status: updatedStatus });
      if (response.status === 200) {
        setDonorData((prevData) =>
          prevData.map((donor) =>
            donor._id === donorId ? { ...donor, status: updatedStatus } : donor
          )
        );
        setEditDonor(null);
      }
    } catch (error) {
      console.error('Error updating donor status:', error.message);
    }
  };

  const handleDelete = async (donorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donor?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/donors/delete/${donorId}`);
        if (response.status === 200) {
          setDonorData((prevData) => prevData.filter((donor) => donor._id !== donorId));
        }
      } catch (error) {
        console.error('Error deleting donor:', error.message);
      }
    }
  };

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-semibold">Donation Actions</h1>
      <div className="donor-list space-y-6">
        {donorData.map((donor) => (
          <div key={donor._id} className="donor-item bg-white p-6 border border-gray-300 rounded-lg shadow-md">
            {editDonor && editDonor._id === donor._id ? (
              <EditDonation
                donor={donor}
                onSave={handleUpdate}
                onCancel={() => setEditDonor(null)}
              />
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{donor.name}</p>
                  <p className="text-gray-600">Rs. {donor.amount}</p>
                  <p className="text-sm text-gray-500">{donor.status}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => setEditDonor(donor)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonationActions;
