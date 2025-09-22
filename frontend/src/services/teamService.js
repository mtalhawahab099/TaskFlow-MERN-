import api from "./api";

export const teamService = {
  // Get all teams for the current user
  getMyTeams: async () => {
    const response = await api.get("/teams");
    return response.data;
  },

  // Create a new team
  createTeam: async (teamData) => {
    const response = await api.post("/teams", teamData);
    return response.data;
  },

  // Add a member to a team
  addTeamMember: async (teamId, email) => {
    const response = await api.post(`/teams/${teamId}/members`, { email });
    return response.data;
  },

  // Get team by ID
  getTeamById: async (teamId) => {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  },
};
