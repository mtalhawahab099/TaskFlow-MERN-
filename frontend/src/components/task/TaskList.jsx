import { useState, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useTeams } from "../../hooks/useTeams";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import ViewToggle from "./ViewToggle";
import FilterBar from "./FilterBar";

const TaskList = () => {
  const { tasks, loading, error, refetch } = useTasks();
  const { teams } = useTeams();
  const { user } = useAuth();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'list', 'board'
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    team: "all",
    assignee: "all",
    dueDate: "all",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      // Search filter
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }

      // Priority filter
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }

      // Team filter
      if (filters.team !== "all" && task.team?._id !== filters.team) {
        return false;
      }

      // Assignee filter
      if (filters.assignee !== "all") {
        if (filters.assignee === "me" && task.assignee?._id !== user?._id) {
          return false;
        }
        if (filters.assignee === "unassigned" && task.assignee) {
          return false;
        }
        if (
          filters.assignee === "others" &&
          (!task.assignee || task.assignee?._id === user?._id)
        ) {
          return false;
        }
      }

      // Due date filter
      if (filters.dueDate !== "all") {
        const now = new Date();
        const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

        switch (filters.dueDate) {
          case "overdue":
            if (!taskDueDate || taskDueDate >= now || task.status === "Done")
              return false;
            break;
          case "today":
            if (
              !taskDueDate ||
              taskDueDate.toDateString() !== now.toDateString()
            )
              return false;
            break;
          case "thisWeek":
            if (!taskDueDate) return false;
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            if (taskDueDate < weekStart || taskDueDate > weekEnd) return false;
            break;
          case "future":
            if (!taskDueDate || taskDueDate <= now) return false;
            break;
          case "noDate":
            if (taskDueDate) return false;
            break;
          default:
            break;
        }
      }

      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "priority":
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case "dueDate":
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          break;
        case "status":
          const statusOrder = {
            Backlog: 1,
            "To Do": 2,
            "In Progress": 3,
            Review: 4,
            Done: 5,
          };
          aValue = statusOrder[a.status] || 0;
          bValue = statusOrder[b.status] || 0;
          break;
        case "createdAt":
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tasks, searchQuery, filters, sortBy, sortOrder, user?._id]);

  // Group tasks by status for board view
  const tasksByStatus = useMemo(() => {
    const statusGroups = {
      Backlog: [],
      "To Do": [],
      "In Progress": [],
      Review: [],
      Done: [],
    };

    filteredAndSortedTasks.forEach((task) => {
      if (statusGroups[task.status]) {
        statusGroups[task.status].push(task);
      }
    });

    return statusGroups;
  }, [filteredAndSortedTasks]);

  // Statistics
  const stats = useMemo(
    () => ({
      total: filteredAndSortedTasks.length,
      completed: filteredAndSortedTasks.filter((task) => task.status === "Done")
        .length,
      inProgress: filteredAndSortedTasks.filter(
        (task) => task.status === "In Progress"
      ).length,
      overdue: filteredAndSortedTasks.filter(
        (task) =>
          task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.status !== "Done"
      ).length,
      assignedToMe: filteredAndSortedTasks.filter(
        (task) => task.assignee?._id === user?._id
      ).length,
    }),
    [filteredAndSortedTasks, user?._id]
  );

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      team: "all",
      assignee: "all",
      dueDate: "all",
    });
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <LoadingSpinner size='large' />
        <span className='ml-3 text-gray-600'>Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
        <div className='flex items-center mb-3'>
          <div className='text-red-600 mr-2'>⚠️</div>
          <h3 className='text-red-800 font-semibold'>Error loading tasks</h3>
        </div>
        <p className='text-red-700 text-sm mb-4'>{error}</p>
        <button
          onClick={refetch}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium'
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header with stats and actions */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Tasks</h2>
          <p className='text-gray-600 text-sm'>
            {stats.total} tasks • {stats.completed} completed •{" "}
            {stats.assignedToMe} assigned to you
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

          <button
            onClick={() => setIsCreateModalOpen(true)}
            disabled={teams.length === 0}
            className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 4v16m8-8H4'
              />
            </svg>
            Create Task
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onClearFilters={clearFilters}
        totalTasks={stats.total}
        filteredTasks={filteredAndSortedTasks.length}
      />

      {/* Results count and active filters */}
      {(searchQuery ||
        Object.values(filters).some((filter) => filter !== "all")) && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-blue-800 text-sm'>
                Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
              </span>
              {searchQuery && (
                <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'>
                  Search: "{searchQuery}"
                </span>
              )}
              {Object.entries(filters).map(([key, value]) => {
                if (value !== "all") {
                  return (
                    <span
                      key={key}
                      className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'
                    >
                      {key}: {value}
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <button
              onClick={clearFilters}
              className='text-blue-600 hover:text-blue-800 text-sm font-medium'
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredAndSortedTasks.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg shadow'>
          <div className='text-6xl mb-4'>📋</div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            {tasks.length === 0
              ? "No tasks yet"
              : "No tasks match your filters"}
          </h3>
          <p className='text-gray-600 mb-6'>
            {tasks.length === 0
              ? "Get started by creating your first task."
              : "Try adjusting your search or filters to see more results."}
          </p>
          {teams.length > 0 ? (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium'
            >
              Create Your First Task
            </button>
          ) : (
            <p className='text-sm text-gray-500'>
              You need to create a team before you can add tasks.
            </p>
          )}
        </div>
      )}

      {/* Task Views */}
      {filteredAndSortedTasks.length > 0 && (
        <>
          {/* Board View */}
          {viewMode === "board" && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className='bg-gray-50 rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='font-semibold text-gray-700 capitalize'>
                      {status}
                    </h3>
                    <span className='bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full'>
                      {statusTasks.length}
                    </span>
                  </div>
                  <div className='space-y-3 min-h-[100px]'>
                    {statusTasks.map((task) => (
                      <TaskCard key={task._id} task={task} viewMode='grid' />
                    ))}
                    {statusTasks.length === 0 && (
                      <div className='text-center py-8 text-gray-400'>
                        <div className='text-2xl mb-2'>📭</div>
                        <p className='text-sm'>No tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {filteredAndSortedTasks.map((task) => (
                <TaskCard key={task._id} task={task} viewMode='grid' />
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className='space-y-3'>
              {filteredAndSortedTasks.map((task) => (
                <TaskCard key={task._id} task={task} viewMode='list' />
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default TaskList;
