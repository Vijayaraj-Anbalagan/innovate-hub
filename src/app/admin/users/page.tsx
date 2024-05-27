'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  imageUrl?: string;
  domain?: string;
  expertise?: string;
  favoriteProblemStatements?: string[];
}

interface ProblemStatement {
  createdBy: string;
  id: string;
  problemStatement: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [filter, setFilter] = useState('Students');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
      setUsers(usersList);
      setFilteredUsers(usersList.filter(user => user.role === 'student'));
    };

    const fetchProblemStatements = async () => {
      const querySnapshot = await getDocs(collection(db, 'problemStatements'));
      const problemStatementsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        createdBy: doc.data().createdBy,
        problemStatement: doc.data().problemStatement
      })) as ProblemStatement[];
      setProblemStatements(problemStatementsList);
    };

    fetchUsers();
    fetchProblemStatements();
  }, []);

  useEffect(() => {
    if (filter === 'Students') {
      setFilteredUsers(users.filter(user => user.role === 'student'));
    } else if (filter === 'Industry') {
      setFilteredUsers(users.filter(user => user.role === 'industry'));
    } else if (filter === 'Faculty') {
      setFilteredUsers(users.filter(user => user.role === 'faculty'));
    } else if (filter === 'Others') {
      setFilteredUsers(users.filter(user => user.role !== 'student' && user.role !== 'industry' && user.role !== 'faculty'));
    }
  }, [filter, users]);

  const handleViewUser = async (id: string) => {
    const userDoc = await getDoc(doc(db, 'users', id));
    setSelectedUser({ id, ...userDoc.data() } as User);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast.success(`${userToDelete.name} has been deleted.`);
      setShowDeleteConfirmation(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const getFavoriteProblemStatements = (favoriteProblemStatements: string[]) => {
    return favoriteProblemStatements.map(statementId => {
      const statement = problemStatements.find(problem => problem.id === statementId);
      return statement ? statement.problemStatement.slice(0, 50) + '...' : statementId;
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 flex flex-col p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        <div className="flex space-x-2 mb-6">
          {['Students', 'Industry', 'Faculty', 'Others'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg ${filter === tab ? 'bg-orange-500 text-white' : 'bg-white'}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex">
          <div className="w-3/4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">S.No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  {filter !== 'Students' && <th className="py-2 px-4 border-b">Role</th>}
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    {filter !== 'Students' && <td className="py-2 px-4 border-b">{user.role}</td>}
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleViewUser(user.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteUser(user)}
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
            {selectedUser && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                {selectedUser.imageUrl && (
                  <img src={selectedUser.imageUrl} alt="Profile" className="mb-4 w-24 h-24 rounded-full mx-auto" />
                )}
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Domain:</strong> {selectedUser.domain}</p>
                <p><strong>Expertise:</strong> {selectedUser.expertise}</p>
                {selectedUser.role === 'student' && (
                  <>
                    <h3 className="text-lg font-semibold mt-4">Favorite Problem Statements</h3>
                    <ul className="list-disc list-inside">
                      {getFavoriteProblemStatements(selectedUser.favoriteProblemStatements || []).map(statement => (
                        <li key={statement}>{statement}</li>
                      ))}
                    </ul>
                  </>
                )}
                {selectedUser.role !== 'student' && (
                  <>
                    <h3 className="text-lg font-semibold mt-4">Created Problem Statements</h3>
                    <ul className="list-disc list-inside">
                      {problemStatements.filter(problem => problem.createdBy === selectedUser.id).map(problem => (
                        <li key={problem.id}>{problem.problemStatement.slice(0, 50)}...</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete {userToDelete?.name}?</p>
              <div className="flex justify-end mt-4">
                <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={cancelDeleteUser}>Cancel</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDeleteUser}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default AdminUsers;
