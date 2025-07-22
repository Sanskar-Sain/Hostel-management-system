# 🏠 Hostel Management System

## 🌐 **LIVE DEMO**
**🔗 Live Application**: [https://hostel-management-ngvysgyfy-sanskar-sains-projects.vercel.app](https://hostel-management-ngvysgyfy-sanskar-sains-projects.vercel.app)

**👤 Demo Credentials:**
- **Student**: `student@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

A comprehensive web-based hostel management application built with React and Node.js, featuring student management, room allocation, payment tracking, outpass generation, visitor management, maintenance requests, and emergency services.

## ✨ Features

### 🔐 Authentication System
- Student and Admin role-based access
- Secure login and registration
- Session management

### 📊 Dashboard
- Real-time statistics and overview
- Quick access to all modules
- User-specific views

### 👥 Student Management (Admin Only)
- Add, edit, and manage student records
- Track room assignments and status
- View student information and history

### 🏠 Room Management (Admin Only)
- Add and manage room information
- Track room capacity and occupancy
- Monitor room availability

### 💰 Payment Management (Admin Only)
- Record and track payments
- Generate payment reports
- Monitor monthly revenue

### 🚪 Outpass Management
- **Students**: Request outpass with detailed information
- **Admin**: Approve/reject outpass requests
- Track exit and return times
- Emergency contact management

### 👨‍👩‍👧‍👦 Visitor Management
- **Students**: Pre-register visitors
- **Admin**: Approve visits and manage check-in/out
- ID proof verification
- Real-time visitor tracking

### 🔧 Maintenance Requests
- **Students**: Submit maintenance requests
- **Admin**: Assign technicians and track progress
- Priority-based categorization
- Status tracking (Pending → In-Progress → Completed)

### 🚨 Emergency Services
- **Panic Button**: 5-second countdown emergency alert
- Emergency contact directory
- Safety guidelines and tips
- Real-time emergency alert system

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hostel-management-app
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   npm run dev
   ```
   This starts the Node.js server on `http://localhost:5000`

2. **Start the frontend (in a new terminal):**
   ```bash
   npm run client
   ```
   This starts the React app on `http://localhost:3000`

3. **Run both simultaneously:**
   ```bash
   # Install concurrently if not already installed
   npm install -g concurrently
   
   # Run both frontend and backend
   npm run dev & npm run client
   ```

## 📱 Usage

### Login Credentials (Demo)
- **Student Account**: 
  - Email: `student@demo.com`
  - Password: `password123`

- **Admin Account**:
  - Email: `admin@demo.com`
  - Password: `password123`

### Student Features
1. **Dashboard**: View personal statistics and quick actions
2. **Outpass Requests**: Submit and track outpass requests
3. **Visitor Registration**: Register visitors for approval
4. **Maintenance Requests**: Report maintenance issues
5. **Emergency Services**: Access emergency contacts and panic button

### Admin Features
1. **All Student Features** +
2. **Student Management**: Add, edit, and manage student records
3. **Room Management**: Manage room information and assignments
4. **Payment Tracking**: Record and monitor payments
5. **Approve Requests**: Handle outpass and visitor approvals
6. **Maintenance Management**: Assign and track maintenance tasks

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API communication
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
hostel-management-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Global styles
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   └── index.js           # Server entry point
├── package.json           # Backend dependencies
├── hostel.db             # SQLite database (auto-created)
└── README.md
```

## 🔧 API Endpoints

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Add new room

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Add new payment

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🚨 Emergency Features

### Panic Button
- 5-second countdown before activation
- Sends location and user details to authorities
- Cannot be activated multiple times in quick succession

### Emergency Contacts
- Campus Security: 911
- Medical Emergency: 108
- Fire Department: 101
- Hostel Warden: +1234567890
- Maintenance Emergency: +1987654321

## 🔒 Security Features

- Role-based access control
- Session management
- Input validation
- SQL injection prevention
- XSS protection

## 🌐 Deployment

### Live Application
The application is deployed on **Vercel** and is accessible at:
**[https://hostel-management-ngvysgyfy-sanskar-sains-projects.vercel.app](https://hostel-management-ngvysgyfy-sanskar-sains-projects.vercel.app)**

### Deploy Your Own
1. **Fork this repository**
2. **Connect to Vercel**: Import your forked repository
3. **Configure**: Set root directory to `client`
4. **Deploy**: Vercel will automatically build and deploy

### Environment Configuration
- **Frontend**: Uses mock data fallback for demo purposes
- **Production Ready**: API service with graceful fallback
- **Auto-Deploy**: Connected to GitHub for automatic deployments

## 📊 Database Schema

### Students Table
- id, name, email, phone, room_number, check_in_date, status

### Rooms Table
- id, room_number, capacity, occupied, type, rent

### Payments Table
- id, student_id, amount, payment_date, payment_type, status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demonstration application. In a production environment, ensure proper security measures, database optimization, and error handling are implemented.
