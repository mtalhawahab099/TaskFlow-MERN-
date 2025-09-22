import express from "express";
import {
  getMyTeams,
  createTeam,
  addTeamMember,
} from "../controllers/teamController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getMyTeams).post(protect, createTeam);

router.route("/:teamId/members").post(protect, addTeamMember);

export default router;
