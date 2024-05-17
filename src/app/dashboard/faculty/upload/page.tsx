'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { doc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface FormData {
  problemStatement: string;
  expectedOutcome: string;
  sdgGoals: string[];
  hashtags: string[];
}

const FacultyDashboard: React.FC = () => {
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('');
  const [problemCharCount, setProblemCharCount] = useState(0);
  const [outcomeCharCount, setOutcomeCharCount] = useState(0);
  const [selectedSdgGoals, setSelectedSdgGoals] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserRole = async () => {
        const userId = auth.currentUser?.uid || ''; // Add a fallback value for undefined case
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
          if (userDoc.data().role === 'student') {
            router.push('/dashboard/student');
          }
        }
      };
      fetchUserRole();
    }
  }, [router]);

  const handleAddHashtag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ',') && hashtags.length < 5) {
      event.preventDefault();
      const value = (event.target as HTMLInputElement).value.trim();
      if (value && !hashtags.includes(value)) {
        setHashtags([...hashtags, value]);
        setValue('hashtags', [...hashtags, value]);
        (event.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    const updatedHashtags = hashtags.filter(h => h !== tag);
    setHashtags(updatedHashtags);
    setValue('hashtags', updatedHashtags);
  };

  const toggleSdgGoal = (goal: string) => {
    let updatedGoals = [...selectedSdgGoals];
    if (updatedGoals.includes(goal)) {
      updatedGoals = updatedGoals.filter(g => g !== goal);
    } else if (updatedGoals.length < 5) {
      updatedGoals.push(goal);
    }
    setSelectedSdgGoals(updatedGoals);
    setValue('sdgGoals', updatedGoals);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "problemStatements"), {
        problemStatement: data.problemStatement,
        expectedOutcome: data.expectedOutcome,
        sdgGoals: data.sdgGoals,
        hashtags: data.hashtags,
        userId: auth.currentUser?.uid,
        createdAt: new Date()
      });
      toast.success("Problem statement submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit problem statement: " + error);
    }
  };

  const sdgOptions = [
    "goal1", "goal2", "goal3", "goal4", "goal5", "goal6", "goal7", "goal8", "goal9", "goal10", "goal11", "goal12", "goal13", "goal14", "goal15", "goal16", "goal17"
  ];

  return (
    <>
     <Navbar />
    <div className="min-h-screen flex flex-col justify-center items-center">
    
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-lg w-full max-w-xl">
        <h1 className="text-white text-2xl font-semibold mb-6">Submit a Problem Statement</h1>

        <div className="mb-4">
          <label htmlFor="problemStatement" className="block text-white text-sm font-bold mb-2">Problem Statement ({problemCharCount}/50)</label>
          <textarea
            {...register('problemStatement', {
              required: true,
              maxLength: 50,
              onChange: (e) => setProblemCharCount(e.target.value.length)
            })}
            maxLength={50}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.problemStatement && <span className="text-red-500 text-sm">Problem statement is required and must be less than 50 characters.</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="expectedOutcome" className="block text-white text-sm font-bold mb-2">Expected Outcome ({outcomeCharCount}/120)</label>
          <textarea
            {...register('expectedOutcome', {
              required: true,
              maxLength: 120,
              onChange: (e) => setOutcomeCharCount(e.target.value.length)
            })}
            maxLength={120}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.expectedOutcome && <span className="text-red-500 text-sm">Expected outcome is required and must be less than 120 characters.</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="sdgGoals" className="block text-white text-sm font-bold mb-2">SDG Goals</label>
          <div className="grid grid-cols-3 gap-2 items-center justify-center">
            {sdgOptions.map((goal) => (
              <div
                key={goal}
                className={`cursor-pointer border rounded p-2 items-center ${selectedSdgGoals.includes(goal) ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => toggleSdgGoal(goal)}
              >
                <Image
                  src={`/sdgs/${goal}.svg`}
                  alt={goal}
                  width={64}
                  height={48}
                  className='items-center justify-center'
                />

              </div>
            ))}
          </div>
          {errors.sdgGoals && <span className="text-red-500 text-sm">Please select between 1 and 5 SDG goals.</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="hashtags" className="block text-white text-sm font-bold mb-2">Hashtags</label>
          <input
            type="text"
            placeholder="Enter hashtags separated by commas"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onKeyDown={handleAddHashtag}
          />
          <div className="mt-2 flex flex-wrap">
            {hashtags.map((tag) => (
              <div key={tag} className="flex items-center bg-orange-500 text-white rounded-full px-2 py-1 m-1">
                <span>#{tag}</span>
                <button type="button" onClick={() => handleRemoveHashtag(tag)} className="ml-1 text-sm text-red-500">&times;</button>
              </div>
            ))}
          </div>
          {errors.hashtags && <span className="text-red-500 text-sm">Please enter between 3 and 5 hashtags.</span>}
        </div>

        <button type="submit" className="bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 px-10 py-2">Submit</button>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    </>
  );
};

export default FacultyDashboard;
