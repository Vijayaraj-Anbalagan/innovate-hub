// pages/contact.tsx
'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    toast.success("Message sent successfully!");
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-14 p-12 text-white">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Contact Us</h1>
        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-col items-center text-center max-w-4xl mb-8 space-y-4">
            <FiMapPin className="text-orange-500 text-6xl mb-4" />
            <h2 className="text-3xl font-semibold mb-4">Our Location</h2>
            <p className="text-lg">
              Innovate Hub, CSE Department , KCG College of Technology , OMR , Chennai
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-4xl mb-8 space-y-4">
            <FiPhone className="text-orange-500 text-6xl mb-4" />
            <h2 className="text-3xl font-semibold mb-4">Contact Number</h2>
            <p className="text-lg">+91 73585 51897 
              <br/> +91 75502 27793</p>
          </div>
          <div className="flex flex-col items-center text-center max-w-4xl mb-8 space-y-4">
            <FiMail className="text-orange-500 text-6xl mb-4" />
            <h2 className="text-3xl font-semibold mb-4">Email Address</h2>
            <p className="text-lg">team.ignite.kcg@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4 text-orange-500">Get in Touch</h2>
          <form onSubmit={handleSubmit(onSubmit)} className=" border-white border p-8 rounded-lg shadow-lg w-full max-w-xl">
            <div className="mb-4">
              <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name</label>
              <input {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
              <input {...register('email', { required: true })} type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white text-sm font-bold mb-2">Message</label>
              <textarea {...register('message', { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <button type="submit" className="bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 px-10 py-2">Send</button>
          </form>
          <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
