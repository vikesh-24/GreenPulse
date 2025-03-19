import React,{useState} from 'react';
import axios from "axios";

function AddDonor() {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        amount:""
    }); 

    const handleChange = (e) => {
        const {name,value} = e.target; 
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/donors/adddonor",formData);
            if (response.status === 200) {
                alert("Donor added successfully");
            }
        } catch (error) {
            console.error(error.message);
            
        }
    }

  return (
    <div>
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                value={formData.name}
                onChange={handleChange} />   
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input type="text"
                value={formData.email}
                onChange={handleChange} />   
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="number"
                value={formData.phone}
                onChange={handleChange} />   
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input type="number"
                value={formData.amount}
                onChange={handleChange} />   
            </div>
         
            <button type="submit" onClick={handleSubmit}>Donate</button>
        </form>
    </div>
  )
}

export default AddDonor