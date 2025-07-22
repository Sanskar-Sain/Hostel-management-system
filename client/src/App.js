import React, { useState, useEffect } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('student');

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedUserType = localStorage.getItem('userType');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserType(savedUserType || 'student');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserType('student');
  };

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar userType={userType} onLogout={handleLogout} />
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
      </div>
    </Router>
  );
}

export default App;
