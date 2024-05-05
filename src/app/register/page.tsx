'use client'

// pages/register.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [expertise, setExpertise] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

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
    setError(''); // Clear previous errors

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        let imageUrl = '';
        if (profileImage) {
          const imageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(imageRef, profileImage);
          imageUrl = await getDownloadURL(imageRef);
        }

        await updateProfile(user, {
          displayName: domain,
          photoURL: imageUrl
        });

        // Save additional user details along with the selected role
        await setDoc(doc(db, "users", user.uid), {
          email,
          domain,
          expertise,
          imageUrl,
          role  // Store the role in Firestore
        });

        router.push('/dashboard');  // Redirect to dashboard after registration
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleRegister} className="p-8 rounded-lg">
        <h1 className="text-white text-2xl font-semibold mb-6">Register for Innovate Hub</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {/* Profile Image Field */}
        <div className="mb-4 items-center justify-center align-middle">
          <label htmlFor="profileImage" className="text-center block text-white text-sm font-bold mb-3">Profile Picture</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
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
            required
          />
        </div>
        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-white text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Domain Field */}
        <div className="mb-4">
          <label htmlFor="domain" className="block text-white text-sm font-bold mb-2">Domain</label>
          <input
            type="text"
            id="domain"
            placeholder='Your domain'
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Expertise Field */}
        <div className="mb-6">
          <label htmlFor="expertise" className="block text-white text-sm font-bold mb-2">Expertise</label>
          <input
            type="text"
            id="expertise"
            placeholder='Your expertise'
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="flex flex-col items-center align-middle justify-between mt-4">
          <button className="mt-4 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-10 py-2" type="submit">
            Register
          </button>
        
        {/* Login Link */}
        <p className="text-white mt-4">
          Already have an account?{' '}
          <Link href="/login"  className="text-orange-500 hover:text-orange-600">Login
          </Link>
        </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
