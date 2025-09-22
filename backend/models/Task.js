import mongoose from "mongoose";

const statusOptions = ["Backlog", "To Do", "In Progress", "Review", "Done"];
const priorityOptions = ["Low", "Medium", "High"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      trim: true,
      maxlength: [100, "Task title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: statusOptions,
      default: "Backlog",
    },
    priority: {
      type: String,
      enum: priorityOptions,
      default: "Medium",
    },
    dueDate: {
      type: Date,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
