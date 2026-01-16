
import React, { useState, useEffect } from 'react';
import { Notice } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000); // 5 seconds per notice

    return () => clearInterval(interval);
  }, [notices]);

  if (notices.length === 0) return null;

  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 flex items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-0.5 text-xs font-bold uppercase tracking-wider mr-4 shrink-0">
          Notice
        </div>
        <div className="flex-1 relative h-6 overflow-hidden">
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              className={`absolute inset-0 flex items-center transition-all duration-700 transform ${
                index === currentIndex 
                  ? 'translate-y-0 opacity-100' 
                  : index < currentIndex 
                    ? '-translate-y-full opacity-0' 
                    : 'translate-y-full opacity-0'
              }`}
            >
              <p className="truncate text-sm md:text-base font-medium">{notice.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
