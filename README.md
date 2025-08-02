# 🏠 Hostel Management System

## 🌐 **LIVE DEMO**
**🔗 Live Application**: [https://hostel-management-rxq5ps1st-sanskar-sains-projects.vercel.app](https://hostel-management-rxq5ps1st-sanskar-sains-projects.vercel.app)

**👤 Demo Credentials:**
- **Student**: `student@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

A modern, responsive web application for managing hostel operations with a beautiful UI and comprehensive features.

## ✨ Features

### 🎨 Modern UI/UX
- **Modern Design** with Poppins & Inter fonts
- **Dark/Light Theme** toggle with smooth transitions
- **Responsive Design** that works on all devices
- **Beautiful Animations** and hover effects
- **Custom Icons** and visual elements

### 👥 User Management
- **Student & Admin** role-based access
- **User Authentication** with secure login
- **Profile Management** with avatar display
- **Custom Logout** confirmation modal

### 📊 Dashboard & Analytics
- **Real-time Statistics** with visual cards
- **Analytics Overview** with progress bars
- **Quick Actions** for common tasks
- **Performance Metrics** and insights

### 🏠 Core Features
- **Student Management** - Add, edit, view students
- **Room Management** - Allocate and track rooms
- **Payment Tracking** - Monitor fees and payments
- **Visitor Management** - Track guest entries
- **Maintenance Requests** - Handle repair requests
- **Emergency Alerts** - Critical notifications
- **Outpass System** - Student exit permissions

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **Google Fonts** - Poppins & Inter typography

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **Axios** - HTTP client

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sanskar-Sain/Hostel-management-system.git
   cd Hostel-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   # Start backend server (from root directory)
   npm start
   
   # Start frontend (in another terminal, from client directory)
   cd client
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 Demo Credentials

### Student Account
- **Email:** student@demo.com
- **Password:** password123

### Admin Account
- **Email:** admin@demo.com
- **Password:** password123

## 🎨 UI Features

### Modern Design Elements
- **Gradient backgrounds** and buttons
- **Rounded corners** and soft shadows
- **Smooth animations** and transitions
- **Color-coded cards** for different data types
- **Responsive grid layouts**

### Theme Support
- **Light/Dark mode** toggle
- **CSS variables** for consistent theming
- **Automatic theme persistence**
- **Smooth theme transitions**

### Interactive Elements
- **Hover effects** on buttons and cards
- **Loading animations** with spinners
- **Modal dialogs** for confirmations
- **Toast notifications** for feedback

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command:** `cd client && npm run build`
   - **Output Directory:** `client/build`
   - **Install Command:** `npm install && cd client && npm install`

### Environment Variables
Set the following environment variables in Vercel:
- `REACT_APP_API_URL` - Your backend API URL

## 🛠️ Development

### Project Structure
```
hostel-management-app/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── App.css        # Main styles
│   └── package.json
├── server/                # Node.js backend
│   └── index.js           # Server entry point
├── package.json           # Root package.json
└── README.md
```

### Available Scripts

#### Root Directory
- `npm start` - Start backend server
- `npm install` - Install root dependencies

#### Client Directory
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **Google Fonts** for beautiful typography
- **Vercel** for seamless deployment
- **Create React App** for the development setup

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by the Hostel Management Team**
