import React from 'react';

const NewsletterSignup: React.FC = () => {
  return (
    <div className="w-full bg-white text-black px-4 md:px-8 lg:px-16 py-20 border-t border-black">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-4xl text-[#121212] font-serif  md:text-3xl font-normal uppercase tracking-wide">
          Sign Up for Our Newsletter
        </h2>
        <p className="text-base md:text-[18px] leading-relaxed">
          Stay in the loop with the latest hair trends, exclusive offers, and beauty tips delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 border border-black px-4 py-3 focus:outline-none text-black placeholder-gray-600"
          />
          <button
            type="submit"
            className="px-6 py-3 border border-black bg-white text-black font-semibold uppercase hover:bg-black hover:text-white transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
