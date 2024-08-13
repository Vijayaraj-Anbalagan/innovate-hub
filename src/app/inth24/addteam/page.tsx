'use client';

import React, { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  setDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import Modal from '@/components/Modal';
import { onAuthStateChanged } from 'firebase/auth';

const AddTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMemberIndex, setEditMemberIndex] = useState<number | null>(null);
  const [leadName, setLeadName] = useState<string>('');
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Check if all team members have their details filled out
    const allMembersFilled = teamMembers.every(
      (member) =>
        member.name &&
        member.gender &&
        member.phone &&
        member.email &&
        member.college &&
        member.dept &&
        member.state
    );
    setIsSaveDisabled(!allMembersFilled);
  }, [teamMembers]);

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
    setIsLoading(true);
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        teamMembers,
        teamInfo: true,
      });
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const leadDetails = {
        teamName: userData?.teamName,
        teamCount: userData?.teamCount,
        lead: {
          name: userData?.name,
          gender: userData?.gender,
          phone: userData?.phone,
          email: userData?.email,
          college: userData?.college,
          department: userData?.department,
          state: userData?.state,
        },
      };
      await setDoc(doc(db, 'teams', user.uid), { leadDetails, teamMembers });
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Add Your Team Information
      </h1>

      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-white">Lead Name</h2>
          <p className="bg-gray-200 p-4 rounded-lg">{leadName}</p>
        </div>

        {teamMembers.map((member, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Team Member {index + 1}
            </h2>
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
          className={`w-full py-3 px-6 rounded-lg text-lg font-semibold mt-6 transition-all duration-300 flex justify-center ${
            isSaveDisabled
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          disabled={isSaveDisabled}
        >
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            'Save Team Information'
          )}
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
