import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Donors() {
    const [apiData, setApiData] = useState([]); 
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/donors/donors'); 
                if (response.status === 200) {
                    setApiData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching donors:", error.message);
            }

            setIsFetched(true);
        };

        fetchDonors();
    }, []);

    return (
        <div className="donors-container p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Recent Donors Who Contributed</h2>
            {isFetched ? (
                apiData.length > 0 ? (
                    apiData.map((donor) => (
                        <div key={donor.id} className="donor-card border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                            <p className="text-lg font-medium"><strong>Name:</strong> {donor.name}</p>
                            {/* <p className="text-md"><strong>Email:</strong> {donor.email}</p>
                            <p className="text-md"><strong>Phone:</strong> {donor.phonenumber ? donor.phonenumber : 'Not Provided'}</p> */}
                            <p className="text-md"><strong>Amount Donated:</strong> ${donor.amount}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">No donors found.</p>
                )
            ) : (
                <p className="text-center text-lg">Loading...</p>
            )}
        </div>
    );
}

export default Donors;
