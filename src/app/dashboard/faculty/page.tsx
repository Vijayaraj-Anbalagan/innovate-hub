'use client';

import React, { useState, useEffect } from 'react';
import { doc, query, where, getDocs, collection, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiEdit, FiEye } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().name);
          if (userDoc.data().role === 'student') {
            router.push('/dashboard/student');
          }
        }

        const q = query(collection(db, "problemStatements"), where("createdBy", "==", userId));
        const querySnapshot = await getDocs(q);
        const statements = querySnapshot.docs.map(doc => ({
          id: doc.id,
          problemStatement: doc.data().problemStatement
        })) as ProblemStatement[];
        setProblemStatements(statements);

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <div className="p-8 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
          <h2 className="text-lg font-semibold mb-6">{greeting}</h2>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">Explore Your Problem Statements</h2>
            {problemStatements.length > 0 ? (
              <>
                <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                  {problemStatements.map((problem) => (
                    <div key={problem.id} className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between">
                      <div>{problem.problemStatement.slice(0, 50)}...</div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <FiEye className="cursor-pointer" onClick={() => router.push(`/dashboard/faculty/view/${problem.id}`)} />
                        <FiEdit className="cursor-pointer" onClick={() => router.push(`/dashboard/faculty/update/${problem.id}`)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex md:hidden overflow-x-auto space-x-4">
                  {problemStatements.map((problem) => (
                    <div key={problem.id} className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between w-64">
                      <div>{problem.problemStatement.slice(0, 50)}...</div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <FiEye className="cursor-pointer" onClick={() => router.push(`/dashboard/faculty/view/${problem.id}`)} />
                        <FiEdit className="cursor-pointer" onClick={() => router.push(`/dashboard/faculty/update/${problem.id}`)} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between w-72" onClick={() => router.push('faculty/upload')}>
                <div className="flex flex-col justify-end ">
                  <p>You do not have any problem statements to view.</p>
                  <p className='mt-3'>Start uploading problem statements by clicking the Upload button below. 🡯</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">Drop Your Problem Statements</h2>
            <p>Get the solutions from our students. Submit your problem statements and</p>
            <p className="mb-4">let our students work on them to provide innovative solutions.</p>
            <button className="bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 px-10 py-2" onClick={() => router.push('faculty/upload')}>
              Upload
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default FacultyDashboard;
