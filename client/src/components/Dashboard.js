import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ userType }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    monthlyRevenue: 0,
    availableRooms: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Hostel Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="number">{stats.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Total Rooms</h3>
          <div className="number">{stats.totalRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Available Rooms</h3>
          <div className="number">{stats.availableRooms}</div>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <div className="number">${stats.monthlyRevenue}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Quick Actions
        </div>
        <div className="card-body">
          <p>Use the navigation menu to:</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '2rem' }}>
            <li>Manage student registrations and information</li>
            <li>Track room allocations and availability</li>
            <li>Record and monitor payment transactions</li>
            <li>Generate reports and analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
