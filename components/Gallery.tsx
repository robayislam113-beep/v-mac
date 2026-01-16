
import React from 'react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
  limit?: number;
  showAll?: boolean;
  onSeeMore?: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, limit, showAll = false, onSeeMore }) => {
  const sortedItems = [...items].sort((a, b) => b.timestamp - a.timestamp);
  const displayItems = limit ? sortedItems.slice(0, limit) : sortedItems;

  if (showAll) {
    return (
      <div className="space-y-12">
        {sortedItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <img 
              src={item.image} 
              alt={item.caption} 
              className="w-full aspect-video object-cover"
            />
            <div className="p-6">
              <p className="text-lg font-medium text-gray-800">{item.caption}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="gallery" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Gallery</h2>
      <div className="space-y-8">
        {displayItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative overflow-hidden">
               <img 
                src={item.image} 
                alt={item.caption} 
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                Latest Post
              </div>
            </div>
            <div className="p-6">
              <p className="text-xl font-semibold text-gray-800">{item.caption}</p>
            </div>
          </div>
        ))}

        {!showAll && items.length > (limit || 0) && (
          <div className="text-center mt-8">
            <button 
              onClick={onSeeMore}
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md flex items-center gap-2 mx-auto"
            >
              See All Posts <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
