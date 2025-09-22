# TaskFlow - Team Task Management Application

![TaskFlow](https://img.shields.io/badge/React-18.2.0-blue)
![TaskFlow](https://img.shields.io/badge/Node.js-Express-brightgreen)
![TaskFlow](https://img.shields.io/badge/MongoDB-Mongoose-green)
![TaskFlow](https://img.shields.io/badge/Tailwind-CSS-blueviolet)

A modern, full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). TaskFlow helps teams collaborate effectively by managing tasks, tracking progress, and streamlining workflows.

![TaskFlow Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=TaskFlow+Dashboard)

---

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - JWT-based secure login/registration
- **Team Management** - Create teams and invite members
- **Task Management** - Full CRUD operations for tasks
- **Real-time Updates** - Instant UI updates across the application

### 🎨 Multiple View Modes
- **Grid View** - Visual card-based layout  
- **List View** - Compact, detailed list layout  
- **Board View** - Kanban-style workflow management  

### 🔍 Advanced Filtering & Search
- **Smart Search** - Search across task titles and descriptions  
- **Multi-filter Support** - Filter by status, priority, team, assignee  
- **Due Date Filtering** - Overdue, today, this week, future dates  
- **Assignee Filtering** - My tasks, unassigned, others' tasks  

### 📊 Productivity Features
- **Progress Tracking** - Visual progress bars for each task  
- **Priority System** - High, Medium, Low priority levels with color coding  
- **Due Date Management** - Smart date formatting and overdue alerts  
- **Assignment System** - Assign tasks to team members  
- **Status Workflow** - Backlog → To Do → In Progress → Review → Done  

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes  
- **Touch-Friendly** - Mobile-optimized interactions  
- **Adaptive Layouts** - Responsive grid and list views  

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components  
- **React Router** - Client-side routing  
- **Axios** - HTTP client for API calls  
- **Tailwind CSS** - Utility-first CSS framework  
- **Context API** - State management  

### Backend
- **Node.js** - Runtime environment  
- **Express.js** - Web framework  
- **MongoDB** - NoSQL database  
- **Mongoose** - MongoDB object modeling  
- **JWT** - JSON Web Tokens for authentication  
- **bcryptjs** - Password hashing  

### Development Tools
- **Vite** - Fast build tool and dev server  
- **Nodemon** - Auto-restart server during development  
- **Postman/Thunder Client** - API testing  

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)  
- MongoDB (local or MongoDB Atlas)  
- npm or yarn  

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/taskflow-app.git
cd taskflow-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in new terminal):**
```bash
cd frontend
npm run dev
```

The application will be available at:  
- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend API: [http://localhost:5000](http://localhost:5000)  

---

## 🏗️ Project Structure
```text
taskflow-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── taskController.js     # Task CRUD operations
│   │   └── teamController.js     # Team management
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── Task.js               # Task schema
│   │   ├── Team.js               # Team schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── taskRoutes.js         # Task routes
│   │   └── teamRoutes.js         # Team routes
│   └── server.js                 # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/             # Auth components
│   │   │   ├── layout/           # Layout components
│   │   │   ├── task/             # Task components
│   │   │   ├── team/             # Team components
│   │   │   └── ui/               # UI components
│   │   ├── contexts/             # React contexts
│   │   ├── hooks/                # Custom hooks
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   └── utils/                # Utility functions
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration  
- `POST /api/auth/login` - User login  
- `GET /api/auth/profile` - Get user profile  

### Teams
- `GET /api/teams` - Get user's teams  
- `POST /api/teams` - Create new team  
- `POST /api/teams/:teamId/members` - Add team member  

### Tasks
- `GET /api/tasks` - Get user's tasks  
- `POST /api/tasks` - Create new task  
- `PUT /api/tasks/:id` - Update task  
- `DELETE /api/tasks/:id` - Delete task  

---

## 🎮 Usage

### Getting Started
- Register a new account or login with existing credentials  
- Create a team from the dashboard or teams page  
- Invite members to your team by email  
- Create tasks and assign them to team members  
- Track progress using the board view and filters  

### Task Management
- **Create Tasks:** Click "Create Task" button from any view  
- **Update Status:** Use the status dropdown on task cards  
- **Filter Tasks:** Use the advanced filter panel to find specific tasks  
- **Switch Views:** Toggle between grid, list, and board views  

### Team Collaboration
- **Create Teams:** Organize work by projects or departments  
- **Add Members:** Invite team members by email  
- **Assign Tasks:** Delegate work to specific team members  
- **Track Progress:** Monitor team workload and completion rates  

---

## 🛠️ Development

### Running in Development Mode
```bash
# Backend with auto-reload
cd backend
npm run dev

# Frontend with hot reload
cd frontend
npm run dev
```

### Building for Production
```bash
# Build frontend
cd frontend
npm run build

# Start production server (backend)
cd backend
npm start
```

### Environment Variables

Backend `.env` (Production example):
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=your_production_client_url
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

### Development Guidelines
- Follow React best practices and hooks patterns  
- Use meaningful component and variable names  
- Add comments for complex logic  
- Ensure responsive design for all components  
- Test across different browsers and devices  

---
