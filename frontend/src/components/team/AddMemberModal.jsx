import { useState } from "react";
import { useTeams } from "../../hooks/useTeams";
import Modal from "../ui/Modal";

const AddMemberModal = ({ isOpen, onClose, team }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addMember } = useTeams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await addMember(team._id, email);

    if (result.success) {
      setEmail("");
      onClose();
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Member to ${team.name}`}
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm'>
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Member Email *
          </label>
          <input
            type='email'
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder="Enter member's email address"
          />
          <p className='mt-1 text-sm text-gray-500'>
            The user must already have a TaskFlow account.
          </p>
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
            {loading ? "Adding..." : "Add Member"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMemberModal;
