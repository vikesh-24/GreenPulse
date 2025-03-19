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
        <div className='p-4'>
            <span className='text-2xl inline-block mb-4'>Recent Donors Who Contributed</span>
            {isFetched ? (
                apiData.length > 0 ? (
                    apiData.map((donor) => (
                        <div key={donor.id} className='border p-2 mb-2 rounded'>
                            <p><strong>Name:</strong> {donor.name}</p>
                            <p><strong>Phone:</strong> {donor.phone}</p>
                        </div>
                    ))
                ) : (
                    <p>No donors found.</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Donors;
