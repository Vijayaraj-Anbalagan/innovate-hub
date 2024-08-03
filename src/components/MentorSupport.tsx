// components/MentorSupport.tsx
import React from 'react';
import { FiLock, FiPhone } from 'react-icons/fi';

interface MentorSupportProps {
  mode: 'locked' | 'opened';
  value: string;
  url?: string;
}

const MentorSupport: React.FC<MentorSupportProps> = ({ mode, value, url }) => {
  const handleClick = () => {
    if (mode === 'opened' && url) {
      window.location.href = url;
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={mode === 'locked'}
      className={`flex items-center justify-center rounded-full px-6 py-3 ${
        mode === 'locked' ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
      } text-white transition-all duration-300`}
    >
      {mode === 'locked' ? <FiLock className="mr-2" /> : <FiPhone className="mr-2" />}
      {value}
    </button>
  );
};

export default MentorSupport;
