'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from '@firebase/firestore';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  role: 'student' | 'industry' | 'faculty' | 'others';
  gender: string;
  state: string;
  teamCount: number | null;
  teamName: string | null;
  psid: string | null;
  psTitle: string | null;
  os: string | null;
  college: string | null;
  department: string | null;
  domain: string | null;
  expertise: string | null;
  designation: string | null;
  organization: string | null;
  paid: boolean | null;
  teamInfo: string | null;
  id: string;
}

interface TeamDetails {
  leadDetails: {
    lead: {
      name: string;
      email: string;
      phone: string;
      college: string;
      department: string;
      gender: string;
      state: string;
    };
    teamCount: number;
    teamName: string;
  };
  teamMembers: Array<{
    name: string;
    email: string;
    phone: string;
    college: string;
    dept: string;
    gender: string;
    state: string;
  }>;
}

const categories = {
  AIML: [
    'All',
    'PS-AI1',
    'PS-AI2',
    'PS-AI3',
    'PS-AI4',
    'PS-AI5',
    'PS-AI6',
    'PS-AI7',
    'PS-AI8',
    'PS-AI9',
    'PS-AI10',
    'PS-AI11',
    'PS-AI12',
    'PS-AI13',
  ],
  CyberSecurity: ['All', 'PS-CS1', 'PS-CS2', 'PS-CS3', 'PS-CS4'],
  WebDevelopment: [
    'All',
    'PS-WD1',
    'PS-WD2',
    'PS-WD3',
    'PS-WD4',
    'PS-WD5',
    'PS-WD6',
    'PS-WD7',
  ],
  ARVR: [
    'All',
    'PS-AR1',
    'PS-AR2',
    'PS-AR3',
    'PS-AR4',
    'PS-AR5',
    'PS-AR6',
    'PS-AR7',
  ],
  OpenStatement: ['All'],
};

const UserManagement: React.FC = () => {
  const [students, setStudents] = useState<UserDetails[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categories>('AIML');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [teamDetails, setTeamDetails] = useState<{
    [key: string]: TeamDetails | null;
  }>({});

  const getStudentUsers = async (): Promise<UserDetails[]> => {
    try {
      const q = query(collection(db, 'users'), where('role', '==', 'student'));
      const querySnapshot = await getDocs(q);

      const students: UserDetails[] = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data() as UserDetails;
        studentData.id = doc.id;
        students.push(studentData);
      });

      return students;
    } catch (error) {
      console.error('Error fetching student users:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: UserDetails[] = await getStudentUsers();
      setStudents(data);
    };
    fetchData();
  }, []);

  const fetchTeamDetails = async (studentId: string) => {
    try {
      const docRef = doc(db, 'teams', studentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTeamDetails((prev) => ({
          ...prev,
          [studentId]: docSnap.data() as TeamDetails,
        }));
      } else {
        setTeamDetails((prev) => ({
          ...prev,
          [studentId]: null, // Clear if no team details found
        }));
      }
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  const handleStudentClick = (studentId: string) => {
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null); // Toggle off if already selected
    } else {
      setSelectedStudentId(studentId);
      if (!teamDetails[studentId]) {
        fetchTeamDetails(studentId);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    if (!student.psid) return false; // If psid is null, exclude the student

    const psidPrefix = student.psid.split('-')[1];

    const isCategoryMatch =
      (selectedCategory === 'AIML' && psidPrefix.startsWith('AI')) ||
      (selectedCategory === 'CyberSecurity' && psidPrefix.startsWith('CS')) ||
      (selectedCategory === 'WebDevelopment' && psidPrefix.startsWith('WD')) ||
      (selectedCategory === 'ARVR' && psidPrefix.startsWith('AR')) ||
      (selectedCategory === 'OpenStatement' && student.psid === 'PS-OPEN');

    const isSubcategoryMatch =
      selectedSubcategory === 'All' || student.psid === selectedSubcategory;

    return isCategoryMatch && isSubcategoryMatch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>

      <div className="flex space-x-4 mb-4">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setSelectedCategory(category as keyof typeof categories);
              setSelectedSubcategory('All'); // Reset subcategory to 'All' when category changes
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {categories[selectedCategory].map((subcategory) => (
          <button
            key={subcategory}
            className={`px-4 py-2 rounded ${
              selectedSubcategory === subcategory
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedSubcategory(subcategory)}
          >
            {subcategory}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {selectedCategory} - {selectedSubcategory} Students
        </h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-left">S.No</th>
              <th className="px-4 py-2 border text-left">Team Name</th>
              <th className="px-4 py-2 border text-left">Team Lead</th>
              <th className="px-4 py-2 border text-left">Lead Email</th>
              <th className="px-4 py-2 border text-left">Lead Phone No</th>
              <th className="px-4 py-2 border text-left">Team Size</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                  No students found for this category and subcategory.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <React.Fragment key={student.id}>
                  <tr
                    className={`cursor-pointer ${
                      selectedStudentId === student.email
                        ? 'bg-orange-100'
                        : 'odd:bg-white even:bg-gray-100'
                    }`}
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{student.teamName}</td>
                    <td className="px-4 py-2 border">{student.name}</td>
                    <td className="px-4 py-2 border">{student.email}</td>
                    <td className="px-4 py-2 border">{student.phone}</td>
                    <td className="px-4 py-2 border">{student.teamCount}</td>
                  </tr>
                  {selectedStudentId === student.id && (
                    <tr>
                      <td colSpan={6} className="px-4 py-2">
                        <div className="bg-gray-100 p-4 rounded shadow">
                          {teamDetails[student.id] ? (
                            <>
                              <p className="font-semibold">
                                Team Name :{' '}
                                {teamDetails[student.id]?.leadDetails.teamName}
                              </p>
                              <p className="font-semibold">
                                Team Size :{' '}
                                {teamDetails[student.id]?.leadDetails.teamCount}
                              </p>
                              {student.os && (
                                <p className="font-semibold">
                                  Open Statement : {student.os}
                                </p>
                              )}
                              <h5 className="font-semibold">Team Lead :</h5>
                              <p>{`${
                                teamDetails[student.id]?.leadDetails.lead.name
                              } | ${
                                teamDetails[student.id]?.leadDetails.lead.email
                              } | ${
                                teamDetails[student.id]?.leadDetails.lead.phone
                              }`}</p>
                              <div className="mt-2">
                                <h5 className="font-semibold">
                                  Team Members :
                                </h5>
                                <ul className="list-disc ml-5">
                                  {teamDetails[student.id]?.teamMembers.map(
                                    (member, idx) => (
                                      <li key={idx}>
                                        {`${member.name} | ${member.email} | ${member.phone} | ${member.college} | ${member.dept}`}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <p>Loading team details...</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRoleBasedAccess(UserManagement, 'admin');
