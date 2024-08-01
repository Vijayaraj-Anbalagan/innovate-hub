'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

interface ProblemStatement {
  problemStatement: string;
  expectedOutcome: string;
  sdgGoals: string[];
  hashtags: string[];
}

const ViewProblemStatement: React.FC = () => {
  const [problemData, setProblemData] = useState<ProblemStatement | null>(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchProblemData = async () => {
        const docRef = doc(db, "problemStatements", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProblemData(docSnap.data() as ProblemStatement);
        } else {
          console.log("No such document!");
        }
      };
      fetchProblemData();
    }
  }, [id]);

  if (!problemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white">
 <Navbar showBackButton={true} backButtonRoute="/dashboard/faculty" />
      <div className="flex justify-center items-center p-4 mt-16">
        <div className="bg-gray-200 text-black rounded-lg p-6 shadow-lg w-full max-w-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Problem Statement</h2>
            <p className="text-xl">{problemData.problemStatement}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Expected Outcome</h3>
            <p className="text-lg">{problemData.expectedOutcome}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">SDG you Solves</h3>
            <div className="flex flex-wrap space-x-2 gap-2 mt-2">
              {problemData.sdgGoals.map((goal, index) => (

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
            <div className="flex flex-wrap space-x-2">
              {problemData.hashtags.map((tag, index) => (
                <span key={index} className="bg-orange-500 text-white rounded-full px-2 py-1 m-1">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProblemStatement;
