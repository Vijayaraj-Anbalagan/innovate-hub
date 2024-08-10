'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { cybersecurityStatements } from '@/lib/cyber';
import Image from 'next/image';
import Link from 'next/link';
import IndustryStatementsLink from '@/components/IndustryStatementsLink';

const CyberPage: React.FC = () => {
  return (
    <>
      <Navbar showBackButton backButtonRoute='/inth24' />
      <IndustryStatementsLink />
      <div className="min-h-screen p-12 text-white mt-14">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Cyber Security Problem Statements</h1>
        <p className="text-lg text-center max-w-4xl mb-8 mx-auto">
          Explore the latest challenges in Cyber Security provided by industry experts. Develop innovative solutions to protect data and systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {cybersecurityStatements.map((problem) => (
            <Link href={'/register'} key={problem.id} className="border border-white p-5 rounded-lg shadow-lg hover:shadow-xl duration-300 flex flex-col hover:scale-105 transition-all">
              <div className='flex flex-row justify-start align-middle'>
                <h2 className="text-lg font-semibold text-orange-500 mb-2 mr-2">{problem.title}</h2>
                <p className="text-md text-black mb-2 bg-white rounded-full p-1 px-2">{problem.psid}</p>
              </div>
              <p className="text-lg text-gray-300 mb-2"><strong>Objective:</strong> {problem.objective}</p>
              <p className="text-gray-300 mb-2 text-lg"><strong>Background:</strong> {problem.background}</p>
              <p className="text-gray-300 mb-2 text-lg"><strong>Industy:</strong> {problem.industy}</p>
              <div className='flex flex-col sm:flex-row sm:justify-between mb-3'>
                <Image src={problem.logo} alt={`${problem.industy} logo`} width={100} height={100} className="mb-3 sm:mb-0" />
                <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3 sm:mt-0">
                  {problem.sdgGoals.map((goal, index) => (
                    <Image
                      className='rounded-lg'
                      key={index}
                      src={`/sdgs/${goal}.svg`}
                      alt={goal}
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CyberPage;
