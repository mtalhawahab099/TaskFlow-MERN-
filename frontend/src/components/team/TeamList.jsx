import { useState } from "react";
import { useTeams } from "../../hooks/useTeams";
import LoadingSpinner from "../ui/LoadingSpinner";
import TeamCard from "./TeamCard";
import CreateTeamModal from "./CreateTeamModal";

const TeamList = () => {
  const { teams, loading, error, createTeam } = useTeams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTeam = async (teamData) => {
    const result = await createTeam(teamData);
    if (result.success) {
      setIsCreateModalOpen(false);
    }
    return result;
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <LoadingSpinner size='large' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
        {error}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-gray-900'>My Teams</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium'
        >
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <p className='text-gray-500'>You haven't joined any teams yet.</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium'
          >
            Create Your First Team
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTeam={handleCreateTeam}
      />
    </div>
  );
};

export default TeamList;
