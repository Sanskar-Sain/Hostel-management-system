import React, { useState, useEffect } from 'react';

const Emergency = ({ userType }) => {
  const [emergencyContacts] = useState([
    { id: 1, name: 'Campus Security', phone: '911', type: 'security', available: true },
    { id: 2, name: 'Medical Emergency', phone: '108', type: 'medical', available: true },
    { id: 3, name: 'Fire Department', phone: '101', type: 'fire', available: true },
    { id: 4, name: 'Hostel Warden', phone: '+1234567890', type: 'hostel', available: true },
    { id: 5, name: 'Maintenance Emergency', phone: '+1987654321', type: 'maintenance', available: true },
  ]);

  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [panicButtonPressed, setPanicButtonPressed] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handlePanicButton = () => {
    if (panicButtonPressed) return;
    
    // Start countdown before sending alert
    setCountdown(5);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          sendEmergencyAlert();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelPanic = () => {
    setCountdown(null);
  };

  const sendEmergencyAlert = () => {
    setPanicButtonPressed(true);
    const newAlert = {
      id: Date.now(),
      student_email: localStorage.getItem('userEmail'),
      timestamp: new Date().toISOString(),
      location: 'Room 101', // This would be dynamic in a real app
      type: 'panic',
      status: 'active'
    };
    
    setEmergencyAlerts(prev => [newAlert, ...prev]);
    
    // Simulate sending alert to authorities
    alert('EMERGENCY ALERT SENT!\n\nYour location has been shared with campus security and emergency services. Help is on the way!');
    
    // Reset after 30 seconds
    setTimeout(() => {
      setPanicButtonPressed(false);
    }, 30000);
  };

  const makeEmergencyCall = (contact) => {
    // In a real app, this might use a phone API or open a dialer
    alert(`Calling ${contact.name} at ${contact.phone}\n\nIn a real app, this would initiate the call.`);
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'security': return '🚨';
      case 'medical': return '🏥';
      case 'fire': return '🚒';
      case 'hostel': return '🏠';
      case 'maintenance': return '🔧';
      default: return '📞';
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case 'security': return '#e74c3c';
      case 'medical': return '#3498db';
      case 'fire': return '#e67e22';
      case 'hostel': return '#2ecc71';
      case 'maintenance': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Emergency Services</h1>
      </div>

      {/* Panic Button Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
          🚨 Emergency Panic Button
        </div>
        <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
          {countdown ? (
            <div>
              <h2>Emergency Alert Activating in {countdown} seconds</h2>
              <p>Your location will be shared with emergency services</p>
              <button 
                className="btn btn-secondary" 
                onClick={cancelPanic}
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                Cancel
              </button>
            </div>
          ) : panicButtonPressed ? (
            <div>
              <h2 style={{ color: '#e74c3c' }}>🚨 EMERGENCY ALERT ACTIVE 🚨</h2>
              <p>Emergency services have been notified. Help is on the way.</p>
              <div style={{ 
                backgroundColor: '#e74c3c', 
                color: 'white', 
                padding: '1rem', 
                borderRadius: '8px',
                fontSize: '1.1rem'
              }}>
                Stay calm and wait for assistance
              </div>
            </div>
          ) : (
            <div>
              <h3>Press only in case of real emergency</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                This will immediately alert campus security, medical services, and hostel authorities with your location.
              </p>
              <button 
                className="btn" 
                onClick={handlePanicButton}
                style={{ 
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '1.5rem 3rem',
                  borderRadius: '50%',
                  width: '200px',
                  height: '200px',
                  border: '5px solid #c0392b'
                }}
              >
                🚨<br/>PANIC<br/>BUTTON
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          📞 Emergency Contacts
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {emergencyContacts.map(contact => (
              <div key={contact.id} style={{
                border: `2px solid ${getContactColor(contact.type)}`,
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{getContactIcon(contact.type)}</div>
                  <div>
                    <h4 style={{ margin: 0, color: getContactColor(contact.type) }}>{contact.name}</h4>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{contact.phone}</p>
                    <small style={{ color: contact.available ? '#2ecc71' : '#e74c3c' }}>
                      {contact.available ? '✅ Available 24/7' : '❌ Currently unavailable'}
                    </small>
                  </div>
                </div>
                <button 
                  className="btn"
                  onClick={() => makeEmergencyCall(contact)}
                  style={{ 
                    backgroundColor: getContactColor(contact.type),
                    color: 'white',
                    padding: '0.75rem 1.5rem'
                  }}
                  disabled={!contact.available}
                >
                  📞 Call
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="card">
        <div className="card-header">
          💡 Emergency Safety Tips
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4>🔥 Fire Emergency</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Stay low to avoid smoke</li>
                <li>Feel doors before opening</li>
                <li>Exit immediately, don't collect belongings</li>
                <li>Use stairs, never elevators</li>
                <li>Call 101 once you're safe</li>
              </ul>
            </div>
            <div>
              <h4>🏥 Medical Emergency</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Call 108 immediately</li>
                <li>Don't move injured person unless necessary</li>
                <li>Apply pressure to bleeding wounds</li>
                <li>Stay with the person until help arrives</li>
                <li>Provide clear location information</li>
              </ul>
            </div>
            <div>
              <h4>🚨 Security Emergency</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Move to a safe location</li>
                <li>Lock doors and windows</li>
                <li>Use panic button if in immediate danger</li>
                <li>Call campus security</li>
                <li>Don't confront intruders</li>
              </ul>
            </div>
            <div>
              <h4>⚡ Natural Disasters</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Follow building evacuation procedures</li>
                <li>Stay away from windows during storms</li>
                <li>Take cover during earthquakes</li>
                <li>Listen to official announcements</li>
                <li>Have emergency supplies ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alerts History (Admin View) */}
      {userType === 'admin' && emergencyAlerts.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
            🚨 Recent Emergency Alerts
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Student</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyAlerts.map(alert => (
                    <tr key={alert.id}>
                      <td>{new Date(alert.timestamp).toLocaleString()}</td>
                      <td>{alert.student_email}</td>
                      <td>{alert.location}</td>
                      <td style={{ textTransform: 'capitalize', fontWeight: 'bold', color: '#e74c3c' }}>
                        {alert.type}
                      </td>
                      <td>
                        <span style={{ 
                          color: alert.status === 'active' ? '#e74c3c' : '#2ecc71',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
