import TaskList from "../components/task/TaskList";

const TasksPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Tasks</h1>
          <p className='text-gray-600'>Manage your tasks and track progress</p>
        </div>
      </div>

      <TaskList />
    </div>
  );
};

export default TasksPage;
