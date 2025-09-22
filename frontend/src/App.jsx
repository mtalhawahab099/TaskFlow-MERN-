import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TeamsPage from "./pages/TeamsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protected routes with layout */}
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to='/dashboard' replace />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='teams' element={<TeamsPage />} />
              <Route path='tasks' element={<TasksPage />} />
              <Route path='calendar' element={<CalendarPage />} />
              {/* Add more protected routes here later */}
            </Route>

            {/* Catch all route */}
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
