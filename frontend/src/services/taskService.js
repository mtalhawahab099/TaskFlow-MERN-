import api from "./api";

export const taskService = {
  // Get all tasks for user's teams
  getTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Update a task
  updateTask: async (taskId, updates) => {
    const response = await api.put(`/tasks/${taskId}`, updates);
    return response.data;
  },

  // Delete a task
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },
};
