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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem'
      }}>
        <div className="login-card" style={{
          backgroundColor: 'var(--card-bg)',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Create Account
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Join our hostel management system
            </p>
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              color: '#dc2626', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>
                <span style={{ marginRight: '0.5rem' }}>👤</span>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <span style={{ marginRight: '0.5rem' }}>📧</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="form-control"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <span style={{ marginRight: '0.5rem' }}>📞</span>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                className="form-control"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <span style={{ marginRight: '0.5rem' }}>🔒</span>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="form-control"
                placeholder="Create a strong password"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <span style={{ marginRight: '0.5rem' }}>👥</span>
                User Type
              </label>
              <select
                name="userType"
                value={registerData.userType}
                onChange={handleRegisterChange}
                className="form-control"
              >
                <option value="student">👨‍🎓 Student</option>
                <option value="admin">👨‍💼 Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}>
              <span>✅</span>
              Create Account
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => setIsRegistering(false)}
            >
              <span>⬅️</span>
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div className="login-card" style={{
        backgroundColor: 'var(--card-bg)',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Sign in to your hostel management account
          </p>
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fef2f2', 
            color: '#dc2626', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>
              <span style={{ marginRight: '0.5rem' }}>📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>
              <span style={{ marginRight: '0.5rem' }}>🔒</span>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label>
              <span style={{ marginRight: '0.5rem' }}>👥</span>
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="student">👨‍🎓 Student</option>
              <option value="admin">👨‍💼 Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}>
            <span>🚀</span>
            Sign In
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '1rem' }}
            onClick={() => setIsRegistering(true)}
          >
            <span>➕</span>
            Create New Account
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          backgroundColor: 'var(--bg-tertiary)', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <h4 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>💡</span>
            Demo Credentials
          </h4>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>👨‍🎓 Student:</strong> student@demo.com / password123
            </p>
            <p>
              <strong>👨‍💼 Admin:</strong> admin@demo.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
