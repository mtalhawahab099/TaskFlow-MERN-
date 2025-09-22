import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useTeams } from "../../hooks/useTeams";
import Modal from "../ui/Modal";

const CreateTaskModal = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();
  const { teams } = useTeams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Backlog",
    priority: "Medium",
    dueDate: "",
    assignee: "",
    team: teams[0]?._id || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createTask(formData);

    if (result.success) {
      setFormData({
        title: "",
        description: "",
        status: "Backlog",
        priority: "Medium",
        dueDate: "",
        assignee: "",
        team: teams[0]?._id || "",
      });
      onClose();
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Get team members for the selected team
  const selectedTeam = teams.find((team) => team._id === formData.team);
  const teamMembers = selectedTeam?.members || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create New Task'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm'>
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title *
          </label>
          <input
            type='text'
            id='title'
            name='title'
            required
            value={formData.title}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter task title'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Describe the task...'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700'
            >
              Status
            </label>
            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='Backlog'>Backlog</option>
              <option value='To Do'>To Do</option>
              <option value='In Progress'>In Progress</option>
              <option value='Review'>Review</option>
              <option value='Done'>Done</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='priority'
              className='block text-sm font-medium text-gray-700'
            >
              Priority
            </label>
            <select
              id='priority'
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor='dueDate'
            className='block text-sm font-medium text-gray-700'
          >
            Due Date
          </label>
          <input
            type='date'
            id='dueDate'
            name='dueDate'
            value={formData.dueDate}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='team'
              className='block text-sm font-medium text-gray-700'
            >
              Team *
            </label>
            <select
              id='team'
              name='team'
              required
              value={formData.team}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='assignee'
              className='block text-sm font-medium text-gray-700'
            >
              Assignee
            </label>
            <select
              id='assignee'
              name='assignee'
              value={formData.assignee}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Unassigned</option>
              {teamMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex justify-end space-x-3 pt-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
