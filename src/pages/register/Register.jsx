import "./register.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import {server} from "../../assets/constants";

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const url = server + "/auth/register";
    try {
      
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set header for JSON data
        },
        body: JSON.stringify(formData) // Convert formData to JSON string
      });
  
      if(response.status === 200){
        toast.success("Registered");
        navigate('/login');
      }
      else {
        const {msg} = await response.json();
        toast.error(msg);
      }
      
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
            <br /><br />
            <span>Already have an account? <Link to='/login'>Click here!</Link></span>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
