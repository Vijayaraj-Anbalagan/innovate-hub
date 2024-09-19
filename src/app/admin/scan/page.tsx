'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminScanPage: React.FC = () => {
  const [teamDetails, setTeamDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const teamId = searchParams.get('teamId');
      if (!teamId) {
        alert('Invalid QR Code');
        return;
      }

      const teamDocRef = doc(db, 'teams', teamId);
      const teamDoc = await getDoc(teamDocRef);
      if (teamDoc.exists()) {
        setTeamDetails(teamDoc.data());
      } else {
        alert('No team found for this ID or team has not registered yet.');
      }
      setLoading(false);
    };

    fetchTeamDetails();
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    index?: number
  ) => {
    if (!teamDetails) return;
    const updatedTeamDetails = { ...teamDetails };

    if (index !== undefined) {
      updatedTeamDetails.teamMembers = updatedTeamDetails.teamMembers || [];
      updatedTeamDetails.teamMembers[index][field] = e.target.value;
    } else {
      updatedTeamDetails.leadDetails = updatedTeamDetails.leadDetails || {};
      updatedTeamDetails.leadDetails[field] = e.target.value;
    }

    setTeamDetails(updatedTeamDetails);
  };

  const handleRemoveMember = (index: number) => {
    if (!teamDetails) return;

    const updatedTeamDetails = { ...teamDetails };

    // Remove member from the array
    updatedTeamDetails.teamMembers.splice(index, 1);

    // Decrease the teamCount
    if (updatedTeamDetails.leadDetails.teamCount > 0) {
      updatedTeamDetails.leadDetails.teamCount -= 1;
    }

    setTeamDetails(updatedTeamDetails);
  };

  const handleAdmit = async () => {
    if (!teamDetails) return;

    try {
      console.log(teamDetails);
      const attendanceRef = doc(
        db,
        'Attendance',
        searchParams.get('teamId') || ''
      );

      await setDoc(attendanceRef, {
        ...teamDetails,
        attendance: 'present',
      });

      // Show a success toast message
      toast.success('Attendance successfully registered!');
    } catch (error) {
      console.error('Error recording attendance:', error);
      toast.error('Failed to record attendance. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamDetails || !teamDetails.leadDetails) {
    return <div>No team details found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 p-4">Team Details</h2>
      <h2 className="text-4xl font-bold text-center mb-2">
        {teamDetails.leadDetails.teamName}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Lead Information</h3>
        <h1 className="font-bold">Name :</h1>
        <input
          type="text"
          value={teamDetails.leadDetails?.lead?.name || ''}
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Lead Name"
          className="mb-4 p-2 border rounded w-full"
        />
        <h1 className="font-bold">Gender :</h1>
        <select
          value={teamDetails.leadDetails?.lead?.gender || ''}
          onChange={(e) => handleInputChange(e, 'gender')}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <h1 className="font-bold">College :</h1>
        <input
          type="text"
          value={teamDetails.leadDetails?.lead?.college || ''}
          onChange={(e) => handleInputChange(e, 'college')}
          placeholder="Lead Name"
          className="mb-4 p-2 border rounded w-full"
        />
        <h1 className="font-bold">Phone no :</h1>
        <input
          type="text"
          value={teamDetails.leadDetails?.lead?.phone || ''}
          onChange={(e) => handleInputChange(e, 'phone')}
          placeholder="Lead Name"
          className="mb-4 p-2 border rounded w-full"
        />

        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        {teamDetails.teamMembers &&
          teamDetails.teamMembers.map((member: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex w-full justify-between items-center">
                <h1 className="font-bold underline">{`Member ${
                  index + 1
                } :`}</h1>
              </div>
              <h1 className="font-bold">Name :</h1>
              <input
                type="text"
                value={member?.name || ''}
                onChange={(e) => handleInputChange(e, 'name', index)}
                placeholder={`Member ${index + 1} Name`}
                className="mb-2 p-2 border rounded w-full"
              />
              <h1 className="font-bold">Gender :</h1>
              <select
                value={member?.gender || ''}
                onChange={(e) => handleInputChange(e, 'gender', index)}
                className="mb-4 p-2 border rounded w-full"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <h1 className="font-bold">College :</h1>
              <input
                type="text"
                value={member?.college || ''}
                onChange={(e) => handleInputChange(e, 'college', index)}
                placeholder={`Member ${index + 1} Name`}
                className="mb-2 p-2 border rounded w-full"
              />
              <h1 className="font-bold">Phone No :</h1>
              <input
                type="text"
                value={member?.phone || ''}
                onChange={(e) => handleInputChange(e, 'phone', index)}
                placeholder={`Member ${index + 1} Name`}
                className="mb-2 p-2 border rounded w-full"
              />
            </div>
          ))}
        <button
          onClick={handleAdmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Admit
        </button>
      </div>
    </div>
  );
};

export default withRoleBasedAccess(function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminScanPage />
    </Suspense>
  );
}, 'admin');
