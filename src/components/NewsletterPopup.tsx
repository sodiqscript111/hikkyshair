import  { useEffect, useState } from 'react';

const NewsletterPopup: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // FIX: Removed localStorage check
    const timer = setTimeout(() => setShow(true), 5000); // show after 5s
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means it runs once on mount

  // If `show` is false, don't render anything
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl max-w-md w-full mx-4 p-6 text-white relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setShow(false)} // FIX: Removed localStorage.setItem from handleClose
          className="absolute top-3 right-4 text-white text-xl hover:opacity-70"
          aria-label="Close newsletter popup"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-4xl font-serif text-[#dbc4b2] mb-2">Stay in the Loop</h2>
        <p className="text-sm mb-4 text-[#dbc4b2]">Join our newsletter for early access to collections, tips, and exclusive deals.</p>

        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none flex-1"
          />
          <button
            type="submit"
            className="bg-[#dbc4b2] text-black px-4 py-2 rounded-md hover:bg-[#c9b19f] transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;