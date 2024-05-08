'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';  // Adjust this import based on your actual Firebase config path
import { onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';

// Creating the type for the context state
type AuthContextType = {
    user: firebase.User | null;
    loading: boolean;
};

// Creating the context
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// AuthProvider component - make sure the name here matches what you import and use in _app.tsx
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user as firebase.User); // Update the type of the setUser function
                // Keep or remove the redirection based on your application logic
                // router.push('/dashboard');
            } else {
                setUser(null);
                // Keep or remove the redirection based on your application logic
                // router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();  // Properly unsubscribe on component unmount
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
