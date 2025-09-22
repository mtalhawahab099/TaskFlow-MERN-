import Team from "../models/Team.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// @desc    Get all teams for the logged-in user
// @route   GET /api/teams
// @access  Private
export const getMyTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({ members: req.user._id })
    .populate("admin", "username email")
    .populate("members", "username email");

  res.json(teams);
});

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
export const createTeam = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please provide a team name");
  }

  const team = await Team.create({
    name,
    description,
    admin: req.user._id,
  });

  const createdTeam = await Team.findById(team._id)
    .populate("admin", "username email")
    .populate("members", "username email");

  res.status(201).json(createdTeam);
});

// @desc    Add a member to a team
// @route   POST /api/teams/:teamId/members
// @access  Private
export const addTeamMember = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const team = await Team.findById(req.params.teamId);

  if (!team) {
    res.status(404);
    throw new Error("Team not found");
  }

  if (team.admin.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized. Only team admin can add members.");
  }

  const userToAdd = await User.findOne({ email });
  if (!userToAdd) {
    res.status(404);
    throw new Error("User with that email not found");
  }

  if (team.members.includes(userToAdd._id)) {
    res.status(400);
    throw new Error("User is already a member of this team");
  }

  team.members.push(userToAdd._id);
  await team.save();

  const updatedTeam = await Team.findById(team._id)
    .populate("admin", "username email")
    .populate("members", "username email");

  res.status(200).json(updatedTeam);
});
