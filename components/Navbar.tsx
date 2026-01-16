
import React, { useState } from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const handleLinkClick = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
    setShowSettingsDropdown(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('HOME');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 700);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-blue-100 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleLinkClick('HOME')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
            <i className="fas fa-paw group-hover:scale-110 transition-transform"></i>
          </div>
          <span className="font-bold text-xl text-blue-900 tracking-tight">V-MAC</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleLinkClick('HOME')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</button>
          <button onClick={() => scrollToSection('articles')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Articles</button>
          <button onClick={() => handleLinkClick('GALLERY_ALL')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Gallery</button>
          <button onClick={() => handleLinkClick('COMMITTEE_ALL')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Committee</button>
          
          <div className="relative">
            <button 
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600"
            >
              <i className="fas fa-cog"></i>
            </button>
            
            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => handleLinkClick('ADMIN')}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 flex items-center gap-3"
                >
                  <i className="fas fa-sliders-h text-blue-600"></i> Customise
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-2xl text-blue-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => handleLinkClick('HOME')} className="text-left py-2 font-medium text-gray-700">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-left py-2 font-medium text-gray-700">About</button>
          <button onClick={() => scrollToSection('articles')} className="text-left py-2 font-medium text-gray-700">Articles</button>
          <button onClick={() => handleLinkClick('GALLERY_ALL')} className="text-left py-2 font-medium text-gray-700">Gallery</button>
          <button onClick={() => handleLinkClick('COMMITTEE_ALL')} className="text-left py-2 font-medium text-gray-700">Committee</button>
          <button onClick={() => handleLinkClick('ADMIN')} className="text-left py-2 font-medium text-blue-600 flex items-center gap-2">
            <i className="fas fa-cog"></i> Customise (Admin)
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
