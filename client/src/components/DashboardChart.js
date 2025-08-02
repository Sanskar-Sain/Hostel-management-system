import React from 'react';

const DashboardChart = ({ stats }) => {
  // Calculate percentages for visual representation
  const occupancyRate = stats.totalRooms > 0 ? ((stats.totalRooms - stats.availableRooms) / stats.totalRooms * 100).toFixed(1) : 0;
  const revenuePerStudent = stats.totalStudents > 0 ? (stats.monthlyRevenue / stats.totalStudents).toFixed(2) : 0;

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <span style={{ marginRight: '0.5rem' }}>📊</span>
        Analytics Overview
      </div>
      <div className="card-body">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Occupancy Rate */}
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--bg-tertiary)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              marginBottom: '0.25rem'
            }}>
              {occupancyRate}%
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Occupancy Rate
            </p>
          </div>

          {/* Revenue per Student */}
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--bg-tertiary)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              marginBottom: '0.25rem'
            }}>
              ${revenuePerStudent}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Revenue per Student
            </p>
          </div>

          {/* Average Room Capacity */}
          <div style={{ 
            padding: '1.5rem', 
            background: 'var(--bg-tertiary)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--text-primary)',
              marginBottom: '0.25rem'
            }}>
              {stats.totalRooms > 0 ? (stats.totalStudents / stats.totalRooms).toFixed(1) : 0}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Students per Room
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📈</span>
            Performance Metrics
          </h4>
          
          {/* Occupancy Progress */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Room Occupancy
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                {occupancyRate}%
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--border-color)', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${occupancyRate}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #10b981, #059669)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          {/* Revenue Progress */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Monthly Revenue Target
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                ${stats.monthlyRevenue}
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--border-color)', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${Math.min((stats.monthlyRevenue / 10000) * 100, 100)}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          {/* Student Registration Progress */}
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Student Registration
              </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                {stats.totalStudents} students
              </span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--border-color)', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${Math.min((stats.totalStudents / 100) * 100, 100)}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'var(--bg-tertiary)', 
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
            <span>📋</span>
            Quick Insights
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✅</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {stats.totalStudents - (stats.totalRooms - stats.availableRooms)}
                </strong> students assigned to rooms
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🆓</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {stats.availableRooms}
                </strong> rooms available
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💰</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>
                  ${(stats.monthlyRevenue / 12).toFixed(0)}
                </strong> average monthly revenue
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📊</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {stats.totalStudents > 0 ? (stats.monthlyRevenue / stats.totalStudents).toFixed(0) : 0}
                </strong> revenue per student
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart; 