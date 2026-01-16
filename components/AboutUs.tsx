
import React from 'react';
import { AboutData } from '../types';

interface AboutUsProps {
  data: AboutData;
}

const AboutUs: React.FC<AboutUsProps> = ({ data }) => {
  return (
    <section id="about" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">About Us</h2>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl border-4 border-white">
          <img 
            src={data.image} 
            alt="About V-MAC" 
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2">
            {data.text}
          </p>
          <div className="flex gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex-1">
              <i className="fas fa-stethoscope text-2xl text-blue-600 mb-2"></i>
              <h4 className="font-bold text-blue-900">Expert Care</h4>
              <p className="text-sm text-gray-600">Professional veterinary attention.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex-1">
              <i className="fas fa-hand-holding-heart text-2xl text-blue-600 mb-2"></i>
              <h4 className="font-bold text-blue-900">Welfare</h4>
              <p className="text-sm text-gray-600">Advocating for animal rights.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
