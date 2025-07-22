const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./hostel.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      room_number TEXT,
      check_in_date TEXT,
      status TEXT DEFAULT 'active'
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_number TEXT UNIQUE NOT NULL,
      capacity INTEGER NOT NULL,
      occupied INTEGER DEFAULT 0,
      type TEXT NOT NULL,
      rent REAL NOT NULL
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      amount REAL NOT NULL,
      payment_date TEXT NOT NULL,
      payment_type TEXT NOT NULL,
      status TEXT DEFAULT 'completed',
      FOREIGN KEY(student_id) REFERENCES students(id)
    )`);
    
    console.log('Database tables created successfully.');
  }
});

// Routes

// Get all students
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name, email, phone, room_number } = req.body;
  const check_in_date = new Date().toISOString().split('T')[0];
  
  db.run(`INSERT INTO students (name, email, phone, room_number, check_in_date) 
          VALUES (?, ?, ?, ?, ?)`, 
         [name, email, phone, room_number, check_in_date], 
         function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, email, phone, room_number, check_in_date });
  });
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const { name, email, phone, room_number, status } = req.body;
  const { id } = req.params;
  
  db.run(`UPDATE students SET name = ?, email = ?, phone = ?, room_number = ?, status = ? 
          WHERE id = ?`, 
         [name, email, phone, room_number, status, id], 
         function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student updated successfully' });
  });
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM students WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

// Get all rooms
app.get('/api/rooms', (req, res) => {
  db.all('SELECT * FROM rooms', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new room
app.post('/api/rooms', (req, res) => {
  const { room_number, capacity, type, rent } = req.body;
  
  db.run(`INSERT INTO rooms (room_number, capacity, type, rent) 
          VALUES (?, ?, ?, ?)`, 
         [room_number, capacity, type, rent], 
         function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, room_number, capacity, type, rent });
  });
});

// Get all payments
app.get('/api/payments', (req, res) => {
  db.all(`SELECT p.*, s.name as student_name FROM payments p 
          JOIN students s ON p.student_id = s.id`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new payment
app.post('/api/payments', (req, res) => {
  const { student_id, amount, payment_type } = req.body;
  const payment_date = new Date().toISOString().split('T')[0];
  
  db.run(`INSERT INTO payments (student_id, amount, payment_date, payment_type) 
          VALUES (?, ?, ?, ?)`, 
         [student_id, amount, payment_date, payment_type], 
         function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, student_id, amount, payment_date, payment_type });
  });
});

// Dashboard stats
app.get('/api/dashboard', (req, res) => {
  const stats = {};
  
  // Get total students
  db.get('SELECT COUNT(*) as total FROM students WHERE status = "active"', [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    stats.totalStudents = row.total;
    
    // Get total rooms
    db.get('SELECT COUNT(*) as total FROM rooms', [], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      stats.totalRooms = row.total;
      
      // Get total payments this month
      const currentMonth = new Date().toISOString().slice(0, 7);
      db.get('SELECT SUM(amount) as total FROM payments WHERE payment_date LIKE ?', [currentMonth + '%'], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        stats.monthlyRevenue = row.total || 0;
        
        // Get available rooms
        db.get('SELECT SUM(capacity - occupied) as available FROM rooms', [], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          stats.availableRooms = row.available || 0;
          
          res.json(stats);
        });
      });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
