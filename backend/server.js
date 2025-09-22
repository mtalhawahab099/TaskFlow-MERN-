import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; // Useful for later
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import teamRoutes from "./routes/teamRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables
config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (for frontend connection)
app.use(json()); // Parse JSON bodies
app.use(helmet()); // Adds security headers
// app.use(morgan("combined")); // Logs HTTP requests
app.use(morgan("dev")); // Logs HTTP requests

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the TaskFlow API!" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
