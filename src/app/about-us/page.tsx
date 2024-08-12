// pages/about-us.tsx
'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { FiUsers, FiTarget, FiAward } from 'react-icons/fi';

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-14 p-12 text-white">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">About Innovate Hub</h1>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <div className="flex flex-col items-center text-center max-w-4xl mb-8 space-y-4">
            <FiUsers className="text-orange-500 text-6xl mb-4" />
            <p className="text-lg">
              Innovate Hub is a platform dedicated to nurturing innovation and entrepreneurship among students. We aim to provide the resources and support needed to transform creative ideas into successful ventures.
            </p>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <div className="flex flex-col items-center text-center max-w-4xl mb-8 space-y-4">
            <FiTarget className="text-orange-500 text-6xl mb-4" />
            <p className="text-lg">
              Our mission is to foster a culture of innovation and excellence. We strive to elevate the standards of our students by providing a platform for them to showcase their talents and turn their ideas into reality.
            </p>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Achievements</h2>
          <div className="flex flex-col items-center text-center max-w-4xl space-y-4">
            <FiAward className="text-orange-500 text-6xl mb-4" />
            <p className="text-lg">
              Innovate Hub has aimed to successfully guide numerous students to achieve remarkable milestones in their entrepreneurial journeys. Such that Our Students will go on to become leaders and trendsetters one day in their respective fields.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
