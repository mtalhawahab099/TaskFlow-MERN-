import { useTasks } from "../../hooks/useTasks";
import { useTeams } from "../../hooks/useTeams";

const StatsCards = () => {
  const { tasks } = useTasks();
  const { teams } = useTeams();

  const stats = {
    totalTeams: teams.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter((task) => task.status === "Done").length,
    overdueTasks: tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "Done"
    ).length,
  };

  const cards = [
    {
      title: "Total Teams",
      value: stats.totalTeams,
      icon: "👥",
      color: "bg-blue-500",
      text: "text-blue-500",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: "✅",
      color: "bg-green-500",
      text: "text-green-500",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: "🎯",
      color: "bg-purple-500",
      text: "text-purple-500",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: "⏰",
      color: "bg-red-500",
      text: "text-red-500",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {cards.map((card, index) => (
        <div key={index} className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>{card.title}</p>
              <p className='text-2xl font-bold text-gray-900'>{card.value}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center`}
            >
              <span className='text-white text-xl'>{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
