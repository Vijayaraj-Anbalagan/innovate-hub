import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
import React from 'react';

const auth = getAuth();
const db = getFirestore();

interface WithRoleBasedAccessProps {
  requiredRole: string;
}

const withRoleBasedAccess = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole: string
) => {
  const WithRoleBasedAccess: React.FC<P> = (props) => {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (user: User | null) => {
          if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data() as DocumentData;
              if (userData.role === requiredRole) {
                setHasAccess(true);
              } else {
                router.push('/dashboard');
              }
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }, [router, requiredRole]);

    if (loading) return <div>Loading...</div>;
    if (!hasAccess) return null;

    return <WrappedComponent {...(props as P)} />;
  };

  return WithRoleBasedAccess;
};

export default withRoleBasedAccess;
