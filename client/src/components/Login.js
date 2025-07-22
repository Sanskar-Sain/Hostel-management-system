import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated, setUserType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: 'student'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // For demo purposes, we'll simulate login
      if (formData.email && formData.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('userEmail', formData.email);
        setIsAuthenticated(true);
        setUserType(formData.userType);
      } else {
        setError('Please fill in all fields');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // For demo purposes, we'll simulate registration
      if (registerData.name && registerData.email && registerData.password && registerData.phone) {
        alert('Registration successful! You can now login.');
        setIsRegistering(false);
        setFormData({ ...formData, email: registerData.email });
      } else {
        setError('Please fill in all fields');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  if (isRegistering) {
    return (
      <div className="login-container" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div className="login-card" style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
            🏠 Register - Hostel Management
          </h2>
          
          {error && (
            <div style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              padding: '0.5rem', 
              borderRadius: '4px', 
              marginBottom: '1rem' 
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>User Type</label>
              <select
                name="userType"
                value={registerData.userType}
                onChange={handleRegisterChange}
                className="form-control"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success" style={{ width: '100%', marginBottom: '1rem' }}>
              Register
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              onClick={() => setIsRegistering(false)}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div className="login-card" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
          🏠 Login - Hostel Management
        </h2>
        
        {error && (
          <div style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            padding: '0.5rem', 
            borderRadius: '4px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            Login
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ width: '100%' }}
            onClick={() => setIsRegistering(true)}
          >
            Register New Account
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h4>Demo Credentials:</h4>
          <p><strong>Student:</strong> student@demo.com / password123</p>
          <p><strong>Admin:</strong> admin@demo.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
