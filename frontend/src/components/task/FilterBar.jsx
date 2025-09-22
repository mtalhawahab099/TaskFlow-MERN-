import { useState } from "react";
import { useTeams } from "../../hooks/useTeams";

const FilterBar = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  sortOrder,
  onSortChange,
  onClearFilters,
  totalTasks,
  filteredTasks,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { teams } = useTeams();

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "Backlog", label: "Backlog" },
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Review", label: "Review" },
    { value: "Done", label: "Done" },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const assigneeOptions = [
    { value: "all", label: "Everyone" },
    { value: "me", label: "Assigned to me" },
    { value: "unassigned", label: "Unassigned" },
    { value: "others", label: "Assigned to others" },
  ];

  const dueDateOptions = [
    { value: "all", label: "Any due date" },
    { value: "overdue", label: "Overdue" },
    { value: "today", label: "Due today" },
    { value: "thisWeek", label: "Due this week" },
    { value: "future", label: "Future due dates" },
    { value: "noDate", label: "No due date" },
  ];

  const sortOptions = [
    { value: "createdAt", label: "Date created" },
    { value: "dueDate", label: "Due date" },
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
    { value: "status", label: "Status" },
  ];

  const hasActiveFilters =
    searchQuery || Object.values(filters).some((filter) => filter !== "all");

  return (
    <div className='bg-white rounded-lg shadow p-4'>
      {/* Search and main controls */}
      <div className='flex flex-col lg:flex-row gap-4 mb-4'>
        {/* Search input */}
        <div className='flex-1'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search tasks...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>

        {/* Filter and sort buttons */}
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              hasActiveFilters
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className='flex items-center gap-2'>
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
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                />
              </svg>
              Filters
              {hasActiveFilters && (
                <span className='bg-blue-600 text-white text-xs px-2 py-1 rounded-full'>
                  {filteredTasks}/{totalTasks}
                </span>
              )}
            </span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onSortChange(sortBy)}
            className='p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
            title={sortOrder === "asc" ? "Ascending" : "Descending"}
          >
            <svg
              className={`w-4 h-4 ${
                sortOrder === "asc" ? "transform rotate-180" : ""
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 11l5-5m0 0l5 5m-5-5v12'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Advanced filters */}
      {isFiltersOpen && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-200'>
          {/* Status filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                onFiltersChange({ ...filters, status: e.target.value })
              }
              className='block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) =>
                onFiltersChange({ ...filters, priority: e.target.value })
              }
              className='block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Team filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Team
            </label>
            <select
              value={filters.team}
              onChange={(e) =>
                onFiltersChange({ ...filters, team: e.target.value })
              }
              className='block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            >
              <option value='all'>All Teams</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assignee filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Assignee
            </label>
            <select
              value={filters.assignee}
              onChange={(e) =>
                onFiltersChange({ ...filters, assignee: e.target.value })
              }
              className='block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            >
              {assigneeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Due date filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Due Date
            </label>
            <select
              value={filters.dueDate}
              onChange={(e) =>
                onFiltersChange({ ...filters, dueDate: e.target.value })
              }
              className='block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            >
              {dueDateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
