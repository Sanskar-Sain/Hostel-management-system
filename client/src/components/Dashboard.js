import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import DashboardChart from './DashboardChart';

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
      const data = await apiService.getDashboardStats();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Hostel Management</h1>
        <p>Monitor and manage your hostel operations efficiently</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card students">
          <span className="icon">👨‍🎓</span>
          <h3>Total Students</h3>
          <div className="number">{stats.totalStudents}</div>
          <div className="trend">Active registrations</div>
        </div>
        
        <div className="stat-card rooms">
          <span className="icon">🛏️</span>
          <h3>Total Rooms</h3>
          <div className="number">{stats.totalRooms}</div>
          <div className="trend">Allocated spaces</div>
        </div>
        
        <div className="stat-card available">
          <span className="icon">🏠</span>
          <h3>Available Rooms</h3>
          <div className="number">{stats.availableRooms}</div>
          <div className="trend">Ready for occupancy</div>
        </div>
        
        <div className="stat-card revenue">
          <span className="icon">💰</span>
          <h3>Monthly Revenue</h3>
          <div className="number">${stats.monthlyRevenue}</div>
          <div className="trend">This month's earnings</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-item">
            <div className="icon">👨‍🎓</div>
            <div className="content">
              <h3>Manage Students</h3>
              <p>Add, edit, and view student information</p>
            </div>
          </div>
          
          <div className="action-item">
            <div className="icon">🛏️</div>
            <div className="content">
              <h3>Room Management</h3>
              <p>Allocate and track room assignments</p>
            </div>
          </div>
          
          <div className="action-item">
            <div className="icon">💰</div>
            <div className="content">
              <h3>Payment Tracking</h3>
              <p>Monitor fees and payment status</p>
            </div>
          </div>
          
          <div className="action-item">
            <div className="icon">📊</div>
            <div className="content">
              <h3>Reports & Analytics</h3>
              <p>Generate insights and reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <DashboardChart stats={stats} />

      <div className="card">
        <div className="card-header">
          System Overview
        </div>
        <div className="card-body">
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Use the navigation menu to access different modules:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>👨‍🎓 Students</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Manage student registrations and information
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>🛏️ Rooms</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Track room allocations and availability
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>💰 Payments</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Record and monitor payment transactions
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>📊 Analytics</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Generate reports and analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
