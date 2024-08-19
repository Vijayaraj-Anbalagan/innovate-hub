'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const QRCodeGenerator: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const url = await QRCode.toDataURL(
          `https://innovatehub.vercel.app/admin/qrscan?id=${userId}`
        );
        console.log('Url', userId);
        setQrCodeUrl(url);
      }
    });
  }, [auth]);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6">
      {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
    </div>
  );
};

export default QRCodeGenerator;
