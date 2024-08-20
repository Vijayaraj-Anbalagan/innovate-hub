'use client';

import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
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
  role: string;
  paid?: boolean | null;
  imageUrl?: string;
  domain?: string;
  expertise?: string;
  favoriteProblemStatements?: string[];
  paymentScreenshot?: string;
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
  const [problemStatements, setProblemStatements] = useState<
    ProblemStatement[]
  >([]);
  const [mainFilter, setMainFilter] = useState('Students');
  const [subFilter, setSubFilter] = useState('Approved');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
    setUsers(usersList);
    setFilteredUsers(
      usersList.filter((user) => user.role === 'student' && user.paid === true)
    ); // Default to Approved students
  };

  const fetchProblemStatements = async () => {
    const querySnapshot = await getDocs(collection(db, 'problemStatements'));
    const problemStatementsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      createdBy: doc.data().createdBy,
      problemStatement: doc.data().problemStatement,
    })) as ProblemStatement[];
    setProblemStatements(problemStatementsList);
  };

  //Initial Mount Call
  useEffect(() => {
    fetchUsers();
    fetchProblemStatements();
  }, []);

  useEffect(() => {
    if (mainFilter === 'Students') {
      const students = users.filter((user) => user.role === 'student');
      if (subFilter === 'Approved') {
        setFilteredUsers(students.filter((user) => user.paid === true));
      } else if (subFilter === 'Pending') {
        setFilteredUsers(students.filter((user) => user.paid === null));
      } else if (subFilter === 'Rejected') {
        setFilteredUsers(students.filter((user) => user.paid === false));
      }
    } else if (mainFilter === 'Industry') {
      setFilteredUsers(users.filter((user) => user.role === 'industry'));
    } else if (mainFilter === 'Faculty') {
      setFilteredUsers(users.filter((user) => user.role === 'faculty'));
    } else if (mainFilter === 'Others') {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.role !== 'student' &&
            user.role !== 'industry' &&
            user.role !== 'faculty'
        )
      );
    }
  }, [mainFilter, subFilter, users]);

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

  const determinePaidStatus = (email: string | string[]) => {
    const domain = (email as string).split('@')[1]; // Get domain part after @
    const departmentCode = email.slice(4, 7); // Get characters at index 4, 5, 6 for department code
    const isCseStudent = email[2] === 'c' && email[3] === 's'; // Check if cs is at index 2, 3

    if (
      domain === 'kcgcollege.com' &&
      (isCseStudent || departmentCode === '104' || departmentCode === '128')
    ) {
      return true;
    }
    return null;
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handlePayment = async (decision: boolean) => {
    try {
      const docRef = doc(db, 'users', selectedUser?.id || '');
      await updateDoc(docRef, { paid: decision });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="relative max-w-screen min-h-screen">
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 mt-16 py-6 px-6 flex max-w-screen justify-between relative">
        <div className="  flex flex-col w-[73%]">
          <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
          <div className="flex space-x-2 mb-6">
            {['Students', 'Industry', 'Faculty', 'Others'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg ${
                  mainFilter === tab ? 'bg-orange-500 text-white' : 'bg-white'
                }`}
                onClick={() => setMainFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {mainFilter === 'Students' && (
            <>
              <div className="flex space-x-2 mb-6">
                {['Approved', 'Pending', 'Rejected'].map((subTab) => (
                  <button
                    key={subTab}
                    className={`px-4 py-2 rounded-lg ${
                      subFilter === subTab
                        ? 'bg-blue-500 text-white'
                        : 'bg-white'
                    }`}
                    onClick={() => setSubFilter(subTab)}
                  >
                    {subTab}
                  </button>
                ))}
              </div>

              <h2 className="text-2xl font-semibold mb-4">
                {subFilter} Students
              </h2>
              <table className="min-w-full bg-white mb-6">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">S.No</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.name}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.phone}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.email}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                          onClick={() => handleViewUser(user.id)}
                        >
                          View
                        </button>
                        {/* <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleDeleteUser(user)}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {mainFilter !== 'Students' && (
            <div className="flex">
              <div className="w-3/4">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Phone</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Role</th>
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
                        <td className="py-2 px-4 border-b">{user.role}</td>
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
            </div>
          )}
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
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg ">
          {selectedUser && (
            <div>
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
              <div>
                <button
                  onClick={handleClick}
                  className="bg-blue-500 p-2 rounded text-white mt-2 "
                >
                  {isVisible ? 'Hide Payment Photo' : 'View Payment Photo'}
                </button>
                {isVisible &&
                  determinePaidStatus(selectedUser.email) === true && (
                    <h1>KCG CSE/CS Student[No payment required]</h1>
                  )}
                {isVisible &&
                  determinePaidStatus(selectedUser.email) === null &&
                  selectedUser.paymentScreenshot === undefined && (
                    <h1 className="text-red-500">Payment yet to be Done</h1>
                  )}
              </div>
              <div className="w-full flex justify-around mt-2">
                <button
                  className="p-2 bg-green-500 text-white rounded w-20"
                  onClick={() => handlePayment(true)}
                >
                  Approve
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded w-20 "
                  onClick={() => handlePayment(false)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
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
      {isVisible && selectedUser?.paymentScreenshot && (
        <div className="w-full h-full bg-black/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-10 right-40 bg-white rounded-full z-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="black"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <img
            src={selectedUser?.paymentScreenshot} // Replace with your photo URL
            alt="Payment Photo"
            style={{ marginTop: '10px' }}
          />
        </div>
      )}
    </main>
  );
};

export default withRoleBasedAccess(AdminUsers, 'admin');
