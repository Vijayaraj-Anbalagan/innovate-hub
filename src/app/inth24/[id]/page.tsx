'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const validSecretKeys = [
  'IC24APLM', 'IC24QWHY', 'IC24YUJI', 'IC24BNHY', 'IC24VGYU', 'IC24XSWZ' 
];

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>(''); // Add phone number field
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [teamCount, setTeamCount] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [role, setRole] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const fetchUserData = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData.phone);
          setTeamCount(userData.teamCount);
          setTeamName(userData.teamName);
          setRole(userData.role);
          setSecretKey(userData.secretKey);
          setPreviewImage(userData.imageUrl);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (role !== 'student' && !validSecretKeys.includes(secretKey)) {
      setError("Invalid secret key.");
      return;
    }
    setError(''); // Clear previous errors

    try {
      let user;

      if (!auth.currentUser) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        await updateProfile(user, { displayName: name, photoURL: '' });
      } else {
        user = auth.currentUser;
      }

      let imageUrl = '';
      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, profileImage);
        imageUrl = await getDownloadURL(imageRef);
        await updateProfile(user, { photoURL: imageUrl });
      }

      const userDocRef = doc(db, `part${id}`, `${user.uid}_${id}`);
      await setDoc(userDocRef, {
        name,
        email,
        phone,
        teamCount,
        teamName,
        imageUrl,
        role,
        problemStatementId: id
      }, { merge: true });

      toast.success("Registration/Update successful!");
      router.push('/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <form onSubmit={handleRegister} className="p-8 rounded-lg">
        <h1 className="text-white text-2xl font-semibold mb-6 mt-14">Register for INNOTHON 24</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {/* Profile Image Field */}
        <div className="mb-4 items-center justify-center align-middle">
          <label htmlFor="profileImage" className="text-center block text-white text-sm font-bold mb-3">Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
            required={!previewImage}
          />
          <label htmlFor="profileImage" className='flex items-center justify-center align-middle'>
            {previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewImage} alt="Profile preview" className="w-24 h-24 rounded-full cursor-pointer" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                <span className="text-white text-lg">+</span>
              </div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-white text-sm font-bold mb-2">Select Your Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="industry">Industry</option>
            <option value="alumni">Alumni</option>
            <option value="startup">Startup</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* Secret Key Field for Non-Students */}
        {role !== 'student' && (
          <div className="mb-4">
            <label htmlFor="secretKey" className="block text-white text-sm font-bold mb-2">Enter Secret Key</label>
            <input
              type="text"
              id="secretKey"
              placeholder="Enter secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder='Your phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required={!auth.currentUser}
          />
        </div>
        {/* Confirm Password Field */}
        {!auth.currentUser && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-white text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={!auth.currentUser}
            />
          </div>
        )}
        {/* Domain Field */}
        <div className="mb-4">
          <label htmlFor="domain" className="block text-white text-sm font-bold mb-2">Team Name</label>
          <input
            type="text"
            id="domain"
            placeholder='Your Team Name'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Expertise Field */}
        <div className="mb-6">
          <label htmlFor="expertise" className="block text-white text-sm font-bold mb-2">Team Count</label>
          <input
            type="text"
            id="expertise"
            placeholder='Your Team Count'
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="flex flex-col items-center align-middle justify-between mt-4">
          <button className="mt-4 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-10 py-2" type="submit">
            {auth.currentUser ? 'Update' : 'Register'}
          </button>
        
        {/* Login Link */}
        <p className="text-white mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:text-orange-600">Login
          </Link>
        </p>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;
