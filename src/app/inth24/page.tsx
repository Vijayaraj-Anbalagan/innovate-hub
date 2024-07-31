// pages/innothon24.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiClipboard, FiCode, FiUserCheck, FiActivity, FiAlertCircle, FiBox, FiCpu, FiMapPin, FiShield, FiTrendingUp } from 'react-icons/fi';

interface ProblemStatement {
  id: string;
  problemStatement: string;
  description: string;
  formLink: string;
  icon: React.ReactNode;
}

const problemStatements: ProblemStatement[] = [
  {
    id: '1',
    problemStatement: 'Optimizing Supply Chain Management',
    description: 'Enhance the efficiency and transparency of the supply chain management process.',
    formLink: 'https://forms.gle/example1',
    icon: <FiClipboard className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '2',
    problemStatement: 'AI-Based Customer Support System',
    description: 'Create an AI-powered customer support system that handles queries in real-time.',
    formLink: 'https://forms.gle/example2',
    icon: <FiCpu className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '3',
    problemStatement: 'Smart Healthcare Monitoring',
    description: 'Design a system to track patient vitals and alert healthcare providers of anomalies.',
    formLink: 'https://forms.gle/example3',
    icon: <FiActivity className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '4',
    problemStatement: 'Energy Consumption Optimization',
    description: 'Optimize energy consumption in buildings using IoT and machine learning.',
    formLink: 'https://forms.gle/example4',
    icon: <FiTrendingUp className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '5',
    problemStatement: 'Blockchain for Secure Transactions',
    description: 'Implement a blockchain-based solution for secure and transparent transactions.',
    formLink: 'https://forms.gle/example5',
    icon: <FiShield className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '6',
    problemStatement: 'Personalized Learning Platform',
    description: 'Develop a platform that adapts to the learning style and pace of each student.',
    formLink: 'https://forms.gle/example6',
    icon: <FiUserCheck className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '7',
    problemStatement: 'Smart Waste Management System',
    description: 'Create a system to optimize waste collection and recycling.',
    formLink: 'https://forms.gle/example7',
    icon: <FiBox className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '8',
    problemStatement: 'Cybersecurity Threat Detection',
    description: 'Develop a system to detect and mitigate cybersecurity threats.',
    formLink: 'https://forms.gle/example8',
    icon: <FiAlertCircle className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '9',
    problemStatement: 'Autonomous Vehicle Navigation',
    description: 'Design a navigation system for autonomous vehicles.',
    formLink: 'https://forms.gle/example9',
    icon: <FiMapPin className="text-orange-500 text-4xl mb-2" />,
  },
  {
    id: '10',
    problemStatement: 'Environmental Monitoring and Analysis',
    description: 'Monitor environmental conditions and analyze the data for insights.',
    formLink: 'https://forms.gle/example10',
    icon: <FiActivity className="text-orange-500 text-4xl mb-2" />,
  },
];

const Innothon24Page: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-12 text-white mt-14">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">INNOTHON 24 Problem Statements from the Industry</h1>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-4">INNOCOM</h2>
          <p className="text-lg text-center max-w-4xl mb-8">
            INNOCOM is our platform for students to incubate and express their talents. It fosters entrepreneurship and innovation, guiding students towards a successful and independent future. Our club aims to elevate the standards of our students, creating achievers and trendsetters in the field of computer science.
          </p>
          <h2 className="text-3xl font-bold mb-4">INNOTHON 24</h2>
          <p className="text-lg text-center max-w-4xl">
            INNOTHON 24 is a 30-hour hackathon where students are challenged to develop innovative solutions to real-world problems. This year, we are inviting industry partners to provide problem statements, giving students the opportunity to tackle genuine challenges faced by companies today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-center align-middle items-center">
          {problemStatements.map((problem) => (
            <div key={problem.id} className="border border-white p-6 rounded-lg shadow-lg hover:shadow-xl duration-300 cursor-pointer flex flex-col items-center text-center hover:scale-105 transition-all" onClick={() => handleCardClick(problem.formLink)}>
              {problem.icon}
              <h2 className="text-xl font-semibold text-orange-500 mb-2">{problem.problemStatement}</h2>
              <p className="text-gray-300">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Innothon24Page;
