
import React, { useState, useEffect, useRef } from 'react';
import { Notice, AboutData, GalleryItem, CommitteeMember, Article } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  aboutData: AboutData;
  setAboutData: React.Dispatch<React.SetStateAction<AboutData>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  committee: CommitteeMember[];
  setCommittee: React.Dispatch<React.SetStateAction<CommitteeMember[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  notices,
  setNotices,
  aboutData,
  setAboutData,
  gallery,
  setGallery,
  committee,
  setCommittee,
  articles,
  setArticles
}) => {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'NOTICE' | 'ABOUT' | 'GALLERY' | 'COMMITTEE' | 'ARTICLES' | 'SETTINGS'>('NOTICE');
  
  // Image Preview States
  const [articleImageBase64, setArticleImageBase64] = useState<string>('');
  const [galleryImageBase64, setGalleryImageBase64] = useState<string>('');
  const [committeeImageBase64, setCommitteeImageBase64] = useState<string>('');
  
  const articleFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const committeeFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);

  // Load password from localStorage or use default
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('vmac_admin_password') || 'Chayon@1810695017';
  });

  // Password Change State
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === adminPassword) {
      setIsAuthorized(true);
    } else {
      alert('Incorrect Password');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.current !== adminPassword) {
      setPassMsg({ text: 'Current password is incorrect.', type: 'error' });
      return;
    }
    if (passForm.next !== passForm.confirm) {
      setPassMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (passForm.next.length < 4) {
      setPassMsg({ text: 'Password is too short.', type: 'error' });
      return;
    }

    setAdminPassword(passForm.next);
    localStorage.setItem('vmac_admin_password', passForm.next);
    setPassMsg({ text: 'Password changed successfully!', type: 'success' });
    setPassForm({ current: '', next: '', confirm: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'article' | 'gallery' | 'committee' | 'about') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'article') {
          setArticleImageBase64(base64);
        } else if (type === 'gallery') {
          setGalleryImageBase64(base64);
        } else if (type === 'committee') {
          setCommitteeImageBase64(base64);
        } else if (type === 'about') {
          setAboutData(prev => ({ ...prev, image: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-2xl border border-blue-50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-500">Enter password to access customisation</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            autoFocus
          />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Unlocking Admin Panel
          </button>
          <button type="button" onClick={onClose} className="w-full py-2 text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <i className="fas fa-user-shield"></i> Admin Panel
        </h2>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-4 space-y-2">
            {[
              { id: 'NOTICE', label: 'Notices', icon: 'fa-bullhorn' },
              { id: 'ABOUT', label: 'About Us', icon: 'fa-info-circle' },
              { id: 'ARTICLES', label: 'Articles', icon: 'fa-feather-alt' },
              { id: 'GALLERY', label: 'Gallery', icon: 'fa-images' },
              { id: 'COMMITTEE', label: 'Committee', icon: 'fa-users' },
              { id: 'SETTINGS', label: 'Settings', icon: 'fa-key' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto max-h-[70vh] no-scrollbar">
          {activeTab === 'NOTICE' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Manage Notices</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input id="new-notice" type="text" placeholder="Add new notice text..." className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('new-notice') as HTMLInputElement;
                      if (input.value) {
                        setNotices(prev => [...prev, { id: Date.now().toString(), text: input.value }]);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {notices.map(n => (
                    <div key={n.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-gray-700">{n.text}</p>
                      <button onClick={() => setNotices(prev => prev.filter(item => item.id !== n.id))} className="text-red-500 hover:text-red-700">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Edit About Us</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-blue-600 uppercase tracking-wider">About Section Image</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden border-2 border-blue-100 bg-gray-100">
                      <img src={aboutData.image} className="w-full h-full object-cover" alt="About" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" 
                        placeholder="Image URL..."
                        value={aboutData.image.startsWith('data:') ? '' : aboutData.image} 
                        onChange={(e) => setAboutData(prev => ({...prev, image: e.target.value}))}
                        className="w-full px-4 py-2 border rounded-xl outline-none text-sm" 
                      />
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-400 font-bold uppercase">OR</span>
                         <button 
                            onClick={() => aboutFileInputRef.current?.click()}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                         >
                            <i className="fas fa-upload"></i> Upload Photo
                         </button>
                         <input 
                            type="file" 
                            ref={aboutFileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, 'about')} 
                         />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-blue-600 uppercase tracking-wider">About Text Content</label>
                  <textarea 
                    rows={8}
                    value={aboutData.text} 
                    onChange={(e) => setAboutData(prev => ({...prev, text: e.target.value}))}
                    className="w-full px-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all text-gray-700 leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ARTICLES' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Manage Articles</h3>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                <input id="art-title" type="text" placeholder="Article Title" className="w-full px-4 py-2 border rounded-xl outline-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input id="art-author" type="text" placeholder="Author Name" className="px-4 py-2 border rounded-xl outline-none" />
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-blue-600 uppercase">Cover Image</label>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => articleFileInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-upload"></i> {articleImageBase64 ? 'Change' : 'Upload'}
                      </button>
                      <input 
                        type="file" 
                        ref={articleFileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'article')} 
                      />
                      {articleImageBase64 && (
                        <div className="relative group">
                          <img src={articleImageBase64} className="w-10 h-10 rounded-lg object-cover border border-blue-200" alt="Preview" />
                          <button 
                            onClick={() => setArticleImageBase64('')}
                            className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <textarea id="art-content" rows={4} placeholder="Article Content" className="w-full px-4 py-2 border rounded-xl outline-none"></textarea>
                <button 
                  onClick={() => {
                    const title = document.getElementById('art-title') as HTMLInputElement;
                    const author = document.getElementById('art-author') as HTMLInputElement;
                    const content = document.getElementById('art-content') as HTMLTextAreaElement;
                    if (title.value && author.value && articleImageBase64 && content.value) {
                      setArticles(prev => [{ 
                        id: Date.now().toString(), 
                        title: title.value, 
                        author: author.value, 
                        image: articleImageBase64, 
                        content: content.value,
                        date: new Date().toLocaleDateString(),
                        timestamp: Date.now()
                      }, ...prev]);
                      title.value = ''; author.value = ''; content.value = ''; setArticleImageBase64('');
                    } else {
                      alert('Please fill all fields and upload an image.');
                    }
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Publish Article
                </button>
              </div>
              <div className="space-y-3">
                {articles.map(art => (
                  <div key={art.id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <img src={art.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{art.title}</p>
                      <p className="text-xs text-blue-600">By {art.author} • {art.date}</p>
                    </div>
                    <button onClick={() => setArticles(prev => prev.filter(a => a.id !== art.id))} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'GALLERY' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Manage Gallery Posts</h3>
              
              {/* Add New Post Form */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider">Image Source</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      id="gal-img" 
                      type="text" 
                      placeholder="Or enter Image URL..." 
                      className="flex-1 px-4 py-2 border rounded-xl outline-none text-sm" 
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs font-bold uppercase">Or</span>
                      <button 
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <i className="fas fa-camera"></i> {galleryImageBase64 ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      <input 
                        type="file" 
                        ref={galleryFileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'gallery')} 
                      />
                    </div>
                  </div>
                  
                  {galleryImageBase64 && (
                    <div className="mt-2 relative inline-block">
                      <img src={galleryImageBase64} className="h-24 w-32 object-cover rounded-xl border-2 border-white shadow-md" alt="Gallery Preview" />
                      <button 
                        onClick={() => setGalleryImageBase64('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider">Caption</label>
                  <input id="gal-cap" type="text" placeholder="Write a caption for this photo..." className="w-full px-4 py-2 border rounded-xl outline-none" />
                </div>

                <button 
                  onClick={() => {
                    const imgUrlInput = document.getElementById('gal-img') as HTMLInputElement;
                    const capInput = document.getElementById('gal-cap') as HTMLInputElement;
                    const finalImage = galleryImageBase64 || imgUrlInput.value;

                    if (finalImage && capInput.value) {
                      setGallery(prev => [{ 
                        id: Date.now().toString(), 
                        image: finalImage, 
                        caption: capInput.value, 
                        timestamp: Date.now() 
                      }, ...prev]);
                      
                      imgUrlInput.value = ''; 
                      capInput.value = ''; 
                      setGalleryImageBase64('');
                    } else {
                      alert('Please provide an image (upload or URL) and a caption.');
                    }
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Post to Gallery
                </button>
              </div>

              {/* Gallery Items List (Same style as Articles) */}
              <div className="space-y-3">
                {gallery.length === 0 ? (
                  <p className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">No gallery items yet.</p>
                ) : (
                  gallery.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <img src={item.image} className="w-16 h-12 rounded-lg object-cover bg-gray-100" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">{item.caption}</p>
                        <p className="text-[10px] text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => setGallery(prev => prev.filter(i => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                        title="Delete Post"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'COMMITTEE' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Manage Committee Members</h3>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input id="mem-name" type="text" placeholder="Name" className="px-4 py-2 border rounded-xl outline-none" />
                    <input id="mem-pos" type="number" placeholder="Position (1, 2, ...)" className="px-4 py-2 border rounded-xl outline-none" />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider">Photo Source</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        id="mem-img" 
                        type="text" 
                        placeholder="Or enter Photo URL..." 
                        className="flex-1 px-4 py-2 border rounded-xl outline-none text-sm" 
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs font-bold uppercase">Or</span>
                        <button 
                          onClick={() => committeeFileInputRef.current?.click()}
                          className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                          <i className="fas fa-camera"></i> {committeeImageBase64 ? 'Change' : 'Upload'}
                        </button>
                        <input 
                          type="file" 
                          ref={committeeFileInputRef} 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'committee')} 
                        />
                      </div>
                    </div>
                    
                    {committeeImageBase64 && (
                      <div className="mt-2 relative inline-block">
                        <img src={committeeImageBase64} className="h-16 w-16 object-cover rounded-full border-2 border-white shadow-md" alt="Member Preview" />
                        <button 
                          onClick={() => setCommitteeImageBase64('')}
                          className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <i className="fas fa-times text-[10px]"></i>
                        </button>
                      </div>
                    )}
                 </div>

                 <input id="mem-title" type="text" placeholder="Designation" className="w-full px-4 py-2 border rounded-xl outline-none" />
                 <button 
                  onClick={() => {
                    const nameInput = document.getElementById('mem-name') as HTMLInputElement;
                    const imgUrlInput = document.getElementById('mem-img') as HTMLInputElement;
                    const titleInput = document.getElementById('mem-title') as HTMLInputElement;
                    const posInput = document.getElementById('mem-pos') as HTMLInputElement;
                    const finalImage = committeeImageBase64 || imgUrlInput.value;

                    if (nameInput.value && finalImage) {
                      setCommittee(prev => [...prev, { 
                        id: Date.now().toString(), 
                        name: nameInput.value, 
                        image: finalImage, 
                        designation: titleInput.value, 
                        position: parseInt(posInput.value) || 99 
                      }]);
                      nameInput.value = ''; imgUrlInput.value = ''; titleInput.value = ''; posInput.value = '';
                      setCommitteeImageBase64('');
                    } else {
                      alert('Please provide a name and an image (upload or URL).');
                    }
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  Add Committee Member
                </button>
              </div>
              <div className="space-y-3">
                {[...committee].sort((a,b) => a.position - b.position).map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">{m.position}</span>
                    <img src={m.image} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{m.name}</p>
                      <p className="text-xs text-blue-600">{m.designation}</p>
                    </div>
                    <button onClick={() => setCommittee(prev => prev.filter(i => i.id !== m.id))} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'SETTINGS' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 max-w-md">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="fas fa-shield-alt text-blue-600"></i> Change Password
                </h4>
                
                {passMsg.text && (
                  <div className={`p-3 rounded-xl mb-4 text-sm font-medium ${passMsg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {passMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={passForm.current}
                      onChange={(e) => setPassForm({...passForm, current: e.target.value})}
                      className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passForm.next}
                      onChange={(e) => setPassForm({...passForm, next: e.target.value})}
                      className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passForm.confirm}
                      onChange={(e) => setPassForm({...passForm, confirm: e.target.value})}
                      className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </form>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
                <i className="fas fa-info-circle mr-2"></i>
                Changing the password will update the login required to access this customise panel.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
