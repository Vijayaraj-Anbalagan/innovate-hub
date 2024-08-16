'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';

interface TeamMemberProps {
  teamInfo: boolean | null;
  setTeamInfo: any;
}

interface TeamMember {
  college: string;
  dept: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  state: string;
}

interface TeamDetails {
  leadDetails: {
    teamCount: number;
    teamName: string;
    lead: {
      college: string;
      department: string;
      email: string;
      gender: string;
      name: string;
      phone: string;
      state: string;
    };
  };
  teamMembers: TeamMember[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ teamInfo, setTeamInfo }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null);

  const handleAddTeamClick = () => {
    router.push('/inth24/addteam');
  };

  const handleUserDetails = async () => {
    setIsVisible(!isVisible);
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'teams', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data() as TeamDetails;
        setTeamDetails(data);
      }
    }
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
          <p className="text-green-500 mb-4 flex flex-wrap gap-2 justify-center items-center">
            Your team information is complete.
            <button
              className="p-2 bg-orange-500 text-white rounded "
              onClick={() => handleUserDetails()}
            >
              {`${isVisible ? 'Hide Team Details' : 'View Team Details'}`}
            </button>
          </p>
          {isVisible && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {teamDetails && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">
                    {teamDetails.leadDetails.teamName}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b border-gray-700">
                            Lead Information
                          </th>
                          <th className="px-4 py-2 border-b border-gray-700"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Name:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Email:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.email}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            College:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.college}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Department:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.department}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Phone:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.phone}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            State:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.lead.state}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Team Name:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.teamName}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-gray-700">
                            Team Count:
                          </td>
                          <td className="px-4 py-2 border-b border-gray-700">
                            {teamDetails.leadDetails.teamCount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold text-orange-500 mb-4">
                {teamDetails?.teamMembers.length ? 'Team Members' : ''}
              </h3>
              {teamDetails?.teamMembers &&
                teamDetails.teamMembers.map((member, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      Member {index + 1}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-gray-300">
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              Name:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.name}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              Email:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.email}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              College:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.college}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              Department:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.dept}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              Phone:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.phone}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-gray-700">
                              State:
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">
                              {member.state}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMember;
