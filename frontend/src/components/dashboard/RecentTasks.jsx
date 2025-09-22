import { useTasks } from "../../hooks/useTasks";
import { Link } from "react-router-dom";

const RecentTasks = () => {
  const { tasks } = useTasks();
  const recentTasks = tasks.slice(0, 5);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (recentTasks.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow p-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Recent Tasks</h3>
        <p className='text-gray-500 text-center py-8'>No tasks yet</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>Recent Tasks</h3>
        <Link
          to='/tasks'
          className='text-blue-600 hover:text-blue-700 text-sm font-medium'
        >
          View all
        </Link>
      </div>

      <div className='space-y-3'>
        {recentTasks.map((task) => (
          <div
            key={task._id}
            className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
          >
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate'>
                {task.title}
              </p>
              <p className='text-xs text-gray-500'>{task.team?.name}</p>
            </div>

            <div className='flex items-center space-x-2 ml-4'>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              <span className='text-xs text-gray-500'>
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;
