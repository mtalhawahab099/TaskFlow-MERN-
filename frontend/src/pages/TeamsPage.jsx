import TeamList from "../components/team/TeamList";

const TeamsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Teams</h1>
          <p className='text-gray-600'>
            Manage your teams and collaborate with others
          </p>
        </div>
      </div>

      <TeamList />
    </div>
  );
};

export default TeamsPage;
