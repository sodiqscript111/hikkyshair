import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate submission
    setSubmitted(true);
    setEmail('');
    // TODO: Integrate actual newsletter service API here
  };

  return (
    <footer className="w-full bg-black border-t border-white px-6 md:px-12 lg:px-20 py-16 text-[#dbc4b2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div>
          <h3 className="text-4xl font-serif mb-4 uppercase tracking-wide">Hikky's Hair</h3>
          <p className="text-sm leading-relaxed">
            Premium quality hair extensions and styling solutions curated to bring out your most confident self.
            Join the luxury hair movement.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/book" className="hover:underline">Book Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4 uppercase">Contact</h4>
          <p className="text-sm mb-2">
            Email: <a href="mailto:info@hikkiyhair.com" className="underline">info@hikkiyhair.com</a>
          </p>
          <p className="text-sm mb-6">
            Phone: <a href="tel:+2348123456789" className="underline">+234 812 345 6789</a>
          </p>

          <div className="flex space-x-4">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition">
              <svg className="w-6 h-6 stroke-[#dbc4b2] fill-none" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5z" />
                <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition">
              <svg className="w-6 h-6 fill-[#dbc4b2]" viewBox="0 0 24 24" >
                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.003 3.66 9.13 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V22C18.34 21.13 22 17.003 22 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-70 transition">
              <svg className="w-6 h-6 fill-[#dbc4b2]" viewBox="0 0 24 24" >
                <path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.18 8.18 0 01-2.357.636A4.1 4.1 0 0021.447 4a8.2 8.2 0 01-2.605.975A4.1 4.1 0 0016.616 4c-2.266 0-4.102 1.816-4.102 4.055 0 .317.036.626.106.922C8.062 8.855 5.13 7.13 3.148 4.632a4.005 4.005 0 00-.555 2.038c0 1.406.725 2.647 1.825 3.377A4.073 4.073 0 012.8 9.6v.05c0 1.96 1.423 3.594 3.305 3.966a4.1 4.1 0 01-1.82.07c.513 1.578 2.007 2.727 3.777 2.758A8.233 8.233 0 012 18.407 11.616 11.616 0 008.29 20" />
              </svg>
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-4 uppercase">Sign up for our Newsletter</h4>
          {submitted ? (
            <p className="text-green-400 text-sm">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded text-black placeholder-gray-500 focus:outline-none"
                required
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                className="bg-[#cbb7a5] text-black font-semibold py-2 rounded hover:bg-[#bba18e] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-[#dbc4b2] mt-12 border-t border-white pt-6">
        &copy; {new Date().getFullYear()} Hikky's Hair. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
