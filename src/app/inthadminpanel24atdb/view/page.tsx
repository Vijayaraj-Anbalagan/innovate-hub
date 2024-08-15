'use client';

import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavbar from '@/components/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withRoleBasedAccess from '@/components/withRoleBasedAccess';

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  teamName: string;
  teamCount: string;
  problemStatementId: string;
  role: string;
  imageUrl?: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState('All');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      let allUsers: User[] = [];
      for (let i = 1; i <= 10; i++) {
        const collectionName = `part${i}`;
        const querySnapshot = await getDocs(collection(db, collectionName));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        allUsers = [...allUsers, ...usersList];
      }
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredUsers(users);
    } else {
      const partNumber = filter.split('-')[1];
      setFilteredUsers(
        users.filter((user) => user.problemStatementId === partNumber)
      );
    }
  }, [filter, users]);

  const handleViewUser = async (id: string) => {
    // Find user from users array based on ID
    const user = users.find((user) => user.id === id);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      toast.success(`${userToDelete.name} has been deleted.`);
      setShowDeleteConfirmation(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex flex-col p-12 mt-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        <div className="flex space-x-2 mb-6">
          {[
            'All',
            'PS-1',
            'PS-2',
            'PS-3',
            'PS-4',
            'PS-5',
            'PS-6',
            'PS-7',
            'PS-8',
            'PS-9',
            'PS-10',
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg ${
                filter === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex">
          <div className="w-3/4">
            <table className="min-w-full bg-white text-black border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">S.No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Team Name</th>
                  <th className="py-2 px-4 border-b">Team Members</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">{user.teamName}</td>
                    <td className="py-2 px-4 border-b">{user.teamCount}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleViewUser(user.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 ml-4 bg-white p-4 rounded-lg shadow-lg">
            {selectedUser && (
              <div className="text-black">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                {selectedUser.imageUrl && (
                  <img
                    src={selectedUser.imageUrl}
                    alt="Profile"
                    className="mb-4 w-24 h-24 rounded-full mx-auto"
                  />
                )}
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Team Name:</strong> {selectedUser.teamName}
                </p>
                <p>
                  <strong>Team Members:</strong> {selectedUser.teamCount}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>PS ID:</strong> {selectedUser.problemStatementId}
                </p>
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
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={cancelDeleteUser}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={confirmDeleteUser}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default withRoleBasedAccess(AdminUsers, 'admin');
