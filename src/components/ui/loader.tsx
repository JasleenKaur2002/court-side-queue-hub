import React from 'react';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;

  const loadingMessages = [
    "Warming up the court...",
    "Preparing the draft board...",
    "Loading NBA data...",
    "Setting up your league...",
    "Getting ready to draft...",
    "Analyzing player stats...",
    "Configuring team rosters...",
    "Loading championship data..."
  ];

  const randomMessage = message === "Loading..." ? 
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)] : 
    message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6 text-white">
        {/* Basketball Animation */}
        <div className="relative">
          {/* Basketball Court */}
          <div className="w-32 h-20 border-2 border-orange-400 rounded-lg relative bg-orange-100/10">
            {/* Court lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-orange-400 rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-10 border-l border-r border-orange-400"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-10 border-l border-r border-orange-400"></div>
          </div>
          
          {/* Bouncing Basketball */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="animate-bounce">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full relative shadow-lg">
                {/* Basketball lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-black rounded"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-6 bg-black rounded"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border border-black rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-400 mb-2">4Cast</h2>
          <p className="text-lg text-white animate-pulse">{randomMessage}</p>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>


    </div>
  );
};

export default Loader; 