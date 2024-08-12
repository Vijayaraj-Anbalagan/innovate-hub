'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';

const TeamMember: React.FC = () => {
  const [teamInfo, setTeamInfo] = useState<boolean | null>(null);
  const [teamCount, setTeamCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setTeamCount(userData.teamCount);

          // Determine if teamInfo should be true or false based on teamCount
          if (userData.teamCount === 1) {
            setTeamInfo(true);
          } else {
            setTeamInfo(userData.teamInfo || false);
          }
        }
      }
    };

    fetchTeamInfo();
  }, []);

  const handleAddTeamClick = () => {
    router.push('/inth24/addteam');
  };

  return (
    <div className="p-4 rounded-lg shadow-lg text-white w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Team Information</h2>
      {teamInfo === false && (
        <div>
          <p className="mb-4">Your team information is incomplete.</p>
          <button
            onClick={handleAddTeamClick}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
          >
            Add Your Team Info
          </button>
        </div>
      )}
      {teamInfo === true && (
        <div>
          <p className="text-green-500 mb-4">Your team information is complete.</p>
        </div>
      )}
    </div>
  );
};

export default TeamMember;
