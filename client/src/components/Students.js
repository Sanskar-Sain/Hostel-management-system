import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    room_number: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5000/api/students/${editingStudent.id}`, {
          ...formData,
          status: 'active'
        });
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      room_number: student.room_number || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      room_number: ''
    });
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            👨‍🎓 Students Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Manage student registrations and information
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <span>➕</span>
          Add New Student
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <span style={{ marginRight: '0.5rem' }}>📋</span>
          All Students ({students.length})
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Room</th>
                  <th>Check-in Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>
                      <span style={{ 
                        background: 'var(--bg-tertiary)', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        #{student.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>👤</span>
                        <span style={{ fontWeight: '600' }}>{student.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📧</span>
                        {student.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📞</span>
                        {student.phone}
                      </div>
                    </td>
                    <td>
                      {student.room_number ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>🛏️</span>
                          <span style={{ 
                            background: 'var(--card-blue)', 
                            color: '#1d4ed8',
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}>
                            Room {student.room_number}
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          Not assigned
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📅</span>
                        {student.check_in_date || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        color: student.status === 'active' ? '#10b981' : '#ef4444',
                        fontWeight: '600',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        background: student.status === 'active' ? '#dcfce7' : '#fef2f2'
                      }}>
                        {student.status === 'active' ? '✅ Active' : '❌ Inactive'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => handleEdit(student)}
                          title="Edit student information"
                        >
                          <span>✏️</span>
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => handleDelete(student.id)}
                          title="Delete student"
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem' }}>
                      <div style={{ color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>👨‍🎓</span>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No students found</h3>
                        <p>Add your first student to get started!</p>
                        <button 
                          className="btn btn-primary" 
                          onClick={() => setShowModal(true)}
                          style={{ marginTop: '1rem' }}
                        >
                          <span>➕</span>
                          Add First Student
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                <span style={{ marginRight: '0.5rem' }}>
                  {editingStudent ? '✏️' : '➕'}
                </span>
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <span style={{ marginRight: '0.5rem' }}>👤</span>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter student's full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span style={{ marginRight: '0.5rem' }}>📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="student@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span style={{ marginRight: '0.5rem' }}>📞</span>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span style={{ marginRight: '0.5rem' }}>🛏️</span>
                  Room Number (Optional)
                </label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 101, 2A, etc."
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  <span>❌</span>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  <span>{editingStudent ? '💾' : '➕'}</span>
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
