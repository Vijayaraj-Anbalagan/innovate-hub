'use client';
// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import Image from 'next/image';
import logo from '/public/logo.png';
import { useRouter } from 'next/navigation';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    // Hardcoded check for admin credentials
    if (email === 'admin@kcg' && password === 'kcg24cse5c') {
      router.push('/admin');
    } else if (email === 'inthadmin' && password === 'inthadminpanel24atdb') {
      router.push('/inthadminpanel24atdb');
    } else {
      // Proceed with Firebase authentication for other users
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Handle successful login here
          router.push('/dashboard');
        })
        .catch((error) => {
          console.error("Authentication error:", error.message);
          setError("Invalid email or password."); // Display error message to the user
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-8">
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center justify-center align-middle">
          <Link href={'/'}>
          <Image src={logo} alt="Innovate Hub Logo" width={150} height={171} />
          </Link>
        </div>
        <h1 className="text-white text-xl font-semibold mb-6 text-center mt-4">Log in to Innovate Hub</h1>
        {error && <p className="text-white text-sm mb-4 bg-red-600 p-1 rounded-lg px-2">{error}</p>}
        <div className="mb-3">
          <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email or Username</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="mt-3 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-20 py-2" type="submit">
            Sign In
          </button>
          <Link href="/forgot-password" className="inline-block align-baseline  text-sm text-orange-500 hover:text-orange-600 mt-3">
            Forgot Password?
          </Link>
          {/* <p className="text-white mt-4">
            Need an account?{' '}
            <Link href="/register" className="text-orange-500 hover:text-orange-600 ml-1 text-center">Register</Link>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
