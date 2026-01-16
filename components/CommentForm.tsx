
import React, { useState } from 'react';

const CommentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `V-MAC Comment from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoUrl = `mailto:vmac.gb.2025@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open user's email client
    window.location.href = mailtoUrl;
    
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 mt-12">
      <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
        <i className="fas fa-comment-dots text-blue-600"></i>
        Leave a Comment
      </h3>
      
      {isSent && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <i className="fas fa-check-circle"></i>
          <p className="text-sm font-medium">Thank you! Your email client has been opened to send your comment.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Your Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Your Message / Comment</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your comment here..."
            className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
        >
          <span>Send Comment</span>
          <i className="fas fa-paper-plane text-xs"></i>
        </button>
      </form>
      
      <p className="mt-4 text-xs text-gray-500 italic">
        * Clicking send will open your default email application to deliver your message to vmac.gb.2025@gmail.com
      </p>
    </div>
  );
};

export default CommentForm;
