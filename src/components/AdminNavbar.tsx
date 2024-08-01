// components/AdminNavbar.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminNavbar: React.FC = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    // Logic to sign out the user
    // await signOut(auth);
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push('/admin')}>
          <span className="text-orange-500 font-bold text-lg">Innovate Hub</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push('/inthadminpanel24atdb')} className="hover:text-orange-500">Innothon 24</button>
          <button onClick={() => router.push('/admin/users')} className="hover:text-orange-500">Users</button>
          <button onClick={() => router.push('/admin/problems')} className="hover:text-orange-500">Problem Statements</button>
          <button onClick={() => setShowLogoutConfirm(true)} className="hover:text-orange-500">Logout</button>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg space-y-4">
            <p className="text-black font-semibold">Do you want to Logout?</p>
            <div className="flex justify-between space-x-4">
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded">No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
