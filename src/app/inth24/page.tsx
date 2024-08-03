'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiCpu, FiShield, FiActivity, FiBox, FiUserCheck, FiClipboard } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const categories: Category[] = [
  {
    id: 'aiml',
    name: 'AI/ML',
    description: 'Explore problem statements in Artificial Intelligence and Machine Learning.',
    icon: <FiCpu className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/aiml',
  },
  {
    id: 'cybersecurity',
    name: 'Cyber Security',
    description: 'Delve into the world of Cyber Security challenges.',
    icon: <FiShield className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/cybersecurity',
  },
  {
    id: 'arvr',
    name: 'AR/VR',
    description: 'Augmented Reality and Virtual Reality problem statements.',
    icon: <FiActivity className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/arvr',
  },
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Discover the latest challenges in Web Development.',
    icon: <FiClipboard className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/webdev',
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Various other technology problem statements.',
    icon: <FiBox className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/others',
  },
  {
    id: 'openstatement',
    name: 'Open Statement',
    description: 'Open-ended problem statements for creative solutions.',
    icon: <FiUserCheck className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/openstatement',
  },
];

const Innothon24Page: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <Navbar showBackButton backButtonRoute='/dashboard' />
      <div className="min-h-screen p-12 text-white mt-14">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">INNOTHON 24 Problem Statements from the Industry</h1>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-4">INNOCOM</h2>
          <p className="text-lg text-center max-w-4xl mb-8">
            INNOCOM is our platform for students to incubate and express their talents. It fosters entrepreneurship and innovation, guiding students towards a successful and independent future. Our club aims to elevate the standards of our students, creating achievers and trendsetters in the field of computer science.
          </p>
          <h2 className="text-3xl font-bold mb-4">INNOTHON 24</h2>
          <p className="text-lg text-center max-w-4xl mb-4">
            INNOTHON 24 is a 30-hour hackathon where students are challenged to develop innovative solutions to real-world problems. This year, we are inviting industry partners to provide problem statements, giving students the opportunity to tackle genuine challenges faced by companies today.
          </p>
          <p className="text-lg text-center max-w-4xl font-semibold">
            Explore our problem statements and find top-notch industry-level solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center align-middle items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-white p-6 rounded-lg shadow-lg hover:shadow-xl duration-300 cursor-pointer flex flex-col items-center text-center hover:scale-105 transition-all"
              onClick={() => handleCardClick(category.link)}
            >
              {category.icon}
              <h2 className="text-xl font-semibold text-orange-500 mb-2">{category.name}</h2>
              <p className="text-gray-300">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Innothon24Page;
