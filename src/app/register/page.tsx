'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import { Statements } from '@/lib/allps';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { set } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const validSecretKeys = [
  'IC24APLM',
  'IC24QWHY',
  'IC24YUJI',
  'IC24BNHY',
  'IC24VGYU',
  'IC24XSWZ',
];

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [teamCount, setTeamCount] = useState<number>(1);
  const [teamName, setTeamName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [role, setRole] = useState<string>('student');
  const [secretKey, setSecretKey] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [expertise, setExpertise] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [psid, setPsid] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [college, setCollege] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [psTitle, setPsTitle] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [os, setOs] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fetch open statement data from localStorage
    const storedOpenStatement = localStorage.getItem('openStatementData');
    if (storedOpenStatement) {
      const parsedData = JSON.parse(storedOpenStatement);
      if (parsedData) {
        const { problemStatement, category } = parsedData;
        setOs(
          problemStatement && category
            ? `${problemStatement} : ${category.toUpperCase()}`
            : null
        );
      }
    }
  }, []);

  const handleChangeOpenStatement = () => {
    // Clear the open statement data from localStorage
    localStorage.removeItem('openStatementData');

    // Redirect the user to the Open Statement submission page
    router.push('/inth24/open');
  };

  useEffect(() => {
    const id = searchParams.get('ps');
    if (id) {
      setPsid(id as string);
      const statementTitle = Statements.find((s) => s.psid === id)?.title;
      setPsTitle((statementTitle as string) || '');
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

  const determinePaidStatus = (email: string | string[]) => {
    const domain = (email as string).split('@')[1]; // Get domain part after @
    const departmentCode = email.slice(4, 7); // Get characters at index 4, 5, 6 for department code
    const isCseStudent = email[2] === 'c' && email[3] === 's'; // Check if cs is at index 2, 3

    if (
      domain === 'kcgcollege.com' &&
      (isCseStudent || departmentCode === '104' || departmentCode === '128')
    ) {
      return true;
    }
    return null;
  };

  const handlePsidChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPsid = event.target.value;
    setPsid(selectedPsid);

    if (selectedPsid === 'PS-OPEN') {
      const openStatementData = localStorage.getItem('openStatementData');
      if (!openStatementData) {
        router.push('/inth24/open');
        return;
      }

      const { problemStatement, category } = JSON.parse(openStatementData);
      setOs(
        problemStatement && category
          ? `${problemStatement} : ${category.toUpperCase()}`
          : null
      );
      setPsTitle('Open Problem Statement');
    } else {
      const statement = Statements.find((s) => s.psid === selectedPsid);
      setPsTitle(statement ? statement.title || '' : '');
      setOs(null);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          router.push('/dashboard');
        }
      }
    });
  }, [router]);

  const handleConfirmation = (confirm: boolean) => {
    if (confirm) {
      setIsLoading(true);
      // Proceed with the registration process
      handleRegister();
    } else {
      // Close the confirmation dialog and allow the user to modify their inputs
      setShowConfirmation(false);
    }
  };

  const handleRegister = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      setShowConfirmation(false);
      setIsLoading(false);
      return;
    }
    if (role !== 'student' && !validSecretKeys.includes(secretKey)) {
      setError('Invalid secret key.');
      toast.error('Invalid secret key.');
      setShowConfirmation(false);
      setIsLoading(false);
      return;
    }
    setError(''); // Clear previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = '';
      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, profileImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const data = await updateProfile(user, {
        displayName: name,
        photoURL:
          imageUrl.length === 0
            ? 'https://firebasestorage.googleapis.com/v0/b/innovate-hub.appspot.com/o/profileImages%2FPwCYHaMPD2bOWFr9gEQkhnoxI4A2?alt=media&token=5feb50cb-dd67-44f2-9f6f-ecf3f32c5b5d'
            : imageUrl,
      });

      const paid = determinePaidStatus(email);
      const teamInfo = teamCount === 1;

      const userDetails = {
        name,
        email,
        phone,
        imageUrl:
          imageUrl.length === 0
            ? 'https://firebasestorage.googleapis.com/v0/b/innovate-hub.appspot.com/o/profileImages%2FPwCYHaMPD2bOWFr9gEQkhnoxI4A2?alt=media&token=5feb50cb-dd67-44f2-9f6f-ecf3f32c5b5d'
            : imageUrl,
        role,
        gender,
        state,
        teamCount: role === 'student' ? teamCount : null,
        teamName: role === 'student' ? teamName : null,
        psid: role === 'student' ? psid : null,
        psTitle: role === 'student' ? psTitle : null,
        os: psid === 'PS-OPEN' ? os : null,
        college: role === 'student' ? college : null,
        department: role === 'student' ? department : null,
        domain: role !== 'student' ? domain : null,
        expertise: role !== 'student' ? expertise : null,
        designation: role !== 'student' ? designation : null,
        organization: role !== 'student' ? organization : null,
        paid,
        teamInfo,
      };

      await setDoc(doc(db, 'users', user.uid), userDetails);

      const teamDetails = {
        teamName,
        teamCount,
        lead: {
          name,
          gender,
          phone,
          email,
          college,
          department,
          state,
        },
        members: Array(teamCount - 1).fill({
          name: '',
          gender: '',
          phone: '',
          email: '',
          college: '',
          department: '',
          state: '',
        }),
      };

      const leadDetails = {
        teamName,
        teamCount,
        lead: {
          name,
          gender,
          phone,
          email,
          college,
          department,
          state,
        },
      };

      const teamMembers = Array(teamCount - 1).fill({
        name: '',
        gender: '',
        phone: '',
        email: '',
        college: '',
        department: '',
        state: '',
      });

      await setDoc(doc(db, 'teams', user.uid), { leadDetails, teamMembers });

      router.push('/dashboard'); // Redirect to dashboard after registration
      setIsLoading(false);
    } catch (error: any) {
      console.error('Registration error:', error.message);
      toast.error(`Registration error: ${error.message}`);
      setShowConfirmation(false);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const osParts = os?.split(':');
  const osProblemStatement = osParts
    ? osParts.slice(0, -1).join(':').trim()
    : '';
  const osCategory = osParts ? osParts[osParts.length - 1].trim() : '';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirmation(true);
        }}
        className="p-8 rounded-lg"
      >
        <h1 className="text-white text-2xl font-semibold mb-6">
          Register for Innovate Hub
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <div className="mb-4 items-center justify-center align-middle">
          <label
            htmlFor="profileImage"
            className="text-center block text-white text-sm font-bold mb-3"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <label
            htmlFor="profileImage"
            className="flex items-center justify-center align-middle"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="w-24 h-24 rounded-full cursor-pointer"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                <span className="text-white text-lg">+</span>
              </div>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-white text-sm font-bold mb-2"
          >
            Select Your Role
          </label>
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
        {role !== 'student' && (
          <div className="mb-4">
            <label
              htmlFor="secretKey"
              className="block text-white text-sm font-bold mb-2"
            >
              Enter Secret Key
            </label>
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
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-white text-sm font-bold mb-2"
          >
            Lead Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-white text-sm font-bold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-white text-sm font-bold mb-2"
          >
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlinee"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-sm font-bold mb-2"
          >
            Lead Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-white text-sm font-bold mb-2"
          >
            Lead Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-white text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {role == 'student' && (
          <>
            <div className="mb-4">
              <label
                htmlFor="teamName"
                className="block text-white text-sm font-bold mb-2"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                placeholder="Your Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="teamCount"
                className="block text-white text-sm font-bold mb-2"
              >
                Team Count (Incl Lead)
              </label>
              <select
                id="teamCount"
                value={teamCount}
                onChange={(e) => setTeamCount(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="psid"
                className="block text-white text-sm font-bold mb-2"
              >
                Problem Statement ID
              </label>
              <select
                id="psid"
                value={psid}
                onChange={handlePsidChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a PS-ID</option>
                {Statements.map((statement) => (
                  <option key={statement.psid} value={statement.psid}>
                    {statement.psid}
                  </option>
                ))}
              </select>
              {psid !== 'PS-OPEN' && psTitle && (
                <p className="text-sm text-orange-500 mt-2">{psTitle}</p>
              )}
              {psid === 'PS-OPEN' && os && (
                <div className="flex flex-col mt-2">
                  <p className="text-sm text-orange-500">
                    {osProblemStatement}
                  </p>
                  <button
                    type="button"
                    onClick={handleChangeOpenStatement}
                    className="text-blue-500 underline mt-2 hover:text-blue-700"
                  >
                    Change Open Statement
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="college"
                className="block text-white text-sm font-bold mb-2"
              >
                College
              </label>
              <input
                type="text"
                id="college"
                placeholder="Enter your college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-white text-sm font-bold mb-2"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                placeholder="Enter your department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </>
        )}
        {role !== 'student' && (
          <>
            <div className="mb-4">
              <label
                htmlFor="domain"
                className="block text-white text-sm font-bold mb-2"
              >
                Domain
              </label>
              <input
                type="text"
                id="domain"
                placeholder="Your Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="expertise"
                className="block text-white text-sm font-bold mb-2"
              >
                Expertise
              </label>
              <input
                type="text"
                id="expertise"
                placeholder="Your Expertise"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-white text-sm font-bold mb-2"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                placeholder="Your Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="organization"
                className="block text-white text-sm font-bold mb-2"
              >
                Organization
              </label>
              <input
                type="text"
                id="organization"
                placeholder="Your Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center align-middle justify-between mt-4">
          <button
            className="mt-4 bg-orange-500 text-white font-medium text-center rounded-full hover:bg-orange-600 button px-10 py-2"
            type="submit"
          >
            Register
          </button>
          <p className="text-white mt-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-orange-500 hover:text-orange-600"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-black max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Your Details</h2>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Team Name:</strong> {teamName}
            </p>
            <p>
              <strong>Team Count:</strong> {teamCount}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {psid && (
              <p>
                <strong>Problem Statement ID:</strong> {psid}{' '}
                {osCategory && `- (${osCategory})`}
              </p>
            )}
            <p>
              <strong>
                {psTitle ? 'Problem Statement' : 'Open Statement'}
              </strong>
              <p>{psTitle ? psTitle : osProblemStatement}</p>
            </p>

            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleConfirmation(true)}
              >
                {isLoading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Yes'
                )}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Register />
    </Suspense>
  );
}
