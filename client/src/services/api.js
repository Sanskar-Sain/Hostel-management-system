// Mock API service for demo deployment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock data for demo
const mockData = {
  dashboard: {
    totalStudents: 15,
    totalRooms: 25,
    monthlyRevenue: 45000,
    availableRooms: 10
  },
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      room_number: "101",
      check_in_date: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com", 
      phone: "+1987654321",
      room_number: "102",
      check_in_date: "2024-01-20",
      status: "active"
    }
  ]
};

// API service functions
export const apiService = {
  // Dashboard
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard`);
      if (response.ok) {
        return await response.json();
      } else {
        // Return mock data if backend is not available
        return mockData.dashboard;
      }
    } catch (error) {
      console.log('Using mock data - backend not available');
      return mockData.dashboard;
    }
  },

  // Students
  getStudents: async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (response.ok) {
        return await response.json();
      } else {
        return mockData.students;
      }
    } catch (error) {
      console.log('Using mock data - backend not available');
      return mockData.students;
    }
  },

  addStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        return await response.json();
      } else {
        // Mock response
        return { 
          id: Date.now(), 
          ...studentData, 
          check_in_date: new Date().toISOString().split('T')[0],
          status: 'active'
        };
      }
    } catch (error) {
      console.log('Using mock response - backend not available');
      return { 
        id: Date.now(), 
        ...studentData, 
        check_in_date: new Date().toISOString().split('T')[0],
        status: 'active'
      };
    }
  },

  // Rooms
  getRooms: async () => {
    try {
      const response = await fetch(`${API_URL}/rooms`);
      if (response.ok) {
        return await response.json();
      } else {
        return [
          { id: 1, room_number: "101", capacity: 2, occupied: 1, type: "Double", rent: 500 },
          { id: 2, room_number: "102", capacity: 1, occupied: 1, type: "Single", rent: 400 },
          { id: 3, room_number: "103", capacity: 3, occupied: 0, type: "Triple", rent: 600 }
        ];
      }
    } catch (error) {
      console.log('Using mock data - backend not available');
      return [
        { id: 1, room_number: "101", capacity: 2, occupied: 1, type: "Double", rent: 500 },
        { id: 2, room_number: "102", capacity: 1, occupied: 1, type: "Single", rent: 400 },
        { id: 3, room_number: "103", capacity: 3, occupied: 0, type: "Triple", rent: 600 }
      ];
    }
  },

  // Payments
  getPayments: async () => {
    try {
      const response = await fetch(`${API_URL}/payments`);
      if (response.ok) {
        return await response.json();
      } else {
        return [
          { id: 1, student_name: "John Doe", amount: 500, payment_type: "rent", payment_date: "2024-01-22", status: "completed" },
          { id: 2, student_name: "Jane Smith", amount: 400, payment_type: "rent", payment_date: "2024-01-22", status: "completed" }
        ];
      }
    } catch (error) {
      console.log('Using mock data - backend not available');
      return [
        { id: 1, student_name: "John Doe", amount: 500, payment_type: "rent", payment_date: "2024-01-22", status: "completed" },
        { id: 2, student_name: "Jane Smith", amount: 400, payment_type: "rent", payment_date: "2024-01-22", status: "completed" }
      ];
    }
  }
};

export default apiService;
