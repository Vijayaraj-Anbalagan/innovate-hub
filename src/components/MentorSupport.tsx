'use client';
import React, { useState } from 'react';
import { FiLock, FiPhone, FiX } from 'react-icons/fi';
import { MentorDetails } from '@/app/dashboard/student/page';

interface MentorSupportProps {
  mode: 'locked' | 'opened';
  value: string;
  url?: string;
  mentorDetails: MentorDetails | null;
}

const MentorSupport: React.FC<MentorSupportProps> = ({
  mode,
  value,
  url,
  mentorDetails,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        disabled={mode === 'locked'}
        className={`flex items-center justify-center rounded-full px-5 py-3 text-lg font-semibold ${
          mode === 'locked'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
        } text-white transition-all duration-300`}
        style={{ minHeight: '50px' }}
      >
        {mode === 'locked' ? (
          <FiLock className="mr-2" />
        ) : (
          <FiPhone className="mr-2" />
        )}
        {value}
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Mentor Details : </p>
            </div>
            <p>{`Mentor Name : ${mentorDetails?.mentorName} `}</p>
            <p>Mentor Phone :</p>
            <a
              href={`tel:${mentorDetails?.mentorPhone}`}
              className="text-blue-600 underline hover:text-blue-400"
            >
              {mentorDetails?.mentorPhone}
            </a>
            <p>Mentor LinkedIn :</p>
            <a
              href={mentorDetails?.mentorLinkedIn || ''}
              className="text-blue-600 underline hover:text-blue-400"
            >
              {mentorDetails?.mentorLinkedIn}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSupport;
