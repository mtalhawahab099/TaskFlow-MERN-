import Task from "../models/Task.js";
import Team from "../models/Team.js";
import asyncHandler from "express-async-handler";

// @desc    Get all tasks for user's teams
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const userTeams = await Team.find({ members: req.user._id }).select("_id");
  const teamIds = userTeams.map((team) => team._id);

  const tasks = await Task.find({ team: { $in: teamIds } })
    .populate("assignee", "username email")
    .populate("createdBy", "username email")
    .populate("team", "name");

  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, assignee, team } =
    req.body;

  if (!title || !team) {
    res.status(400);
    throw new Error("Please provide a title and team for the task");
  }

  const userTeam = await Team.findOne({ _id: team, members: req.user._id });
  if (!userTeam) {
    res.status(403);
    throw new Error("Not authorized to create tasks for this team");
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    assignee,
    team,
    createdBy: req.user._id,
  });

  const createdTask = await Task.findById(task._id)
    .populate("assignee", "username email")
    .populate("createdBy", "username email")
    .populate("team", "name");

  res.status(201).json(createdTask);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const userIsTeamMember = await Team.findOne({
    _id: task.team,
    members: req.user._id,
  });

  if (!userIsTeamMember) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("assignee", "username email")
    .populate("createdBy", "username email")
    .populate("team", "name");

  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const taskTeam = await Team.findById(task.team);
  const userIsCreator = task.createdBy.toString() === req.user._id.toString();
  const userIsTeamAdmin = taskTeam.admin.toString() === req.user._id.toString();

  if (!userIsCreator && !userIsTeamAdmin) {
    res.status(403);
    throw new Error("Not authorized to delete this task");
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json({
    message: "Task removed",
    id: req.params.id,
  });
});
