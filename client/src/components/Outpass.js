import React, { useState, useEffect } from 'react';

const Outpass = ({ userType }) => {
  const [outpasses, setOutpasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    destination: '',
    expected_return_date: '',
    expected_return_time: '',
    emergency_contact: '',
    emergency_phone: ''
  });

  useEffect(() => {
    fetchOutpasses();
  }, []);

  const fetchOutpasses = async () => {
    try {
      // Simulate API call - in real app, this would fetch from backend
      const mockOutpasses = [
        {
          id: 1,
          student_name: 'John Doe',
          reason: 'Medical appointment',
          destination: 'City Hospital',
          out_date: '2025-01-22',
          out_time: '10:00',
          expected_return_date: '2025-01-22',
          expected_return_time: '18:00',
          status: 'approved',
          emergency_contact: 'Jane Doe',
          emergency_phone: '+1234567890'
        },
        {
          id: 2,
          student_name: 'Alice Smith',
          reason: 'Family visit',
          destination: 'Home',
          out_date: '2025-01-23',
          out_time: '08:00',
          expected_return_date: '2025-01-25',
          expected_return_time: '20:00',
          status: 'pending',
          emergency_contact: 'Bob Smith',
          emergency_phone: '+1987654321'
        }
      ];
      setOutpasses(mockOutpasses);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOutpass = {
        id: Date.now(),
        student_name: localStorage.getItem('userEmail'),
        ...formData,
        out_date: new Date().toISOString().split('T')[0],
        out_time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        status: 'pending'
      };
      setOutpasses([...outpasses, newOutpass]);
      resetForm();
      alert('Outpass request submitted successfully!');
    } catch (error) {
      console.error('Error submitting outpass:', error);
    }
  };

  const handleApprove = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? { ...outpass, status: 'approved' } : outpass
    ));
  };

  const handleReject = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? { ...outpass, status: 'rejected' } : outpass
    ));
  };

  const resetForm = () => {
    setFormData({
      reason: '',
      destination: '',
      expected_return_date: '',
      expected_return_time: '',
      emergency_contact: '',
      emergency_phone: ''
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#2ecc71';
      case 'rejected': return '#e74c3c';
      case 'pending': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Outpass Management</h1>
        {userType === 'student' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Request New Outpass
          </button>
        )}
      </div>

      {userType === 'admin' && (
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <h3>Total Requests</h3>
            <div className="number">{outpasses.length}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="number">{outpasses.filter(o => o.status === 'pending').length}</div>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="number">{outpasses.filter(o => o.status === 'approved').length}</div>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <div className="number">{outpasses.filter(o => o.status === 'rejected').length}</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          {userType === 'admin' ? 'All Outpass Requests' : 'My Outpass Requests'}
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {userType === 'admin' && <th>Student</th>}
                  <th>Reason</th>
                  <th>Destination</th>
                  <th>Out Date</th>
                  <th>Expected Return</th>
                  <th>Emergency Contact</th>
                  <th>Status</th>
                  {userType === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {outpasses
                  .filter(outpass => userType === 'admin' || outpass.student_name === localStorage.getItem('userEmail'))
                  .map(outpass => (
                  <tr key={outpass.id}>
                    <td>{outpass.id}</td>
                    {userType === 'admin' && <td>{outpass.student_name}</td>}
                    <td>{outpass.reason}</td>
                    <td>{outpass.destination}</td>
                    <td>{outpass.out_date} {outpass.out_time}</td>
                    <td>{outpass.expected_return_date} {outpass.expected_return_time}</td>
                    <td>
                      {outpass.emergency_contact}<br/>
                      <small>{outpass.emergency_phone}</small>
                    </td>
                    <td>
                      <span style={{ 
                        color: getStatusColor(outpass.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {outpass.status}
                      </span>
                    </td>
                    {userType === 'admin' && (
                      <td>
                        {outpass.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success" 
                              onClick={() => handleApprove(outpass.id)}
                              style={{ marginRight: '0.5rem' }}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => handleReject(outpass.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {outpasses.length === 0 && (
                  <tr>
                    <td colSpan={userType === 'admin' ? "9" : "7"} style={{ textAlign: 'center', padding: '2rem' }}>
                      No outpass requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && userType === 'student' && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Request New Outpass</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Reason for Leaving</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="Medical appointment">Medical Appointment</option>
                  <option value="Family visit">Family Visit</option>
                  <option value="Personal work">Personal Work</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Return Date</label>
                <input
                  type="date"
                  name="expected_return_date"
                  value={formData.expected_return_date}
                  onChange={handleChange}
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Return Time</label>
                <input
                  type="time"
                  name="expected_return_time"
                  value={formData.expected_return_time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergency_phone"
                  value={formData.emergency_phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outpass;
