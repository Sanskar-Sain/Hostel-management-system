import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Rooms from './components/Rooms';
import Payments from './components/Payments';
import Outpass from './components/Outpass';
import Visitors from './components/Visitors';
import Maintenance from './components/Maintenance';
import Emergency from './components/Emergency';
import './App.css';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('student');
  const [theme, setTheme] = useState('light');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUserType = localStorage.getItem('userType');
    const savedTheme = localStorage.getItem('theme');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserType(savedUserType || 'student');
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserType('student');
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const themeValue = {
    theme,
    toggleTheme
  };

  if (!isAuthenticated) {
    return (
      <ThemeContext.Provider value={themeValue}>
        <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <div className="App">
          <Navbar userType={userType} onLogout={handleLogoutClick} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard userType={userType} />} />
              <Route path="/students" element={<Students userType={userType} />} />
              <Route path="/rooms" element={<Rooms userType={userType} />} />
              <Route path="/payments" element={<Payments userType={userType} />} />
              <Route path="/outpass" element={<Outpass userType={userType} />} />
              <Route path="/visitors" element={<Visitors userType={userType} />} />
              <Route path="/maintenance" element={<Maintenance userType={userType} />} />
              <Route path="/emergency" element={<Emergency userType={userType} />} />
            </Routes>
          </div>

          {/* Logout Confirmation Modal */}
          {showLogoutModal && (
            <div className="modal logout-modal">
              <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
                <div className="modal-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>🚪</span>
                    Confirm Logout
                  </h2>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤔</div>
                  <p style={{ 
                    fontSize: '1.125rem', 
                    color: 'var(--text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: '500'
                  }}>
                    Are you sure you want to logout?
                  </p>
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.875rem',
                    marginBottom: '2rem'
                  }}>
                    You will need to sign in again to access your account.
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button 
                      className="btn btn-secondary" 
                      onClick={handleLogoutCancel}
                      style={{ 
                        padding: '0.75rem 2rem',
                        minWidth: '120px'
                      }}
                    >
                      <span>❌</span>
                      Cancel
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={handleLogoutConfirm}
                      style={{ 
                        padding: '0.75rem 2rem',
                        minWidth: '120px'
                      }}
                    >
                      <span>✅</span>
                      Yes, Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
