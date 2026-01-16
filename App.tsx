
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import NoticeBoard from './components/NoticeBoard';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Committee from './components/Committee';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LoadingIndicator from './components/LoadingIndicator';
import CommentForm from './components/CommentForm';
import Articles from './components/Articles';
import { Notice, AboutData, GalleryItem, CommitteeMember, ViewState, Article } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isLoading, setIsLoading] = useState(false);
  
  // Persistence using LocalStorage
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('vmac_notices');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'Welcome to V-MAC! We are dedicated to animal welfare.' },
      { id: '2', text: 'Upcoming Free Vaccination Clinic on December 15th.' }
    ];
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    const saved = localStorage.getItem('vmac_about');
    return saved ? JSON.parse(saved) : {
      image: 'https://picsum.photos/800/600?animal=1',
      text: 'Veterinary Medicine and Animal Welfare Club (V-MAC) is a community of passionate individuals at Gono University. Our mission is to promote animal health and advocate for the well-being of all creatures through education, service, and medical excellence.'
    };
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('vmac_gallery');
    return saved ? JSON.parse(saved) : [
      { id: '1', image: 'https://picsum.photos/600/400?vet=1', caption: 'Field clinic visit 2024', timestamp: Date.now() - 100000 },
      { id: '2', image: 'https://picsum.photos/600/400?vet=2', caption: 'Rescue operations in Savar', timestamp: Date.now() - 500000 }
    ];
  });

  const [committee, setCommittee] = useState<CommitteeMember[]>(() => {
    const saved = localStorage.getItem('vmac_committee');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Dr. Sarah Ahmed', image: 'https://picsum.photos/200/200?person=1', designation: 'President', position: 1 },
      { id: '2', name: 'John Doe', image: 'https://picsum.photos/200/200?person=2', designation: 'General Secretary', position: 2 },
      { id: '3', name: 'Emily White', image: 'https://picsum.photos/200/200?person=3', designation: 'Volunteer Lead', position: 3 }
    ];
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('vmac_articles');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Basic First Aid for Street Dogs',
        author: 'Admin',
        content: 'Learn how to provide immediate care to injured animals on the streets before getting professional help...',
        image: 'https://picsum.photos/800/500?dog=1',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      }
    ];
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('vmac_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('vmac_about', JSON.stringify(aboutData));
  }, [aboutData]);

  useEffect(() => {
    localStorage.setItem('vmac_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('vmac_committee', JSON.stringify(committee));
  }, [committee]);

  useEffect(() => {
    localStorage.setItem('vmac_articles', JSON.stringify(articles));
  }, [articles]);

  const navigateTo = (view: ViewState) => {
    if (view === currentView) return;
    
    setIsLoading(true);
    // Simulate a transition delay for better UX
    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <>
            <NoticeBoard notices={notices} />
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-20">
              <AboutUs data={aboutData} />
              
              <Articles articles={articles} />

              <Gallery 
                items={gallery} 
                limit={1} 
                onSeeMore={() => navigateTo('GALLERY_ALL')} 
              />
              <Committee 
                members={committee} 
                limit={2} 
                onSeeMore={() => navigateTo('COMMITTEE_ALL')} 
              />
              <section id="contact" className="space-y-6">
                 <h2 className="text-3xl font-bold text-blue-900 text-center">Contact Us</h2>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                       <div className="flex items-start gap-4">
                          <i className="fas fa-map-marker-alt text-blue-600 mt-1 text-xl"></i>
                          <div>
                             <h4 className="font-semibold text-lg">Address</h4>
                             <p className="text-gray-600">Gono Bishwabidyalay (Gono University) in Savar is Nolam, P.O. Mirzanagar via Savar Cantonment, Ashulia, Savar, Dhaka-1344, Bangladesh</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="flex items-center gap-4">
                          <i className="fas fa-envelope text-blue-600 text-xl"></i>
                          <div>
                             <h4 className="font-semibold text-lg">Email</h4>
                             <p className="text-gray-600">vmac.gb.2025@gmail.com</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <i className="fab fa-facebook-f text-blue-600 text-xl"></i>
                          <div>
                             <h4 className="font-semibold text-lg">Social Media</h4>
                             <a href="https://www.facebook.com/share/1VV4Y153qe/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">V-MAC Official Facebook</a>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 {/* New Comment Form Section */}
                 <CommentForm />
              </section>
            </main>
          </>
        );
      case 'GALLERY_ALL':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => navigateTo('HOME')} className="mb-6 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Full Gallery</h2>
            <Gallery items={gallery} showAll={true} />
          </div>
        );
      case 'COMMITTEE_ALL':
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <button onClick={() => navigateTo('HOME')} className="mb-6 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Committee Members</h2>
            <Committee members={committee} showAll={true} />
          </div>
        );
      case 'ADMIN':
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <AdminPanel 
              onClose={() => navigateTo('HOME')}
              notices={notices}
              setNotices={setNotices}
              aboutData={aboutData}
              setAboutData={setAboutData}
              gallery={gallery}
              setGallery={setGallery}
              committee={committee}
              setCommittee={setCommittee}
              articles={articles}
              setArticles={setArticles}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <LoadingIndicator />}
      <Navbar onNavigate={navigateTo} />
      <div className={`flex-grow pt-16 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
