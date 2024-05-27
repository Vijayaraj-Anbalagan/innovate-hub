'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, updateDoc, arrayUnion, arrayRemove, query, orderBy, startAfter, limit, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FiHeart } from 'react-icons/fi';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ProblemStatement {
  id: string;
  problemStatement: string;
  expectedOutcome: string;
  sdgGoals: string[];
  hashtags: string[];
  isFavorite?: boolean;
}

const Explore: React.FC = () => {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [initialStatements, setInitialStatements] = useState<ProblemStatement[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchInitialProblemStatements();
  }, []);

  const fetchInitialProblemStatements = async () => {
    const q = query(collection(db, 'problemStatements'), orderBy('createdAt'), limit(5));
    const querySnapshot = await getDocs(q);
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const statements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProblemStatement[];
    setProblemStatements(statements);
    setInitialStatements(statements);
    setLastVisible(lastVisibleDoc);
    fetchFavorites();
  };

  const fetchMoreProblemStatements = async () => {
    if (problemStatements.length === 0) return;

    const q = query(
      collection(db, 'problemStatements'),
      orderBy('createdAt'),
      startAfter(lastVisible),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const statements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProblemStatement[];

    if (statements.length === 0) {
      // Loop the list
      setProblemStatements(prevStatements => [...prevStatements, ...initialStatements]);
    } else {
      setProblemStatements(prevStatements => [...prevStatements, ...statements]);
      setLastVisible(lastVisibleDoc);
    }
  };

  const handleFavorite = async (id: string) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const isAlreadyFavorite = userData?.favoriteProblemStatements?.includes(id);

      await updateDoc(userDocRef, {
        favoriteProblemStatements: isAlreadyFavorite
          ? arrayRemove(id)
          : arrayUnion(id)
      });

      // Update local state to reflect the change
      setProblemStatements(prev =>
        prev.map(problem =>
          problem.id === id ? { ...problem, isFavorite: !isAlreadyFavorite } : problem
        )
      );
    }
  };

  const fetchFavorites = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const favoriteIds = userDoc.data()?.favoriteProblemStatements || [];
      setProblemStatements(prev =>
        prev.map(problem =>
          favoriteIds.includes(problem.id) ? { ...problem, isFavorite: true } : problem
        )
      );
    }
  };

  if (problemStatements.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen text-white mt-16">
      <Navbar />
        <div className="flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl font-semibold mb-6">Explore Problem Statements</h1>
          <InfiniteScroll
            dataLength={problemStatements.length}
            next={fetchMoreProblemStatements}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            className="flex flex-col items-center"
          >
            {problemStatements.map((problem) => (
              <div key={problem.id} className="bg-gray-200 text-black rounded-lg p-4 shadow-lg mb-6 w-full max-w-md">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Problem Statement</h2>
                  <p className="text-xl">{problem.problemStatement}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Expected Outcome</h3>
                  <p className="text-lg">{problem.expectedOutcome}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">SDG you Solves</h3>
                  <div className="flex flex-wrap space-x-2 gap-2 mt-2">
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
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Hashtags</h3>
                  <div className="flex flex-wrap">
                    {problem.hashtags.map((tag, index) => (
                      <span key={index} className="bg-orange-500 text-white rounded-full px-2 py-1 m-1">#{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <FiHeart
                    className={`text-2xl cursor-pointer ${problem.isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`}
                    onClick={() => handleFavorite(problem.id)}
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => router.push(`/contest/${problem.id}`)}>
                    Contest &rarr;
                  </button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Explore;
