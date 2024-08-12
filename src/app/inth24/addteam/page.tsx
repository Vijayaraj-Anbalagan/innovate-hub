'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import Modal from '@/components/Modal';

const AddTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMemberIndex, setEditMemberIndex] = useState<number | null>(null);
  const [leadName, setLeadName] = useState<string>('');
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
          setLeadName(userData.name);
          if (userData.teamMembers) {
            setTeamMembers(userData.teamMembers);
          } else {
            // Initialize empty team members based on team count
            const emptyMembers = Array(userData.teamCount - 1).fill({
              name: '',
              gender: '',
              phone: '',
              email: '',
              college: '',
              dept: '',
              state: '',
            });
            setTeamMembers(emptyMembers);
          }
        }
      }
    };

    fetchTeamInfo();
  }, []);

  const handleEditClick = (index: number) => {
    setEditMemberIndex(index);
    setShowModal(true);
  };

  const handleModalSubmit = (memberData: any) => {
    const updatedMembers = [...teamMembers];
    if (editMemberIndex !== null) {
      updatedMembers[editMemberIndex] = memberData;
    }
    setTeamMembers(updatedMembers);
    setShowModal(false);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { teamMembers, teamInfo: true });
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Add Your Team Information</h1>

      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Lead Name</h2>
          <p className="bg-gray-200 p-4 rounded-lg">{leadName}</p>
        </div>

        {teamMembers.map((member, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Team Member {index + 1}</h2>
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <p>{member.name || 'No information provided'}</p>
              <button
                onClick={() => handleEditClick(index)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold mt-6 transition-all duration-300"
        >
          Save Team Information
        </button>
      </div>

      {showModal && editMemberIndex !== null && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          memberData={teamMembers[editMemberIndex]}
        />
      )}
    </div>
  );
};

export default AddTeam;
