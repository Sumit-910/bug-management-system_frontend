import './login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {server} from '../../assets/constants';
import { useDispatch } from 'react-redux';

import { setUser } from '../../redux/slices/userSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
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
    const url = server + "/auth/login";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Set header for JSON data
        },
        body: JSON.stringify(formData) // Convert formData to JSON string
      });
      if(response.status === 200){
        toast.success("Logged in");
        const {accessToken, refreshToken, userId} = await response.json();
        console.log("login accesstoken = "+accessToken);
        
        dispatch(setUser({ accessToken: accessToken, refreshToken: refreshToken, userId: userId }));
        navigate('/');
      }
      else{
        const {msg} = await response.json();
        toast.error(msg);
      }
    } catch (error) {
      toast.error(error);
    }
    
  };

  return (
    <div className="container">
      <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button><br/><br/>
        <span>Don't have an account? <Link to='/register'>Click here!</Link></span>
      </form>
    </div>
    </div>
  );
}

export default Login
