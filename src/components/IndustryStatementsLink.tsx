import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowCircleLeft, FaArrowDown } from 'react-icons/fa';

const IndustryStatementsLink: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/inth24#industry-statements');
  };

  return (
    <div
      onClick={handleClick}
      className="fixed right-4 top-20 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-transform transform hover:scale-110"
    >
        <FaArrowCircleLeft className="text-xl" />

    </div>
  );
};

export default IndustryStatementsLink;
