import React, { useState, useEffect } from 'react';

const Visitors = ({ userType }) => {
  const [visitors, setVisitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    visitor_name: '',
    visitor_phone: '',
    relationship: '',
    purpose: '',
    expected_checkin: '',
    expected_checkout: '',
    id_proof_type: '',
    id_proof_number: ''
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      // Simulate API call - in real app, this would fetch from backend
      const mockVisitors = [
        {
          id: 1,
          student_name: 'John Doe',
          visitor_name: 'Jane Doe',
          visitor_phone: '+1234567890',
          relationship: 'Sister',
          purpose: 'Family visit',
          expected_checkin: '2025-01-22T14:00',
          expected_checkout: '2025-01-22T18:00',
          id_proof_type: 'Driving License',
          id_proof_number: 'DL123456789',
          status: 'approved',
          actual_checkin: '2025-01-22T14:15',
          actual_checkout: null
        },
        {
          id: 2,
          student_name: 'Alice Smith',
          visitor_name: 'Bob Wilson',
          visitor_phone: '+1987654321',
          relationship: 'Friend',
          purpose: 'Social visit',
          expected_checkin: '2025-01-23T16:00',
          expected_checkout: '2025-01-23T20:00',
          id_proof_type: 'Passport',
          id_proof_number: 'P87654321',
          status: 'pending',
          actual_checkin: null,
          actual_checkout: null
        }
      ];
      setVisitors(mockVisitors);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVisitor = {
        id: Date.now(),
        student_name: localStorage.getItem('userEmail'),
        ...formData,
        status: 'pending',
        actual_checkin: null,
        actual_checkout: null
      };
      setVisitors([...visitors, newVisitor]);
      resetForm();
      alert('Visitor registration submitted successfully!');
    } catch (error) {
      console.error('Error submitting visitor registration:', error);
    }
  };

  const handleApprove = (id) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { ...visitor, status: 'approved' } : visitor
    ));
  };

  const handleReject = (id) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { ...visitor, status: 'rejected' } : visitor
    ));
  };

  const handleCheckin = (id) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { 
        ...visitor, 
        actual_checkin: new Date().toISOString(),
        status: 'checked-in'
      } : visitor
    ));
  };

  const handleCheckout = (id) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { 
        ...visitor, 
        actual_checkout: new Date().toISOString(),
        status: 'checked-out'
      } : visitor
    ));
  };

  const resetForm = () => {
    setFormData({
      visitor_name: '',
      visitor_phone: '',
      relationship: '',
      purpose: '',
      expected_checkin: '',
      expected_checkout: '',
      id_proof_type: '',
      id_proof_number: ''
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
      case 'checked-in': return '#3498db';
      case 'checked-out': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Not set';
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Visitor Management</h1>
        {userType === 'student' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Register New Visitor
          </button>
        )}
      </div>

      {userType === 'admin' && (
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <h3>Total Visitors</h3>
            <div className="number">{visitors.length}</div>
          </div>
          <div className="stat-card">
            <h3>Pending Approval</h3>
            <div className="number">{visitors.filter(v => v.status === 'pending').length}</div>
          </div>
          <div className="stat-card">
            <h3>Currently Inside</h3>
            <div className="number">{visitors.filter(v => v.status === 'checked-in').length}</div>
          </div>
          <div className="stat-card">
            <h3>Today's Visits</h3>
            <div className="number">
              {visitors.filter(v => {
                const today = new Date().toDateString();
                return v.expected_checkin && new Date(v.expected_checkin).toDateString() === today;
              }).length}
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          {userType === 'admin' ? 'All Visitor Registrations' : 'My Visitor Registrations'}
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {userType === 'admin' && <th>Student</th>}
                  <th>Visitor Name</th>
                  <th>Phone</th>
                  <th>Relationship</th>
                  <th>Purpose</th>
                  <th>Expected Time</th>
                  <th>Status</th>
                  {userType === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {visitors
                  .filter(visitor => userType === 'admin' || visitor.student_name === localStorage.getItem('userEmail'))
                  .map(visitor => (
                  <tr key={visitor.id}>
                    <td>{visitor.id}</td>
                    {userType === 'admin' && <td>{visitor.student_name}</td>}
                    <td>
                      {visitor.visitor_name}<br/>
                      <small>{visitor.id_proof_type}: {visitor.id_proof_number}</small>
                    </td>
                    <td>{visitor.visitor_phone}</td>
                    <td>{visitor.relationship}</td>
                    <td>{visitor.purpose}</td>
                    <td>
                      <strong>In:</strong> {formatDateTime(visitor.expected_checkin)}<br/>
                      <strong>Out:</strong> {formatDateTime(visitor.expected_checkout)}<br/>
                      {visitor.actual_checkin && (
                        <><strong>Actual In:</strong> {formatDateTime(visitor.actual_checkin)}<br/></>
                      )}
                      {visitor.actual_checkout && (
                        <><strong>Actual Out:</strong> {formatDateTime(visitor.actual_checkout)}</>
                      )}
                    </td>
                    <td>
                      <span style={{ 
                        color: getStatusColor(visitor.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {visitor.status.replace('-', ' ')}
                      </span>
                    </td>
                    {userType === 'admin' && (
                      <td>
                        {visitor.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success" 
                              onClick={() => handleApprove(visitor.id)}
                              style={{ marginRight: '0.5rem', marginBottom: '0.25rem' }}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => handleReject(visitor.id)}
                              style={{ marginBottom: '0.25rem' }}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {visitor.status === 'approved' && (
                          <button 
                            className="btn btn-primary" 
                            onClick={() => handleCheckin(visitor.id)}
                          >
                            Check In
                          </button>
                        )}
                        {visitor.status === 'checked-in' && (
                          <button 
                            className="btn btn-secondary" 
                            onClick={() => handleCheckout(visitor.id)}
                          >
                            Check Out
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {visitors.length === 0 && (
                  <tr>
                    <td colSpan={userType === 'admin' ? "9" : "7"} style={{ textAlign: 'center', padding: '2rem' }}>
                      No visitor registrations found.
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
              <h2>Register New Visitor</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Visitor Name</label>
                <input
                  type="text"
                  name="visitor_name"
                  value={formData.visitor_name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Visitor Phone</label>
                <input
                  type="tel"
                  name="visitor_phone"
                  value={formData.visitor_phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Relationship</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Relationship</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Relative">Relative</option>
                  <option value="Friend">Friend</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Purpose of Visit</label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Family visit, Birthday celebration"
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Check-in Time</label>
                <input
                  type="datetime-local"
                  name="expected_checkin"
                  value={formData.expected_checkin}
                  onChange={handleChange}
                  className="form-control"
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Expected Check-out Time</label>
                <input
                  type="datetime-local"
                  name="expected_checkout"
                  value={formData.expected_checkout}
                  onChange={handleChange}
                  className="form-control"
                  min={formData.expected_checkin || new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>
              <div className="form-group">
                <label>ID Proof Type</label>
                <select
                  name="id_proof_type"
                  value={formData.id_proof_type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select ID Proof</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Passport">Passport</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>ID Proof Number</label>
                <input
                  type="text"
                  name="id_proof_number"
                  value={formData.id_proof_number}
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
                  Register Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitors;
