import React, { useState, useEffect } from 'react';

const Maintenance = ({ userType }) => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: '',
    room_number: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Simulate API call - in real app, this would fetch from backend
      const mockRequests = [
        {
          id: 1,
          student_name: 'John Doe',
          title: 'Broken AC',
          category: 'Electrical',
          description: 'The air conditioner in my room is not cooling properly',
          priority: 'high',
          room_number: '101',
          status: 'in-progress',
          created_date: '2025-01-20',
          assigned_to: 'Mike Wilson'
        },
        {
          id: 2,
          student_name: 'Alice Smith',
          title: 'Leaky Faucet',
          category: 'Plumbing',
          description: 'The bathroom faucet keeps dripping water',
          priority: 'medium',
          room_number: '205',
          status: 'pending',
          created_date: '2025-01-21',
          assigned_to: null
        }
      ];
      setRequests(mockRequests);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRequest = {
        id: Date.now(),
        student_name: localStorage.getItem('userEmail'),
        ...formData,
        status: 'pending',
        created_date: new Date().toISOString().split('T')[0],
        assigned_to: null
      };
      setRequests([...requests, newRequest]);
      resetForm();
      alert('Maintenance request submitted successfully!');
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const handleAssign = (id, technician) => {
    setRequests(requests.map(request => 
      request.id === id ? { 
        ...request, 
        assigned_to: technician,
        status: request.status === 'pending' ? 'in-progress' : request.status
      } : request
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      priority: '',
      room_number: ''
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
      case 'completed': return '#2ecc71';
      case 'in-progress': return '#3498db';
      case 'pending': return '#f39c12';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Maintenance Requests</h1>
        {userType === 'student' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Submit New Request
          </button>
        )}
      </div>

      {userType === 'admin' && (
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <h3>Total Requests</h3>
            <div className="number">{requests.length}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="number">{requests.filter(r => r.status === 'pending').length}</div>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <div className="number">{requests.filter(r => r.status === 'in-progress').length}</div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <div className="number">{requests.filter(r => r.status === 'completed').length}</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          {userType === 'admin' ? 'All Maintenance Requests' : 'My Maintenance Requests'}
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {userType === 'admin' && <th>Student</th>}
                  <th>Title</th>
                  <th>Category</th>
                  <th>Room</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  {userType === 'admin' && <th>Assigned To</th>}
                  {userType === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter(request => userType === 'admin' || request.student_name === localStorage.getItem('userEmail'))
                  .map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    {userType === 'admin' && <td>{request.student_name}</td>}
                    <td>
                      <strong>{request.title}</strong><br/>
                      <small style={{ color: '#666' }}>{request.description}</small>
                    </td>
                    <td>{request.category}</td>
                    <td>{request.room_number}</td>
                    <td>
                      <span style={{ 
                        color: getPriorityColor(request.priority),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {request.priority}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: getStatusColor(request.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {request.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>{request.created_date}</td>
                    {userType === 'admin' && (
                      <td>{request.assigned_to || 'Unassigned'}</td>
                    )}
                    {userType === 'admin' && (
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {request.status === 'pending' && (
                            <>
                              <button 
                                className="btn btn-primary" 
                                onClick={() => handleAssign(request.id, 'Mike Wilson')}
                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                              >
                                Assign
                              </button>
                              <button 
                                className="btn btn-danger" 
                                onClick={() => handleStatusChange(request.id, 'cancelled')}
                                style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {request.status === 'in-progress' && (
                            <button 
                              className="btn btn-success" 
                              onClick={() => handleStatusChange(request.id, 'completed')}
                              style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={userType === 'admin' ? "10" : "7"} style={{ textAlign: 'center', padding: '2rem' }}>
                      No maintenance requests found.
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
              <h2>Submit Maintenance Request</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Broken AC, Leaky faucet"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC (Heating/Cooling)</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Network/Internet">Network/Internet</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Security">Security</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Room Number</label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low - Can wait a few days</option>
                  <option value="medium">Medium - Should be fixed soon</option>
                  <option value="high">High - Urgent, affects daily life</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Please provide detailed description of the issue..."
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

export default Maintenance;
