import React from 'react';

const Timeline = () => {
  return (
    <main className="min-h-screen  text-white flex justify-center items-center">
      <div className="timeline  text-white max-w-lg p-6 rounded-lg shadow-lg">
        <div className="tl-content tl-content-active">
          <div className="tl-header">
            <span className="tl-marker"></span>
            <p className="tl-title font-semibold">Registration Starts</p>
            <time className="tl-time text-sm text-gray-500">10th Aug 2024</time>
          </div>
          <div className="tl-body">
            <p>
              Registration starts from 10th August.
            </p>
          </div>
        </div>

        <div className="tl-content">
          <div className="tl-header">
            <span className="tl-marker"></span>
            <p className="tl-title font-semibold">Registration Ends</p>
            <time className="tl-time text-sm text-gray-500">31st Aug 2024</time>
          </div>
          <div className="tl-body">
            <p>{`We'll review your application and will let you know.`}</p>
          </div>
        </div>

        <div className="tl-content">
          <div className="tl-header">
            <span className="tl-marker"></span>
            <p className="tl-title font-semibold">Prelims</p>
            <time className="tl-time text-sm text-gray-500">14th Sep 2024</time>
          </div>
          <div className="tl-body">
            <p>PPT Presentation and Prototype 20%.<br/> Mode: Hybrid.</p>
          </div>
        </div>

        <div className="tl-content">
          <div className="tl-header">
            <span className="tl-marker"></span>
            <p className="tl-title font-semibold">Grand Finale</p>
            <time className="tl-time text-sm text-gray-500">20th - 21st Sep 2024</time>
          </div>
          <div className="tl-body">
            <p>PPT Presentation and Buisness Model<br/> Prototype 100%.<br/> Mode: Offline.
            </p>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Timeline;
