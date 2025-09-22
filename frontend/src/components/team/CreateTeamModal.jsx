import { useState } from "react";
import Modal from "../ui/Modal";

const CreateTeamModal = ({ isOpen, onClose, onCreateTeam }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await onCreateTeam(formData);
    if (!result.success) {
      setError(result.error);
      onClose();
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create New Team'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm'>
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Team Name *
          </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter team name'
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
            placeholder='Optional team description'
          />
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
            {loading ? "Creating..." : "Create Team"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
