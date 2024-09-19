// components/NotificationButton.tsx

import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import QRCode from 'qrcode';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MdQrCodeScanner } from 'react-icons/md';

const NotificationButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isUserSelected, setIsUserSelected] = useState(false); // State to track if user status is "selected"

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        console.log('User ID:', userId);

        try {
          // Fetch user document from Firestore
          const userDocRef = doc(db, 'users', userId); // Adjust the collection path as needed
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log('User Data:', userData);

            // Check if user's status is "selected"
            if (userData.status === 'selected') {
              setIsUserSelected(true); // Set state to indicate user is "selected"

              // Generate QR code
              const url = await QRCode.toDataURL(
                `https://innovatehub.vercel.app/admin/scan?teamId=${userId}`
              );
              setQrCodeUrl(url);
            } else {
              setIsUserSelected(false); // User's status is not "selected"
            }
          } else {
            console.log('No such document!');
            setIsUserSelected(false); // No document found for user
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setIsUserSelected(false); // Error occurred, set to false
        }
      }
    });
  }, [auth]);

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center justify-center rounded-full w-14 h-14 border border-white text-white hover:bg-gray-200 hover:text-black transition-all duration-300 bg-orange-500"
      >
        <MdQrCodeScanner className="text-xl" size={25} />
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Your Team QR Code</p>
            </div>
            {isUserSelected && qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Team QR Code"
                className="w-full h-auto"
              />
            ) : (
              <p>No QR code available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
