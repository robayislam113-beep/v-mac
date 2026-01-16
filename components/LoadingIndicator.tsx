
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Top Progress Bar */}
      <div className="h-1 bg-blue-100 w-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite] w-1/3 origin-left"></div>
      </div>
      
      {/* Subtle Spinner Overlay */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-blue-900">Loading V-MAC...</span>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%) scaleX(1); }
          50% { transform: translateX(100%) scaleX(2); }
          100% { transform: translateX(300%) scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;
