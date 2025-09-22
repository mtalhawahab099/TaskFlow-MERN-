import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return { success: true, data: newTask };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create task";
      return { success: false, error: errorMsg };
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updates);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      return { success: true, data: updatedTask };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update task";
      return { success: false, error: errorMsg };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete task";
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
