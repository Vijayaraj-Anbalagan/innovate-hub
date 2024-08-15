// pages/admin/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);
  const [problemStatementCount, setProblemStatementCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const usersSnapshot = await getDocs(
        query(collection(db, 'users'), where('role', '==', 'student'))
      );
      const problemsSnapshot = await getDocs(
        collection(db, 'problemStatements')
      );
      setUserCount(usersSnapshot.size);
      setProblemStatementCount(problemsSnapshot.size);
    };
    fetchCounts();
  }, []);

  return (
    <>
      <div>
        <AdminNavbar />
        <div className="min-h-screen flex flex-col items-center pt-10 mt-16">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Admin Dashboard
          </h1>
          <div className="flex space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold">Total Users</h2>
              <p className="text-4xl mt-2">{userCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold">
                Total Problem Statements
              </h2>
              <p className="text-4xl mt-2">{problemStatementCount}</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/admin/users"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Manage Users
            </Link>
            <Link
              href="/admin/problems/view"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Manage Problem Statements
            </Link>
            <Link
              href="/inthadminpanel24atdb"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg ml-4"
            >
              Manage Innothon 24
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRoleBasedAccess(AdminDashboard, 'admin');
