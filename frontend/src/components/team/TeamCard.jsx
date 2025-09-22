import { useState } from "react";
import AddMemberModal from "./AddMemberModal";

const TeamCard = ({ team }) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  return (
    <>
      <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          {team.name}
        </h3>

        {team.description && (
          <p className='text-gray-600 mb-4'>{team.description}</p>
        )}

        <div className='space-y-3'>
          <div>
            <span className='text-sm font-medium text-gray-500'>Admin:</span>
            <p className='text-sm text-gray-900'>
              {team.admin?.username || "Unknown"}
            </p>
          </div>

          <div>
            <span className='text-sm font-medium text-gray-500'>
              Members ({team.members?.length || 0}):
            </span>
            <div className='flex flex-wrap gap-1 mt-1'>
              {team.members?.slice(0, 3).map((member) => (
                <span
                  key={member._id}
                  className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                >
                  {member.username}
                </span>
              ))}
              {team.members?.length > 3 && (
                <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800'>
                  +{team.members.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {team.admin._id === team.admin._id && ( // Simple check if current user is admin
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className='mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors'
          >
            Add Member
          </button>
        )}
      </div>

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        team={team}
      />
    </>
  );
};

export default TeamCard;
