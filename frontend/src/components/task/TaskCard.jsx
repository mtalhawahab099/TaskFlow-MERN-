import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useTeams } from "../../hooks/useTeams";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onDragStart, onDragEnd, viewMode = "grid" }) => {
  const { updateTask, deleteTask } = useTasks();
  const { teams } = useTeams();
  const { success, error: toastError } = useToast();
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (task.status === newStatus) return;

    setIsStatusChanging(true);
    try {
      await updateTask(task._id, { status: newStatus });
      success(`Task moved to ${newStatus}`);
    } catch (err) {
      toastError("Failed to update task status");
    } finally {
      setIsStatusChanging(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(true);
    try {
      await deleteTask(task._id);
      success("Task deleted successfully");
    } catch (err) {
      toastError("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "To Do":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Backlog":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";

    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow =
      new Date(now.setDate(now.getDate() + 1)).toDateString() ===
      date.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";
  const isDueSoon =
    task.dueDate &&
    new Date(task.dueDate) > new Date() &&
    new Date(task.dueDate) <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) &&
    task.status !== "Done";

  const isAssignedToMe = task.assignee?._id === user?._id;
  const isCreatedByMe = task.createdBy?._id === user?._id;

  const taskTeam = teams.find((team) => team._id === task.team?._id);
  const teamMembers = taskTeam?.members || [];

  // Calculate progress if task has subtasks or estimated time
  const progress = Math.floor(Math.random() * 100); // Mock progress - replace with real data

  if (viewMode === "list") {
    return (
      <div className='bg-white border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-all'>
        <div className='p-4'>
          <div className='flex items-start justify-between'>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-2'>
                <h4 className='font-semibold text-gray-900 text-sm truncate'>
                  {task.title}
                </h4>
                {isAssignedToMe && (
                  <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
                    Assigned to me
                  </span>
                )}
              </div>

              <div className='flex items-center gap-3 text-xs text-gray-600 mb-3'>
                <span className='flex items-center gap-1'>
                  <svg
                    className='w-3 h-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  {task.team?.name}
                </span>

                <span
                  className={`flex items-center gap-1 ${
                    isOverdue
                      ? "text-red-600"
                      : isDueSoon
                      ? "text-orange-600"
                      : ""
                  }`}
                >
                  <svg
                    className='w-3 h-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  {formatDate(task.dueDate)}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(
                    task.priority
                  )}-100 text-${getPriorityColor(task.priority)}-800`}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2 ml-4'>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className='p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors'
                title='Edit task'
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
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        draggable
        onDragStart={(e) => onDragStart?.(e, task)}
        onDragEnd={onDragEnd}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-move group relative hover-lift ${
          isOverdue ? "border-red-200" : isDueSoon ? "border-orange-200" : ""
        }`}
      >
        {/* Priority indicator bar */}
        <div
          className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${getPriorityColor(
            task.priority
          )}`}
        />

        {/* Header with title and actions */}
        <div className='p-4 pb-3'>
          <div className='flex justify-between items-start mb-2'>
            <div className='flex-1 min-w-0'>
              <h4
                className='font-semibold text-gray-900 text-sm cursor-pointer hover:text-blue-600 transition-colors'
                onClick={toggleExpand}
              >
                {task.title}
              </h4>

              {/* Badges */}
              <div className='flex items-center gap-1 mt-1'>
                {isAssignedToMe && (
                  <span className='bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full'>
                    👤 Assigned to me
                  </span>
                )}
                {isCreatedByMe && (
                  <span className='bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full'>
                    🎯 Created by me
                  </span>
                )}
              </div>
            </div>

            <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className='p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors'
                title='Edit task'
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
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className='p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50'
                title='Delete task'
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
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Description with expand/collapse */}
          {task.description && (
            <div className='mb-3'>
              <p
                className={`text-gray-600 text-xs ${
                  isExpanded ? "" : "line-clamp-2"
                } transition-all`}
              >
                {task.description}
              </p>
              {task.description.length > 100 && (
                <button
                  onClick={toggleExpand}
                  className='text-blue-600 text-xs mt-1 hover:text-blue-800 transition-colors'
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}

          {/* Progress bar */}
          <div className='mb-3'>
            <div className='flex items-center justify-between text-xs text-gray-600 mb-1'>
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-1.5'>
              <div
                className={`h-1.5 rounded-full ${getPriorityColor(
                  task.priority
                )} transition-all duration-300`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Metadata grid */}
          <div className='grid grid-cols-2 gap-3 text-xs text-gray-600'>
            {/* Team */}
            <div className='flex items-center gap-2'>
              <svg
                className='w-3 h-3 text-gray-400 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='truncate' title={task.team?.name}>
                {task.team?.name}
              </span>
            </div>

            {/* Assignee */}
            <div className='flex items-center gap-2'>
              <svg
                className='w-3 h-3 text-gray-400 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span className='truncate' title={task.assignee?.username}>
                {task.assignee?.username || "Unassigned"}
              </span>
            </div>

            {/* Due Date */}
            <div className='flex items-center gap-2'>
              <svg
                className='w-3 h-3 text-gray-400 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <span
                className={`truncate ${
                  isOverdue
                    ? "text-red-600 font-medium"
                    : isDueSoon
                    ? "text-orange-600 font-medium"
                    : ""
                }`}
              >
                {formatDate(task.dueDate)}
              </span>
            </div>

            {/* Created Date */}
            <div className='flex items-center gap-2'>
              <svg
                className='w-3 h-3 text-gray-400 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='truncate'>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer with status and actions */}
        <div className='px-4 pb-3'>
          <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
            <div className='flex items-center gap-2'>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
              {(isOverdue || isDueSoon) && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isOverdue
                      ? "bg-red-100 text-red-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {isOverdue ? "⚠️ Overdue" : "⏰ Due soon"}
                </span>
              )}
            </div>

            {/* Quick status dropdown */}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isStatusChanging}
              className='text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]'
            >
              <option value='Backlog'>Backlog</option>
              <option value='To Do'>To Do</option>
              <option value='In Progress'>In Progress</option>
              <option value='Review'>Review</option>
              <option value='Done'>Done</option>
            </select>
          </div>
        </div>

        {/* Loading overlay for status changes */}
        {isStatusChanging && (
          <div className='absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
          </div>
        )}
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        teamMembers={teamMembers}
      />
    </>
  );
};

export default TaskCard;
