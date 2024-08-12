'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiCpu, FiShield, FiActivity, FiBox, FiUserCheck, FiClipboard, FiPhoneCall } from 'react-icons/fi';
import { MdOutlineWeb } from 'react-icons/md';
import { FaVrCardboard } from 'react-icons/fa';
import { BiBrain } from 'react-icons/bi';
import { BsClockFill, BsCurrencyRupee, BsPeopleFill, BsShieldLock } from 'react-icons/bs';
import { FaLightbulb, FaChartLine, FaTools, FaCheck, FaLeaf } from 'react-icons/fa';
import Timeline from '@/components/Timeline';
import { AiOutlineFileDone } from 'react-icons/ai';


const categories = [
  {
    id: 'aiml',
    name: 'AI/ML',
    description: 'Explore problem statements in Artificial Intelligence and Machine Learning.',
    icon: <BiBrain className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/aiml',
  },
  {
    id: 'cybersecurity',
    name: 'Cyber Security',
    description: 'Delve into the world of Cyber Security challenges.',
    icon: <BsShieldLock className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/cybersecurity',
  },
  {
    id: 'arvr',
    name: 'AR/VR',
    description: 'Augmented Reality and Virtual Reality problem statements.',
    icon: <FaVrCardboard className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/arvr',
  },
  {
    id: 'webdev',
    name: 'Web / App Development',
    description: 'Discover the latest challenges in Web / App Development.',
    icon: <MdOutlineWeb className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/webdev',
  },
  {
    id: 'openstatement',
    name: 'Open Statement',
    description: 'Open-ended problem statements for creative solutions.',
    icon: <FiUserCheck className="text-orange-500 text-4xl mb-2" />,
    link: '/inth24/open',
  },
];

const evaluationCriteria = [
  { icon: <FaLightbulb className="text-white text-2xl" />, title: 'Solution' },
  { icon: <FaCheck className="text-white text-2xl" />, title: 'Feasibility' },
  { icon: <FaTools className="text-white text-2xl" />, title: 'Optimization' },
  { icon: <FaLeaf className="text-white text-2xl" />, title: 'Sustainability' },
  { icon: <FiClipboard className="text-white text-2xl" />, title: 'Relevancy' },
  { icon: <FaChartLine className="text-white text-2xl" />, title: 'Innovation' },
];

const Innothon24Page = () => {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <Navbar showBackButton backButtonRoute="/dashboard" />
      <div className="min-h-screen p-8 sm:p-12  text-white mt-14">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
          INNOTHON 24 Problem Statements from the Industry
        </h1>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-4">INNOCOM</h2>
          <p className="text-lg text-center max-w-4xl mb-8">
            INNOCOM is our platform for students to incubate and express their
            talents. It fosters entrepreneurship and innovation, guiding
            students towards a successful and independent future. Our club aims
            to elevate the standards of our students, creating achievers and
            trendsetters in the field of computer science.
          </p>
          <h2 className="text-3xl font-bold mb-4">INNOTHON 24</h2>
          <p className="text-lg text-center max-w-4xl mb-4">
            INNOTHON 24 is a 30-hour hackathon where students are challenged to
            develop innovative solutions to real-world problems. Problem
            statements of Innothon 24 are Provided by Our Industry Partners,
            giving students the opportunity to tackle genuine challenges faced
            by Industries today.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">
            Evaluation Criteria
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 ">
            {evaluationCriteria.map((criteria, index) => (
              <div
                key={index}
                className="flex flex-col items-center border-2 border-white text-white py-3 px-5 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out cursor-default min-w-[130px]"
              >
                {criteria.icon}
                <span className="mt-2 text-sm text-center ">
                  {criteria.title}
                </span>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-center mt-8">Timeline</h2>
          <Timeline />
        </div>

        <h2
          id="industry-statements"
          className="text-3xl font-bold text-center mb-8"
        >
          Industry Challenges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-center text-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-white p-6 rounded-lg shadow-lg hover:shadow-xl duration-300 cursor-pointer flex flex-col items-center text-center hover:scale-95 h-full"
              onClick={() => handleCardClick(category.link)}
            >
              {category.icon}
              <h2 className="text-xl font-semibold text-orange-500 mb-2">
                {category.name}
              </h2>
              <p className="text-gray-300">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Note and Contact Section */}
        <div className="text-gray-300 p-6 rounded-lg mt-12 items-center justify-center">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">Note</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BsCurrencyRupee
                    className="text-orange-500 mr-3 flex-shrink-0"
                    style={{ height: '20px', width: '20px' }}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Enrollment Fee Rs.100/- per Participant
                      <br />
                      Finalist Fee Rs.350/- per Participant
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BsPeopleFill
                    className="text-orange-500 mr-3 flex-shrink-0"
                    style={{ height: '20px', width: '20px' }}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Team must consist of maximum 5 members only
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BsClockFill
                    className="text-orange-500 mr-3 flex-shrink-0"
                    style={{ height: '20px', width: '20px' }}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">30 hour hackathon</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AiOutlineFileDone
                    className="text-orange-500 mr-3 flex-shrink-0"
                    style={{ height: '20px', width: '20px' }}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Participants are expected to develop a prototype for
                      <br />
                      the chosen problem statement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Harish Karthik D - President, INNOCOM
                    </p>
                    <a
                      href="tel:+919884995814"
                      className="text-sm text-orange-500 underline"
                    >
                      9884995814
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Jerem Mathew A - Secretary, INNOCOM
                    </p>
                    <a
                      href="tel:+919940072755"
                      className="text-sm text-orange-500 underline"
                    >
                      9940072755
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      Aishwarya S - Treasurer, INNOCOM
                    </p>
                    <a
                      href="tel:+919894414307"
                      className="text-sm text-orange-500 underline"
                    >
                      9894414307
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-8">
          &copy; 2024 Team Ignite. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Innothon24Page;
