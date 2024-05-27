'use client';

import React, { useState, useEffect } from 'react';
import { doc, collection, query, where, getDoc, getDocs, updateDoc, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiEye, FiHeart } from 'react-icons/fi';

interface ProblemStatement {
  id: string;
  problemStatement: string;
}

const StudentDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [favoriteProblemStatements, setFavoriteProblemStatements] = useState<ProblemStatement[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().name);
        }

        // Fetch favorite problem statements
        const userFavorites = userDoc.data()?.favoriteProblemStatements || [];
        if (userFavorites.length > 0) {
          const q = query(collection(db, "problemStatements"), where('__name__', 'in', userFavorites));
          const querySnapshot = await getDocs(q);
          const statements = querySnapshot.docs.map(doc => ({
            id: doc.id,
            problemStatement: doc.data().problemStatement
          })) as ProblemStatement[];
          setFavoriteProblemStatements(statements);
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

  const handleUnfavorite = async (id: string) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favoriteProblemStatements: arrayRemove(id)
      });

      // Update local state to reflect the change
      setFavoriteProblemStatements(prev =>
        prev.filter(problem => problem.id !== id)
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center text-white mt-16">
        <div className="p-8 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
          <h2 className="text-lg font-semibold mb-6">{greeting}</h2>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">Favorite Problem Statements</h2>
            {favoriteProblemStatements.length > 0 ? (
              <>
                <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                  {favoriteProblemStatements.map((problem) => (
                    <div key={problem.id} className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between cursor-pointer">
                      <div>{problem.problemStatement.slice(0, 50)}...</div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <FiEye className="cursor-pointer" onClick={() => router.push(`/dashboard/student/view/${problem.id}`)} />
                        <FiHeart className="cursor-pointer text-red-500 fill-current" onClick={() => handleUnfavorite(problem.id)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex md:hidden overflow-x-auto space-x-4">
                  {favoriteProblemStatements.map((problem) => (
                    <div key={problem.id} className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between w-64 cursor-pointer">
                      <div>{problem.problemStatement.slice(0, 50)}...</div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <FiEye className="cursor-pointer" onClick={() => router.push(`/dashboard/student/view/${problem.id}`)} />
                        <FiHeart className="cursor-pointer text-red-500 fill-current" onClick={() => handleUnfavorite(problem.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-800 border-2 border-gray-800 hover:border-orange-500 p-4 rounded-lg flex flex-col justify-between w-72">
                <div className="flex flex-col justify-end">
                  <p>You do not have any favorite problem statements to view.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">Explore the Problem Statements</h2>
            <p>Start browsing the industrial, academic, and more problem statements and </p>
            <p className='mt-1'>find opportunities to contribute to innovative solutions.</p>
            <button className="bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 px-10 py-2 mt-4" onClick={() => router.push('/dashboard/student/explore')}>
              Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
