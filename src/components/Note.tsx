import React from 'react';
import { BsCurrencyRupee, BsPeopleFill, BsClockFill } from 'react-icons/bs';
import { AiOutlineFileDone } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';

const Note = () => {
  return (
    <div className="bg-gray-800 border-l-4 border-orange-500 text-gray-300 p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Note Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <BsCurrencyRupee className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Registration Fee: Rs.100/- per person for entry<br />
                Rs.250/- per person for the finalists
              </p>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="flex items-center">
            <BsPeopleFill className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Team must consist of maximum 5 members only
              </p>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="flex items-center">
            <BsClockFill className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                30 hour hackathon
              </p>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="flex items-center">
            <AiOutlineFileDone className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Participants are expected to develop a prototype for the chosen problem statement.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Harish Karthik D - President, INNOCOM
              </p>
              <a href="tel:+919884995814" className="text-sm text-orange-500 underline">
                9884995814
              </a>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="flex items-center">
            <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Jerem Mathew A - Secretary, INNOCOM
              </p>
              <a href="tel:+919940072755" className="text-sm text-orange-500 underline">
                9940072755
              </a>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="flex items-center">
            <FiPhoneCall className="h-6 w-6 text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium">
                Aishwarya S - Treasurer, INNOCOM
              </p>
              <a href="tel:+919894414307" className="text-sm text-orange-500 underline">
                9894414307
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
