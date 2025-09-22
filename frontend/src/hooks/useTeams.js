import { useState, useEffect } from "react";
import { teamService } from "../services/teamService";

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const teamsData = await teamService.getMyTeams();
      setTeams(teamsData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch teams");
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamData) => {
    try {
      const newTeam = await teamService.createTeam(teamData);
      setTeams((prev) => [...prev, newTeam]);
      return { success: true, data: newTeam };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create team";
      return { success: false, error: errorMsg };
    }
  };

  const addMember = async (teamId, email) => {
    try {
      const updatedTeam = await teamService.addTeamMember(teamId, email);
      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? updatedTeam : team))
      );
      return { success: true, data: updatedTeam };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add member";
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return {
    teams,
    loading,
    error,
    createTeam,
    addMember,
    refetch: fetchTeams,
  };
};
