import { useAuth } from "../contexts/AuthContext";
import StatsCards from "../components/dashboard/StatsCards";
import RecentTasks from "../components/dashboard/RecentTasks";
import TeamList from "../components/team/TeamList";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white'>
        <h2 className='text-2xl font-bold mb-2'>
          Welcome back, {user?.username}!
        </h2>
        <p className='opacity-90'>
          Here's what's happening with your teams and tasks today.
        </p>
      </div>

      {/* Statistics */}
      <StatsCards />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Tasks */}
        <RecentTasks />

        {/* Quick Actions */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <a
              href='#create-team'
              className='block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
            >
              <div className='flex items-center'>
                <span className='text-blue-600 text-lg mr-3'>👥</span>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Create a new team
                  </p>
                  <p className='text-xs text-gray-500'>
                    Start collaborating with others
                  </p>
                </div>
              </div>
            </a>

            <a
              href='#create-task'
              className='block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'
            >
              <div className='flex items-center'>
                <span className='text-green-600 text-lg mr-3'>✅</span>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Add a new task
                  </p>
                  <p className='text-xs text-gray-500'>Get things done</p>
                </div>
              </div>
            </a>

            <a
              href='#invite'
              className='block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors'
            >
              <div className='flex items-center'>
                <span className='text-purple-600 text-lg mr-3'>📨</span>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Invite team members
                  </p>
                  <p className='text-xs text-gray-500'>Grow your team</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Teams Preview */}
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-medium text-gray-900'>Your Teams</h3>
          <a
            href='#view-all-teams'
            className='text-blue-600 hover:text-blue-700 text-sm font-medium'
          >
            View all teams
          </a>
        </div>
        <TeamList />
      </div>
    </div>
  );
};

export default Dashboard;
