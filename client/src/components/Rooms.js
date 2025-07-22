import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    room_number: '',
    capacity: '',
    type: '',
    rent: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rooms', {
        ...formData,
        capacity: parseInt(formData.capacity),
        rent: parseFloat(formData.rent)
      });
      fetchRooms();
      resetForm();
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      room_number: '',
      capacity: '',
      type: '',
      rent: ''
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Rooms Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Room
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          All Rooms
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Room Number</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Occupied</th>
                  <th>Available</th>
                  <th>Rent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room.id}>
                    <td>{room.room_number}</td>
                    <td>{room.type}</td>
                    <td>{room.capacity}</td>
                    <td>{room.occupied}</td>
                    <td>{room.capacity - room.occupied}</td>
                    <td>${room.rent}</td>
                    <td>
                      <span style={{ 
                        color: room.occupied < room.capacity ? '#2ecc71' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {room.occupied < room.capacity ? 'Available' : 'Full'}
                      </span>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                      No rooms found. Add your first room!
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
              <h2>Add New Room</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
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
                <label>Room Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="Quad">Quad</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="form-control"
                  min="1"
                  max="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Monthly Rent ($)</label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  className="form-control"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
