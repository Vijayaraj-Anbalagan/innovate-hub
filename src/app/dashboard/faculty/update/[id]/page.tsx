'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter, useParams } from 'next/navigation';
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

const UpdateProblemStatement: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [problemCharCount, setProblemCharCount] = useState(0);
  const [outcomeCharCount, setOutcomeCharCount] = useState(0);
  const [selectedSdgGoals, setSelectedSdgGoals] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [problemData, setProblemData] = useState<FormData | null>(null);

  useEffect(() => {
    if (auth.currentUser && id) {
      const fetchProblemData = async () => {
        const docRef = doc(db, "problemStatements", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as FormData;
          setProblemData(data);
          setValue('problemStatement', data.problemStatement);
          setValue('expectedOutcome', data.expectedOutcome);
          setValue('sdgGoals', data.sdgGoals);
          setValue('hashtags', data.hashtags);
          setProblemCharCount(data.problemStatement.length);
          setOutcomeCharCount(data.expectedOutcome.length);
          setSelectedSdgGoals(data.sdgGoals);
          setHashtags(data.hashtags);
        } else {
          console.log("No such document!");
        }
      };
      fetchProblemData();
    }
  }, [id, setValue]);

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
      const docRef = doc(db, "problemStatements", id as string);
      await updateDoc(docRef, {
        problemStatement: data.problemStatement,
        expectedOutcome: data.expectedOutcome,
        sdgGoals: data.sdgGoals,
        hashtags: data.hashtags,
      });
      toast.success("Problem statement updated successfully!");
      router.push('/dashboard/faculty');
    } catch (error) {
      toast.error("Failed to update problem statement: " + error);
    }
  };

  const sdgOptions = [
    "goal1", "goal2", "goal3", "goal4", "goal5", "goal6", "goal7", "goal8", "goal9", "goal10", "goal11", "goal12", "goal13", "goal14", "goal15", "goal16", "goal17"
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-lg w-full max-w-xl">
          <h1 className="text-white text-2xl font-semibold mb-6">Update Problem Statement</h1>

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
                  className={`cursor-pointer border rounded p-2 items-center flex flex-col ${selectedSdgGoals.includes(goal) ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => toggleSdgGoal(goal)}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      className='rounded-lg'
                      src={`/sdgs/${goal}.svg`}
                      alt={goal}
                      width={128}
                      height={48}
                    />
                  </div>
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
          <div className='flex justify-between'>
            <button type="button" className="bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 px-10 py-2" onClick={() => router.push('/dashboard/faculty')}>🡨 Back</button>
            <button type="submit" className="bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 px-10 py-2">Update</button>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </>
  );
};

export default UpdateProblemStatement;
