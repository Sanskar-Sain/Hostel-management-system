import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ userType, onLogout }) => {
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊', roles: ['student', 'admin'] },
    { path: '/students', label: 'Students', icon: '👥', roles: ['admin'] },
    { path: '/rooms', label: 'Rooms', icon: '🏠', roles: ['admin'] },
    { path: '/payments', label: 'Payments', icon: '💰', roles: ['admin'] },
    { path: '/outpass', label: 'Outpass', icon: '🚪', roles: ['student', 'admin'] },
    { path: '/visitors', label: 'Visitors', icon: '👨‍👩‍👧‍👦', roles: ['student', 'admin'] },
    { path: '/maintenance', label: 'Maintenance', icon: '🔧', roles: ['student', 'admin'] },
    { path: '/emergency', label: 'Emergency', icon: '🚨', roles: ['student', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userType));

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          🏠 Hostel Management
          <small style={{ display: 'block', fontSize: '0.8rem', opacity: 0.8 }}>
            {userType === 'admin' ? '👨‍💼 Admin' : '👨‍🎓 Student'}: {userEmail}
          </small>
        </div>
        <ul className="navbar-nav">
          {filteredMenuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button 
              className="nav-link" 
              onClick={onLogout}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
