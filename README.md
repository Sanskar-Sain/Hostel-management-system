
# 🏠 Hostel Management System

## 🌐 Live Demo
**🔗 [Live Application on Vercel](https://hostel-management-rxq5ps1st-sanskar-sains-projects.vercel.app)**

## 📋 Overview
A modern, responsive web application for managing hostel operations. Built with React (frontend) and Node.js/Express with SQLite (backend).

## ✨ Main Features
- Student management: add, edit, view, and delete students
- Room management: add, view rooms
- Payment tracking: add, view payments
- Dashboard with statistics (students, rooms, revenue, available rooms)
- Role-based login (Student/Admin) [Demo only, not secure]
- Responsive UI with light/dark mode

## 🚀 Tech Stack
**Frontend:** React 19, React Router, CSS3, Google Fonts
**Backend:** Node.js, Express.js, SQLite

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Running Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/Sanskar-Sain/Hostel-management-system.git
   cd Hostel-management-system
   ```
2. **Install backend dependencies**
   ```bash
   npm install
   ```
3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```
4. **Start backend server** (from root directory)
   ```bash
   npm start
   ```
5. **Start frontend** (in another terminal, from `client` directory)
   ```bash
   npm start
   ```
6. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## �️ Project Structure
```
hostel-management-app/
├── client/           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/           # Node.js backend
│   └── index.js
├── package.json      # Root scripts & dependencies
└── README.md
```

## 🛠️ Available Scripts

**Root directory:**
- `npm start` — Start backend server
- `npm install` — Install backend dependencies

**Client directory:**
- `npm start` — Start React development server
- `npm run build` — Build frontend for production
- `npm test` — Run frontend tests

## 🎨 UI & UX
- Responsive design (desktop, tablet, mobile)
- Light/Dark mode toggle
- Modern, clean interface

## ⚠️ Notes
- Demo login is for demonstration only; authentication is not secure for production.
- No visitor, maintenance, emergency, or outpass modules are present in this codebase.
- No LICENSE file is present. Add one if you wish to open source the project.

## 🙏 Acknowledgments
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Vercel](https://vercel.com/)

---
**Made with ❤️ by the Hostel Management Team**

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
