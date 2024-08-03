'use client';
// pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Statements } from '@/lib/allps';
import Image from 'next/image';
import MentorSupport from '@/components/MentorSupport';
import NotificationButton from '@/components/NotificationButton';

interface ProblemStatement {
  id: string;
  psid: string;
  title: string;
  objective: string;
  background: string;
  company: string;
  logo: string;
  sdgGoals: string[];
}

const StudentDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [studentPsid, setStudentPsid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.name);
          setStudentPsid(userData.psid);
        }

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
          setGreeting('Good Morning');
        } else if (currentHour < 18) {
          setGreeting('Good Afternoon');
        } else {
          setGreeting('Good Evening');
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const filteredStatements = Statements.filter(statement => statement.psid === studentPsid);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center text-white mt-16">
        <div className="p-8 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
          <h2 className="text-lg font-semibold mb-6">{greeting}</h2>

          <h3 className="text-xl font-semibold mb-4">Your Problem Statements</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredStatements.map((problem) => (
              <div key={problem.id} className="border border-white p-5 rounded-lg shadow-lg hover:shadow-xl duration-300 flex flex-col hover:scale-105 transition-all">
                <div className='flex flex-row justify-start align-middle'>
                  <h2 className="text-lg font-semibold text-orange-500 mb-2 mr-2">{problem.title}</h2>
                  <p className="text-md text-black mb-2 bg-white rounded-full p-1 px-2">{problem.psid}</p>
                </div>
                <p className="text-lg text-gray-300 mb-2"><strong>Objective:</strong> {problem.objective}</p>
                <p className="text-gray-300 mb-2 text-lg"><strong>Background:</strong> {problem.background}</p>
                <p className="text-gray-300 mb-2 text-lg"><strong>Company:</strong> {problem.company}</p>
                <div className='flex flex-col sm:flex-row sm:justify-between mb-3'>
                  <Image src={problem.logo} alt={`${problem.company} logo`} width={50} height={50} className="mb-3 sm:mb-0" />
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
              </div>
            ))}
          </div>

          <div className="mt-8 flex space-x-4">
            <MentorSupport mode="locked" value="Locked" />
            <NotificationButton alert={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
