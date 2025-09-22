import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='flex justify-between items-center h-16 px-6'>
        <div className='flex items-center'>
          <h1 className='text-xl font-semibold text-gray-900 hidden lg:block'>
            Dashboard
          </h1>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='hidden sm:block'>
            <span className='text-sm text-gray-700'>
              Welcome, <span className='font-medium'>{user?.username}</span>
            </span>
          </div>

          <div className='relative group'>
            <button className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors'>
              <span className='text-blue-600 font-semibold'>
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </button>

            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='px-4 py-2 border-b'>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.username}
                </p>
                <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
