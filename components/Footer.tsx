
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-800 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                <i className="fas fa-paw"></i>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">V-MAC</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering veterinary professionals and animal lovers to create a world where every creature is cared for and respected.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-blue-500 transition-colors">Gallery</a></li>
              <li><a href="#committee" className="hover:text-blue-500 transition-colors">Committee</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/share/1VV4Y153qe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="mailto:vmac.gb.2025@gmail.com" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <p className="text-xs">
              <i className="fas fa-university mr-2"></i> Gono Bishwabidyalay, Savar, Dhaka.
            </p>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 V-MAC Gono University. All rights reserved.</p>
          <div className="text-gray-500">
            develop by <span className="text-blue-500 font-medium">Robay Islam Chayon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
