'use client'
// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [userProfile, setUserProfile] = useState<{ name: string, imageUrl: string | null }>({ name: '', imageUrl: null });
    const router = useRouter();

    useEffect(() => {
        if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const fetchUserProfile = async () => {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserProfile({
                        name: userData.name || 'No Name',
                        imageUrl: userData.imageUrl || null
                    });
                }
            };
            fetchUserProfile();
        }
    }, []);

    const handleLogout = async () => {
        setShowLogoutConfirm(false);
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className=" bg-inherit text-white mt-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="text-orange-500 font-bold text-lg">Innovate Hub</Link>
                <div className="flex items-center space-x-4">
                    {userProfile.imageUrl && (
                        <div className="relative" onClick={() => setShowProfileOptions(!showProfileOptions)}>
                            <Image src={userProfile.imageUrl} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" width={35} height={35} />
                            {showProfileOptions && (
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl text-black z-50">
                                    <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/update-details')}>Update Profile</a>
                                    <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => setShowLogoutConfirm(true)}>Logout</a>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="hidden md:flex">
                        <Link href="/about-us" className="px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                        <Link href="/contact-us" className="px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700">
                            <svg width="24" height="24" fill="none" stroke="currentColor" className="h-8 w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/about-us" className="block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
                        <Link href="/contact-us" className="block px-3 py-2 rounded-md text-base font-medium">Contact Us</Link>
                    </div>
                </div>
            )}
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

export default Navbar;
