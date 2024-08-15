'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import Link from 'next/link';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';
import StatementTable from '@/components/domainTable';
import data from '../../lib/allProbStat.json';
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
    const fetchCounts = async () => {
      const usersSnapshot = await getDocs(
        query(collection(db, 'users'), where('role', '==', 'student'))
      );
      const problemsSnapshot = await getDocs(
        collection(db, 'problemStatements')
      );
      setUserCount(usersSnapshot.size);
    };
    fetchCounts();
  }, []);

  return (
    <main className="max-w-screen">
      <AdminNavbar />
      <div className="min-h-screen flex flex-col items-center pt-10 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Innothon 24 Admin Panel
        </h1>
        <div className="flex space-x-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold">Total Users</h2>
            <p className="text-4xl mt-2">{userCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold">Total Problem Statements</h2>
            <p className="text-4xl mt-2">33</p>
          </div>
          <Link
            className="bg-white p-6 rounded-lg shadow-lg text-center text-2xl font-semibold"
            href={'/admin/users'}
          >
            View All Participants
          </Link>
        </div>
        <div className="space-y-8 mt-5 mx-5">
          <StatementTable
            title="AIML Statements"
            statements={data.aimlStatements}
          />
          <StatementTable
            title="Cyber Security Statements"
            statements={data.cyberSecStatements}
          />
          <StatementTable
            title="Web Development Statements"
            statements={data.webDevStatements}
          />
          <StatementTable
            title="AR/VR Statements"
            statements={data.arvrStatements}
          />
        </div>
      </div>
    </main>
  );
};

export default withRoleBasedAccess(AdminInnothonPanel, 'admin');
