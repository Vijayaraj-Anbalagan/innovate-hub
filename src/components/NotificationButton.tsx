import React, { useState } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

interface NotificationButtonProps {
  alert?: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ alert = false }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center justify-center rounded-full w-12 h-12 md:w-20 md:h-20 lg:w-16 lg:h-16 border border-white text-white hover:bg-gray-200 hover:text-black transition-all duration-300"
      >
        <div className="relative">
          <FiBell className="text-xl md:text-2xl lg:text-3xl" />
          {alert && <span className="absolute top-0 right-0 h-2 w-2 md:h-3 md:w-3 bg-red-500 rounded-full"></span>}
        </div>
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button onClick={handleClosePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <FiX />
            </button>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Notifications</p>
            </div>
            <p>No notifications are there for you.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
