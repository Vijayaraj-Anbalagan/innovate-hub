'use client'
// Define the types for your form data
interface ProfileFormData {
    name: string;
    phoneno: string;
    domain: string;
    expertise: string;
}

// pages/update-profile.tsx
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';  // Ensure correct paths
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'firebase/database';
import Navbar from '@/components/Navbar';

const UpdateProfile = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();
    const router = useRouter();

    useEffect(() => {
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const fetchUserData = async () => {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data() as ProfileFormData;
                    setValue('name', userData.name);
                    setValue('phoneno', userData.phoneno);
                    setValue('domain', userData.domain);
                    setValue('expertise', userData.expertise);
                } else {
                    toast.error("No user data found.");
                }
            };

            fetchUserData();
        }
    }, [setValue]);

    const onSubmit: SubmitHandler<ProfileFormData> = async data => {
        if (!auth.currentUser) {
            toast.error("User not authenticated");
            return;
        }

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, data as { [x: string]: any })
            .then(() => {
                toast.success("Profile Updated Successfully!");
                router.push('/dashboard');
            })
            .catch(error => {
                toast.error("Update failed: " + error.message);
            });
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-lg">
                <h1 className="text-white text-2xl font-semibold mb-6">Update Your Details</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name</label>
                    <input {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneno" className="block text-white text-sm font-bold mb-2">Phone Number</label>
                    <input {...register('phoneno', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.domain && <span>This field is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="domain" className="block text-white text-sm font-bold mb-2">Domain</label>
                    <input {...register('domain', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.domain && <span>This field is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="expertise" className="block text-white text-sm font-bold mb-2">Expertise</label>
                    <input {...register('expertise', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.expertise && <span>This field is required</span>}
                </div>
                <button type="submit" className="bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 px-10 py-2">Update</button>
            </form>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
        </>
    );
};

export default UpdateProfile;
