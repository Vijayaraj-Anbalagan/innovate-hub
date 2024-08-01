'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import Link from 'next/link';

interface ProblemStatement {
  id: string;
  problemStatement: string;
}

const problemStatements: ProblemStatement[] = [
  { id: '1', problemStatement: 'Optimizing Supply Chain Management' },
  { id: '2', problemStatement: 'AI-Based Customer Support System' },
  { id: '3', problemStatement: 'Smart Healthcare Monitoring' },
  { id: '4', problemStatement: 'Energy Consumption Optimization' },
  { id: '5', problemStatement: 'Blockchain for Secure Transactions' },
  { id: '6', problemStatement: 'Personalized Learning Platform' },
  { id: '7', problemStatement: 'Smart Waste Management System' },
  { id: '8', problemStatement: 'Cybersecurity Threat Detection' },
  { id: '9', problemStatement: 'Autonomous Vehicle Navigation' },
  { id: '10', problemStatement: 'Environmental Monitoring and Analysis' },
];

const AdminInnothonPanel: React.FC = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      let totalCount = 0;
      for (let i = 1; i <= 10; i++) {
        const collectionName = `part${i}`;
        const querySnapshot = await getDocs(collection(db, collectionName));
        totalCount += querySnapshot.size;
      }
      setUserCount(totalCount);
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex flex-col items-center pt-10 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-white">Innothon 24 Admin Panel</h1>
        <div className="flex space-x-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold">Total Users</h2>
            <p className="text-4xl mt-2">{userCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold">Total Problem Statements</h2>
            <p className="text-4xl mt-2">10</p>
          </div>
          <Link className="bg-white p-6 rounded-lg shadow-lg text-center text-2xl font-semibold" href={'/inthadminpanel24atdb/view'}>View All Participants</Link>
        </div>
        <div className="mt-8 w-full px-6 max-w-xl">
         
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">S.No</th>
                <th className="py-2 px-4 border-b">Problem Statement</th>
              </tr>
            </thead>
            <tbody>
              {problemStatements.map((problem, index) => (
                <tr key={problem.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-center">{problem.problemStatement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminInnothonPanel;
