
import React from 'react';
import { CommitteeMember } from '../types';

interface CommitteeProps {
  members: CommitteeMember[];
  limit?: number;
  showAll?: boolean;
  onSeeMore?: () => void;
}

const Committee: React.FC<CommitteeProps> = ({ members, limit, showAll = false, onSeeMore }) => {
  const sortedMembers = [...members].sort((a, b) => a.position - b.position);
  const displayMembers = limit ? sortedMembers.slice(0, limit) : sortedMembers;

  return (
    <section id="committee" className="scroll-mt-24">
      {!showAll && <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Committee Members</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {displayMembers.map((member) => (
          <div 
            key={member.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-50 text-center p-6 transition-all hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="relative mx-auto w-40 h-40 mb-4">
              <div className="absolute inset-0 bg-blue-600 rounded-full scale-105 group-hover:scale-110 transition-transform blur-sm opacity-20"></div>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover border-4 border-white relative z-10"
              />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-1">{member.name}</h4>
            <p className="text-blue-600 font-medium">{member.designation}</p>
          </div>
        ))}
      </div>

      {!showAll && members.length > (limit || 0) && (
        <div className="text-center mt-10">
          <button 
            onClick={onSeeMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            View Full Committee
          </button>
        </div>
      )}
    </section>
  );
};

export default Committee;
