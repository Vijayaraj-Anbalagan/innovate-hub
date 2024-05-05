'use client'
// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="  bg-inherit text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/about-us" className="px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                                <Link href="/contact-us" className="px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                                <button onClick={() => console.log("Logout logic here")} className="px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
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
                        <button onClick={() => console.log("Logout logic here")} className="block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
