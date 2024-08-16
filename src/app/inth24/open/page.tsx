'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import IndustryStatementsLink from '@/components/IndustryStatementsLink';

const OpenStatement = () => {
  const [problemStatement, setProblemStatement] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const openStatementData = {
      problemStatement: category !== 'others' ? problemStatement : null,
      category,
    };

    // Save the openStatementData to localStorage or pass it to the router state
    localStorage.setItem('openStatementData', JSON.stringify(openStatementData));

    // Redirect to registration page
    router.push('/register?ps=PS-OPEN');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
       <Navbar showBackButton backButtonRoute='/inth24' />
       <IndustryStatementsLink />
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6 mt-14">Submit Your Open Problem Statement</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="problemStatement" className="block text-white text-sm font-bold mb-2">Problem Statement</label>
          <textarea
            id="problemStatement"
            placeholder="Describe your problem statement..."
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            className="w-full h-24 p-3 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none"
            required={category !== 'others'}
            disabled={category === 'others'}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-white text-sm font-bold mb-2">Select Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none"
            required
          >
            <option value="">Select a category</option>
            <option value="aiml">AI/ML</option>
            <option value="cybersecurity">Cyber Security</option>
            <option value="arvr">AR/VR</option>
            <option value="webdev">App Development</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600">
            Submit and Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpenStatement;
