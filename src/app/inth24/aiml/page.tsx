'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { aimlStatements } from '@/lib/aiml';
import Image from 'next/image';
import Link from 'next/link';
import IndustryStatementsLink from '@/components/IndustryStatementsLink';

const AimlPage: React.FC = () => {
  return (
    <>
      <Navbar showBackButton backButtonRoute='/inth24' />
      <IndustryStatementsLink />
      <div className="min-h-screen p-12 text-white mt-14">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">AI and ML Problem Statements</h1>
        <p className="text-lg text-center max-w-4xl mb-8 mx-auto">
          Explore the cutting-edge problem statements in AI and Machine Learning provided by top industry leaders. Solve real-world challenges and contribute to the advancement of AI technology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {aimlStatements.map((problem) => (
            <Link href={'/register'} key={problem.id} className="border border-white p-5 rounded-lg shadow-lg hover:shadow-xl duration-300 flex flex-col hover:scale-105 transition-all">
              
              <div className='flex flex-row justify-start align-middle'>
                <h2 className="text-lg font-semibold text-orange-500 mb-2 mr-2">{problem.title}</h2>
                <p className="text-md text-black mb-2 bg-white rounded-full p-1 px-3">{problem.psid}</p>
              </div>
              <p className="text-lg text-gray-300 mb-2"><strong>Objective:</strong> {problem.objective}</p>
              <p className="text-gray-300 mb-2 text-lg"><strong>Background:</strong> {problem.background}</p>
              <p className="text-gray-300 mb-2 text-lg"><strong>Industy:</strong> {problem.industy}</p>
              <div className='flex flex-col sm:flex-row sm:justify-between mb-3'>
                <Image src={problem.logo} alt={`${problem.industy} logo`} width={70} height={70} className="mb-3 sm:mb-0" />
                <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3 sm:mt-0">
                  {problem.sdgGoals.map((goal, index) => (
                    <Image
                      className='rounded-lg'
                      key={index}
                      src={`/sdgs/${goal}.svg`}
                      alt={goal}
                      width={56}
                      height={56}
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

export default AimlPage;
