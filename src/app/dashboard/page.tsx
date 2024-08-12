'use client';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchUserData = async () => {
      if (!auth.currentUser) {
        return; // Return early if currentUser is null
      }

      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const fetchedRole = docSnap.data().role as string; // Ensure role is read as a string
        setRole(fetchedRole); // Set the user's role
        setLoading(false);
        // Move redirection logic out of the data fetching function
        redirectBasedOnRole(fetchedRole);
      } else {
        console.log('No such document!');
        // Handle the case where the document does not exist
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); // Remove 'role' from the dependency array

  const redirectBasedOnRole = (role: string) => {
    // Ensure the role is checked after it's fetched and state update has completed
    if (role === 'student') {
      router.push('/dashboard/student');
    } else if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard/faculty');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your role is: {role}</p>
    </div>
  );
};

export default Dashboard;
