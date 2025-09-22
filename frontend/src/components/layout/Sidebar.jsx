import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "Teams", href: "/teams", icon: "👥" },
    { name: "Tasks", href: "/tasks", icon: "✅" },
    { name: "Calendar", href: "/calendar", icon: "📅" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white'
      >
        ☰
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-grey bg-opacity-40 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300
        lg:relative lg:translate-x-0 lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64
      `}
      >
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700'>
            <h1 className='text-white text-xl font-bold'>TaskFlow</h1>
          </div>

          {/* User info */}
          <div className='p-4 border-b'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                <span className='text-blue-600 font-semibold'>
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.username}
                </p>
                <p className='text-xs text-gray-500'>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-2 py-4 space-y-1'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <span className='mr-3 text-lg'>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className='p-4 border-t'>
            <div className='text-xs text-gray-500'>
              <p>TaskFlow v1.0</p>
              <p>Built with MERN Stack</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
