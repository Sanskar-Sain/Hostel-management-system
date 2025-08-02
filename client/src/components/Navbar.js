import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';

const Navbar = ({ userType, onLogout }) => {
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');
  const { theme, toggleTheme } = useTheme();

  // Get user initials for avatar
  const getUserInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊', roles: ['student', 'admin'] },
    { path: '/students', label: 'Students', icon: '👨‍🎓', roles: ['admin'] },
    { path: '/rooms', label: 'Rooms', icon: '🛏️', roles: ['admin'] },
    { path: '/payments', label: 'Payments', icon: '💰', roles: ['admin'] },
    { path: '/outpass', label: 'Outpass', icon: '🚪', roles: ['student', 'admin'] },
    { path: '/visitors', label: 'Visitors', icon: '👥', roles: ['student', 'admin'] },
    { path: '/maintenance', label: 'Maintenance', icon: '🔧', roles: ['student', 'admin'] },
    { path: '/emergency', label: 'Emergency', icon: '🚨', roles: ['student', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userType));

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          🏠 Hostel Management
          <small>
            {userType === 'admin' ? '👨‍💼 Admin' : '👨‍🎓 Student'} Portal
          </small>
        </div>
        
        <ul className="navbar-nav">
          {filteredMenuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* User Profile Section */}
          <li>
            <div className="user-profile">
              <div className="user-avatar">
                {getUserInitials(userEmail)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                  {userType === 'admin' ? 'Admin' : 'Student'}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {userEmail}
                </span>
              </div>
            </div>
          </li>
          
          {/* Theme Toggle */}
          <li>
            <button 
              className="nav-link theme-toggle" 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span>
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
          </li>
          
          {/* Logout Button */}
          <li>
            <button 
              className="nav-link logout-btn" 
              onClick={onLogout}
              title="Logout from the system"
            >
              <span>🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
