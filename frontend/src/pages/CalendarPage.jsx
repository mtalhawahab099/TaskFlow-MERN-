const CalendarPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Calendar</h1>
          <p className='text-gray-600'>
            View your tasks on a calendar timeline
          </p>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow p-6 text-center'>
        <div className='text-gray-400 text-lg mb-4'>📅</div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Calendar View
        </h3>
        <p className='text-gray-600'>This feature is coming soon!</p>
        <p className='text-sm text-gray-500 mt-2'>
          Track your tasks with a visual calendar interface
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
