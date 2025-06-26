import { useState } from 'react';

interface DiscountPopupProps {
  show: boolean;
  onClose: () => void;
}

const DiscountPopup: React.FC<DiscountPopupProps> = ({ show, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Discount request submitted:', { firstName, email, phoneNumber });
    alert("Thank you! Your 10% off code will be sent to your email shortly.");
    onClose(); // Close popup
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl max-w-md w-full mx-4 p-6 text-white relative shadow-2xl font-serif">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:opacity-70"
          aria-label="Close discount popup"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-4xl font-serif text-[#dbc4b2] mb-2 text-center font-extrabold">
          Exclusive Offer!
        </h2>
        <p className="text-sm mb-6 text-[#dbc4b2] text-center">
          Unlock 10% off your first order! Just fill out your details below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#dbc4b2] text-black px-6 py-3 rounded-md hover:bg-[#c9b19f] transition font-semibold"
          >
            Get 10% Off Now!
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountPopup;
