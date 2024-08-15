'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';

interface ProblemStatement {
  id: string;
  problemStatement: string;
  expectedOutcome: string;
  sdgGoals: string[];
  hashtags: string[];
  createdBy: string;
  userName: string;
  userRole: string;
}

const AdminProblems: React.FC = () => {
  const [problems, setProblems] = useState<ProblemStatement[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<ProblemStatement | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      const querySnapshot = await getDocs(collection(db, 'problemStatements'));
      const problemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdBy: `${doc.data().userName} / ${doc.data().userRole}`
      })) as ProblemStatement[];
      setProblems(problemsList);
    };
    fetchProblems();
  }, []);

  const handleViewProblem = (id: string) => {
    const problem = problems.find(p => p.id === id);
    setSelectedProblem(problem || null);
  };

  const handleDeleteProblem = (problem: ProblemStatement) => {
    setProblemToDelete(problem);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteProblem = async () => {
    if (problemToDelete) {
      await deleteDoc(doc(db, 'problemStatements', problemToDelete.id));
      setProblems(problems.filter(p => p.id !== problemToDelete.id));
      toast.success(`Problem statement "${problemToDelete.problemStatement.slice(0, 50)}..." has been deleted.`);
      setShowDeleteConfirmation(false);
      setProblemToDelete(null);
    }
  };

  const cancelDeleteProblem = () => {
    setShowDeleteConfirmation(false);
    setProblemToDelete(null);
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 flex flex-col p-12 mt-14">
        <h1 className="text-3xl font-bold mb-6">Manage Problem Statements</h1>
        <div className="flex">
          <div className="w-3/4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">S.No</th>
                  <th className="py-2 px-4 border-b">Problem Statement</th>
                  <th className="py-2 px-4 border-b">Created By</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr key={problem.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{problem.problemStatement.slice(0, 50)}...</td>
                    <td className="py-2 px-4 border-b">{problem.createdBy}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleViewProblem(problem.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteProblem(problem)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 ml-4 bg-white p-4 rounded-lg shadow-lg">
            {selectedProblem && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Problem Statement</h2>
                <p><strong>Statement:</strong> {selectedProblem.problemStatement}</p>
                <p><strong>Expected Outcome:</strong> {selectedProblem.expectedOutcome}</p>
                <h3 className="text-lg font-semibold mt-4">SDG Goals</h3>
                <div className="flex flex-wrap space-x-2 gap-2 mt-2">
                  {selectedProblem.sdgGoals.map((goal, index) => (
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
                <h3 className="text-lg font-semibold mt-4">Hashtags</h3>
                <div className="flex flex-wrap space-x-2">
                  {selectedProblem.hashtags.map((tag, index) => (
                    <span key={index} className="bg-orange-500 text-white rounded-full px-2 py-1 m-1">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this problem statement?</p>
              <div className="flex justify-end mt-4">
                <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={cancelDeleteProblem}>Cancel</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDeleteProblem}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default withRoleBasedAccess(AdminProblems, 'admin');
