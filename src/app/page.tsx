import React from 'react';
import Image from 'next/image';
import logo from '/public/logo.png';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
    <div>
    <div className='flex flex-row'>
    <h1 className="text-white text-4xl font-semibold mt-4 ">
        Innovation 
    </h1>
    <h1 className="text-orange-500 text-4xl font-semibold mt-4 ml-2 ">
        Hub 
    </h1>
    </div>
    <div>
    <p className="text-white text-lg mt-2">
    Where Innovation Meets 
  </p>
  <p className="text-white text-lg ">
     Expertise
  </p>
  <p className=" text-gray-400 text-sm mt-1 font-semibold">
    Developed by Nipix Tech
  </p>
    </div>
    <div className="flex flex-col mt-4 justify-center">

      <Image src={logo} alt="Innovate Hub Logo" width={263} height={300} />
      

      <Link href={'/login'} className="mt-8 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-10 py-2">
        Get Started
      </Link>
      <Link href={'/inth24'} className="mt-4 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-10 py-2">
        Innothon 24 
        </Link>
        </div>
    </div>
  </div>
  );
}
