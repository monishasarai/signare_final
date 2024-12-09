import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Add this CSS file for styling

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsRobotChecked(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isRobotChecked) {
      alert('Please confirm you are not a robot!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 200) {
        // Login successful
        alert(result.message);
        navigate('/verification');
      } else {
        // Set the error message for login failure
        setErrorMessage(result.message || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="h1" style={{ color: 'white' }}>LOGIN</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={isRobotChecked}
                onChange={handleCheckboxChange}
              />
              I am not a robot
            </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            className={`login-btn ${isRobotChecked ? '' : 'disabled'}`}
            disabled={!isRobotChecked}
          >
            Login
          </button>
        </form>
        <p className="account-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={handleSignupRedirect}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
