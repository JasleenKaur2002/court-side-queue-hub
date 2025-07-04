import React from 'react';
import { Clock, Users } from 'lucide-react';

interface DraftHeaderProps {
  currentCategory: string;
  currentTeamOnClock: string;
  timeLeft: number;
  currentPickNumber: number;
  leagueName: string;
}

const DraftHeader: React.FC<DraftHeaderProps> = ({ 
  currentCategory, 
  currentTeamOnClock, 
  timeLeft,
  currentPickNumber,
  leagueName
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 10) return 'text-red-400';
    if (timeLeft <= 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-[#1a1b2e] border-b border-[#232440] px-4 py-3">
      {/* League Name Bar */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg">
          <span className="text-white font-bold text-lg">{leagueName || "Draft League"}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Current Category */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 px-3 py-1 rounded-full">
            <span className="text-white font-semibold text-sm">Current Category</span>
          </div>
          <span className="text-white font-bold text-lg">{currentCategory}</span>
          <span className="text-gray-400 text-sm">Select your pick for this category</span>
        </div>

        {/* Center - Team on Clock */}
        <div className="flex items-center gap-4 bg-red-600/20 border border-red-500 rounded-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-red-400" />
            <span className="text-white font-semibold">{currentTeamOnClock} On Clock</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className={getTimeColor()} />
            <span className={`font-bold text-lg ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Right side - Pick Info */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Overall Pick</span>
          <div className="bg-blue-600 px-3 py-1 rounded-full">
            <span className="text-white font-bold">#{currentPickNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftHeader;
