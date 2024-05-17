'use client';

import React, { useState, useEffect } from 'react';
import { doc, query, where, getDocs, collection, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
import { FiEdit, FiEye } from 'react-icons/fi';

interface ProblemStatement {
  id: string;
  problemStatement: string;
}

const FacultyDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserDetails = async () => {
        const userId = auth.currentUser?.uid || ''; // Add a fallback value for undefined case
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().name);
          if (userDoc.data().role === 'student') {
            router.push('/dashboard/student');
          }
        }
      };
      fetchUserDetails();

      const fetchProblemStatements = async () => {
        const userId = auth.currentUser?.uid || '';
        const q = query(collection(db, "problemStatements"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const statements = querySnapshot.docs.map(doc => ({
          id: doc.id,
          problemStatement: doc.data().problemStatement
        })) as ProblemStatement[];
        setProblemStatements(statements);
      };
      fetchProblemStatements();

      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar /> {/* Assuming you have a Navbar component */}
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
        <h2 className="text-lg font-semibold mb-6">{greeting}</h2>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">Explore Your Problem Statements</h2>
          <div className="flex overflow-x-scroll space-x-4 overflow-y-scroll no-scrollbar">
            {problemStatements.map((problem) => (
              <div key={problem.id} className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between w-64">
                <div>{problem.problemStatement.slice(0, 50)}...</div>
                <div className="flex justify-end space-x-2 mt-4">
                  <FiEye className="cursor-pointer" onClick={() => router.push(`/view/ps?id=${problem.id}`)} />
                  <FiEdit className="cursor-pointer" onClick={() => router.push(`/update/ps?id=${problem.id}`)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-500">Drop Your Problem Statements</h2>
          <p className="mb-4">Get the solutions from our students. Submit your problem statements and let our students work on them to provide innovative solutions.</p>
          <button className="bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 px-10 py-2" onClick={() => router.push('faculty/upload')}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
