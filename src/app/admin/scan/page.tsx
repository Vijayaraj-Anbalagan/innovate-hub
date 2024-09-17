// pages/admin/scan.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
        alert('No team found for this ID');
      }
      setLoading(false);
    };

    fetchTeamDetails();
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
    const updatedTeamDetails = { ...teamDetails };
    if (index !== undefined) {
      updatedTeamDetails.teamMembers[index][field] = e.target.value;
    } else {
      updatedTeamDetails.lead[field] = e.target.value;
    }
    setTeamDetails(updatedTeamDetails);
  };

  const handleAdmit = async () => {
    if (!teamDetails) return;

    const attendanceRef = doc(db, 'attendance', teamDetails.teamName);
    await setDoc(attendanceRef, {
      ...teamDetails,
      attendance: 'present',
    });
    alert('Attendance recorded successfully!');
    router.push('/admin/dashboard');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamDetails) {
    return <div>No team details found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Lead Information</h3>
        <input
          type="text"
          value={teamDetails.lead.name}
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Lead Name"
          className="mb-4 p-2 border rounded w-full"
        />
        {/* Add more fields similarly for lead and team members */}

        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        {teamDetails.teamMembers.map((member: any, index: number) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleInputChange(e, 'name', index)}
              placeholder={`Member ${index + 1} Name`}
              className="mb-2 p-2 border rounded w-full"
            />
            {/* Add more fields similarly */}
          </div>
        ))}

        <button
          onClick={handleAdmit}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Admit
        </button>
      </div>
    </div>
  );
};

export default AdminScanPage;
