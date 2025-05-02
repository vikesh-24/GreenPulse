import React, { useState } from 'react';

function EditDonation({ donor, onSave, onCancel }) {
  const [newStatus, setNewStatus] = useState(donor.status);

  const handleSave = () => {
    onSave(donor._id, newStatus);
  };

  return (
    <div className="edit-form space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg">
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="refunded">Refunded</option>
        <option value="not-refunded">Not Refunded</option>
        <option value="pending">Pending</option>
      </select>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditDonation;
