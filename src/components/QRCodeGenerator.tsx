// components/QRCodeGenerator.tsx

'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const QRCodeGenerator: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [teamId, setTeamId] = useState<string>('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const teamId = userDoc.data().teamId; // Ensure teamId exists in user data
          setTeamId(teamId);

          const url = await QRCode.toDataURL(
            `https://innovatehub.vercel.app/admin/scan?teamId=${teamId}`
          );
          setQrCodeUrl(url);
        }
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6">
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="Generated QR Code" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
