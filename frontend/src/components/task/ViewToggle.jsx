const ViewToggle = ({ viewMode, onViewModeChange }) => {
  const views = [
    { id: "grid", label: "Grid", icon: "◼️◼️" },
    { id: "list", label: "List", icon: "≡" },
    { id: "board", label: "Board", icon: "📋" },
  ];

  return (
    <div className='flex bg-gray-100 rounded-lg p-1'>
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewModeChange(view.id)}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === view.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
          title={view.label}
        >
          <span className='mr-2'>{view.icon}</span>
          <span className='hidden sm:block'>{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
