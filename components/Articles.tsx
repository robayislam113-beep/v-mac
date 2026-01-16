
import React, { useState, useEffect } from 'react';
import { Article } from '../types';

interface ArticlesProps {
  articles: Article[];
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const sortedArticles = [...articles].sort((a, b) => b.timestamp - a.timestamp);

  // Lock body scroll when modal is open to ensure only the modal scrolls
  useEffect(() => {
    if (selectedArticle) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedArticle]);

  const handleShare = async (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    
    // We can't deep link easily without a router, so we share the site and article title
    const shareData = {
      title: `V-MAC Article: ${article.title}`,
      text: `Read this article on the V-MAC website: ${article.title} by ${article.author}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // If user cancels or share fails, we don't need to show an error unless it's critical
        console.debug('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(article.id);
        setTimeout(() => setShareSuccess(null), 3000);
      } catch (err) {
        alert('Could not copy link to clipboard');
      }
    }
  };

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="scroll-mt-24">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 text-center">Articles</h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full mt-3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedArticles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-blue-50 transition-all hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full cursor-pointer relative"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="relative overflow-hidden aspect-[16/10]">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  Insight
                </span>
              </div>
            </div>
            
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-blue-600 font-bold mb-3 uppercase">
                <i className="far fa-calendar-alt"></i>
                <span>{article.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                {article.content}
              </p>
              
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px]">
                    <i className="fas fa-user-pen"></i>
                  </div>
                  <span className="text-xs font-bold text-gray-700">{article.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                   {/* Share Button */}
                   <div className="relative group/share">
                     <button 
                        onClick={(e) => handleShare(e, article)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                          shareSuccess === article.id 
                            ? 'bg-green-500 text-white border-green-500' 
                            : 'bg-gray-50 text-gray-500 hover:bg-blue-600 hover:text-white border-gray-100'
                        }`}
                        title="Share Article"
                      >
                        <i className={shareSuccess === article.id ? "fas fa-check" : "fas fa-share-nodes"}></i>
                      </button>
                      
                      {shareSuccess === article.id && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap animate-bounce">
                          Copied!
                        </span>
                      )}
                   </div>

                    {/* Read More Button */}
                    <button 
                      className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      Read More
                    </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal Overlay */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-md animate-modal-fade"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative animate-modal-zoom overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all hover:rotate-90 border border-white/20"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              {/* Sidebar/Top Image */}
              <div className="w-full md:w-2/5 relative h-56 md:h-full overflow-hidden shrink-0">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                   <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">V-MAC Official</p>
                   <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{selectedArticle.title}</h2>
                </div>
              </div>

              {/* Main Text Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white flex flex-col">
                <div className="max-w-2xl mx-auto w-full flex-grow">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                        <i className="fas fa-feather-pointed"></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Written By</p>
                        <p className="text-lg font-bold text-blue-900">{selectedArticle.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                        onClick={(e) => handleShare(e, selectedArticle)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          shareSuccess === selectedArticle.id 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}
                       >
                         <i className={shareSuccess === selectedArticle.id ? "fas fa-check" : "fas fa-share-alt"}></i>
                         {shareSuccess === selectedArticle.id ? 'Copied' : 'Share'}
                       </button>
                       <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Published</p>
                          <p className="text-sm font-bold text-gray-700">{selectedArticle.date}</p>
                       </div>
                    </div>
                  </div>

                  {/* The actual article text */}
                  <div className="prose prose-lg prose-blue max-w-none mb-10">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-50 flex justify-center pb-4">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest text-xs"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Articles;
