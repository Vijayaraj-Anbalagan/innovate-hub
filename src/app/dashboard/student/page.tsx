'use client';
// pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, storage } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Statements } from '@/lib/allps';
import Image from 'next/image';
import MentorSupport from '@/components/MentorSupport';
import NotificationButton from '@/components/NotificationButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import TeamMember from '@/components/TeamMember';

const StudentDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [studentPsid, setStudentPsid] = useState<string | null>(null);
  const [os, setOs] = useState<string | null>(null);
  const [osCategory, setOsCategory] = useState<string | null>(null);
  const [paid, setPaid] = useState<boolean | null | undefined>(undefined);
  const [teamCount, setTeamCount] = useState<number>(1);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const router = useRouter();
  const [teamInfo, setTeamInfo] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User', user);
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        console.log('UserDoc', userDoc);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.name);
          setStudentPsid(userData.psid);
          setPaid(userData.paid);
          setTeamCount(userData.teamCount || 1);
          if (userData.teamCount === 1) {
            setTeamInfo(true);
          } else {
            setTeamInfo(userData.teamInfo);
          }
          if (userData.paymentScreenshot) {
            setUploaded(true);
          }
          if (userData.psid === 'PS-OPEN' && userData.os) {
            const osParts = userData.os.split(':');
            const problemStatement = osParts
              ? osParts.slice(0, -1).join(':').trim()
              : '';
            const category = osParts ? osParts[osParts.length - 1].trim() : '';
            setOs(problemStatement);
            setOsCategory(category);
          }

          const currentHour = new Date().getHours();
          if (currentHour < 12) {
            setGreeting('Good Morning');
          } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
          } else {
            setGreeting('Good Evening');
          }
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (paymentScreenshot) {
      setUploading(true);

      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const storageRef = ref(storage, `paymentScreenshots/${userId}`);
          await uploadBytes(storageRef, paymentScreenshot);
          const downloadURL = await getDownloadURL(storageRef);

          // Optionally, save the downloadURL in the user's document in Firestore
          const userDocRef = doc(db, 'users', userId);
          await setDoc(
            userDocRef,
            { paymentScreenshot: downloadURL },
            { merge: true }
          );

          setUploaded(true);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const totalAmount = teamCount * 100;

  const whatsappGroupLink = 'https://chat.whatsapp.com/FKfKxVogKX0LZurACGkpUY';

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center text-white mt-16 relative">
        <div
          className={`p-8 w-full max-w-6xl transition-all duration-500 ${
            paid ? 'blur-none' : 'blur-md'
          }`}
        >
          <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
          <h2 className="text-lg font-semibold mb-6">{greeting}</h2>
          <TeamMember teamInfo={teamInfo} setTeamInfo={setTeamInfo} />

          <h3 className="text-xl font-semibold mb-4">Your Problem Statement</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {studentPsid === 'PS-OPEN' && os ? (
              <div className="border border-white p-5 rounded-lg shadow-lg hover:shadow-xl duration-300 flex flex-col hover:scale-95 transition-all">
                <div className="flex flex-col justify-start align-middle">
                  <p className="text-sm text-black mb-2 bg-orange-500 rounded-full p-1 px-2 text-center">
                    {studentPsid} {osCategory && `(${osCategory})`}
                  </p>
                  <h2 className="text-lg font-semibold text-white mb-2 mr-2">
                    {os}
                  </h2>
                </div>
              </div>
            ) : (
              Statements.filter(
                (statement) => statement.psid === studentPsid
              ).map((problem) => (
                <div
                  key={problem.id}
                  className="border border-white p-5 rounded-lg shadow-lg hover:shadow-xl duration-300 flex flex-col justify-between hover:scale-95 transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-orange-500 mb-2 mr-2">
                        {problem.title}
                      </h2>
                      <p className="text-md text-black mb-2 bg-white rounded-full p-1 px-2 text-center min-w-[90px]">
                        {problem.psid}
                      </p>
                    </div>
                    <p className="text-lg text-gray-300 mb-2 break-words">
                      <strong>Objective:</strong> {problem.objective}
                    </p>
                    <p className="text-gray-300 mb-2 text-lg break-words">
                      <strong>Background:</strong> {problem.background}
                    </p>
                    <p className="text-gray-300 mb-2 text-lg">
                      <strong>Industry:</strong> {problem.industy}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                    <Image
                      src={problem.logo ?? ''}
                      alt={`${problem.industy} logo`}
                      width={56}
                      height={56}
                      className="mb-3 sm:mb-0 rounded-full"
                    />
                    <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3 sm:mt-0">
                      {problem.sdgGoals &&
                        problem.sdgGoals.map((goal, index) => (
                          <Image
                            className="rounded-lg"
                            key={index}
                            src={`/sdgs/${goal}.svg`}
                            alt={goal}
                            width={56}
                            height={56}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 flex space-x-4">
            <MentorSupport mode="locked" value="Mentor" />
            <NotificationButton alert />
            <WhatsAppButton link={whatsappGroupLink} />
          </div>
        </div>
        {paid === null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-black w-full max-w-lg sm:max-w-2xl shadow-2xl">
              <h2 className="text-xl font-bold mb-1 text-center">
                Complete Your Registration
              </h2>
              <p className="text-lg mb-2 text-center">
                Please complete your registration by making the payment to
                access the full dashboard.
              </p>

              <div className="mb-2">
                <p className="text-md font-semibold mb-2">
                  <i className="fas fa-university mr-2"></i> Bank Details:
                </p>
                <div className="bg-gray-100 p-2 rounded-lg text-sm">
                  <p>
                    <strong>Account Name:</strong> KCG COLLEGE OF TECHNOLOGY
                  </p>
                  <p>
                    <strong>Bank Name:</strong> UNION BANK OF INDIA
                  </p>
                  <p>
                    <strong>Branch Name:</strong> SSI Guindy, Chennai - 600032
                  </p>
                  <p>
                    <strong>IFSC CODE:</strong> UBIN0552631
                  </p>
                  <p>
                    <strong>Account No:</strong> 526301010020010
                  </p>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex flex-col mb-3 w-1/2">
                  <p className="text-md font-semibold mb-2">
                    <i className="fas fa-receipt mr-2"></i> Payment Summary:
                  </p>
                  <div className="bg-gray-100 p-2 rounded-lg text-sm">
                    <p>
                      <strong>Team Count:</strong> {teamCount}
                    </p>
                    <p>
                      <strong>Registration Fee:</strong> ₹100 per member
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{teamCount} X ₹100 ={' '}
                      <span className="text-lg font-bold">₹{totalAmount}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-3 ml-4 w-1/2">
                  <p className="text-md font-semibold mb-2">
                    <i className="fas fa-receipt mr-2"></i>Please Mention
                    Remarks as:
                  </p>
                  <p className="p-2 border border-dashed border-black rounded-sm text-center">
                    <strong>Innothon 24</strong>
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="paymentScreenshot"
                  className="block text-md font-semibold mb-2"
                >
                  <i className="fas fa-upload mr-2"></i> Upload Payment
                  Screenshot
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="paymentScreenshot"
                    onChange={handleFileChange}
                    className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="absolute right-3 top-2">
                    <i className="fas fa-file-alt text-gray-500"></i>
                  </div>
                </div>
                {paymentScreenshot && (
                  <p className="text-sm text-gray-600 mt-2">
                    <i className="fas fa-check-circle text-green-500 mr-1"></i>{' '}
                    {paymentScreenshot.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={!paymentScreenshot || uploading}
                className={`w-full text-white py-2 px-4 rounded-lg text-lg font-semibold ${
                  uploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : !uploaded
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-yellow-500 cursor-wait'
                } transition-all duration-300`}
              >
                {uploading ? (
                  <div className="flex justify-center items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Uploading...
                  </div>
                ) : (
                  <span>{uploaded ? 'Verification Pending' : 'Submit'}</span>
                )}
              </button>

              {uploaded && (
                <div className="mt-3 bg-green-100 p-2 rounded-lg text-center">
                  <p className="text-green-700 font-semibold">
                    <i className="fas fa-check-circle mr-2"></i> Payment
                    screenshot uploaded successfully!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    We will verify your registration shortly. If it takes longer
                    than expected, contact us at <br />
                    <strong>+91 98849 95814</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;
