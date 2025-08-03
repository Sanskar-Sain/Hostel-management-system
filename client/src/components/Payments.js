import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    amount: '',
    payment_type: ''
  });

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data.filter(student => student.status === 'active'));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', {
        ...formData,
        amount: parseFloat(formData.amount),
        student_id: parseInt(formData.student_id)
      });
      fetchPayments();
      resetForm();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      amount: '',
      payment_type: ''
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTotalRevenue = () => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Payments Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Payment
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <h3>Total Payments</h3>
          <div className="number">{payments.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="number">${getTotalRevenue()}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          All Payments
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.student_name}</td>
                    <td>${payment.amount}</td>
                    <td>
                      <span style={{
                        backgroundColor: payment.payment_type === 'rent' ? '#3498db' : 
                                       payment.payment_type === 'deposit' ? '#f39c12' : '#2ecc71',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {payment.payment_type}
                      </span>
                    </td>
                    <td>{payment.payment_date}</td>
                    <td>
                      <span style={{ 
                        color: payment.status === 'completed' ? '#2ecc71' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      No payments found. Record your first payment!
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
              <h2>Add New Payment</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student</label>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-control"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Payment Type</label>
                <select
                  name="payment_type"
                  value={formData.payment_type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Payment Type</option>
                  <option value="rent">Monthly Rent</option>
                  <option value="deposit">Security Deposit</option>
                  <option value="maintenance">Maintenance Fee</option>
                  <option value="utilities">Utilities</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
