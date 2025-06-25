import React, { useState } from 'react';

interface CustomizationPopupProps {
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; description: string }) => void;
}

const CustomizationPopup: React.FC<CustomizationPopupProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, description });
    // Optionally clear form fields after submission
    setName('');
    setEmail('');
    setDescription('');
    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl max-w-md w-full mx-4 p-6 text-white relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:opacity-70"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-4xl font-serif text-[#dbc4b2] mb-2">Customization Request</h2>
        <p className="text-sm mb-4 text-[#dbc4b2]">
          Please provide your details and describe the customization you'd like for your order.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none flex-1"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none flex-1"
            required
          />
          <textarea
            placeholder="Describe your customization (e.g., 'add a specific lace type', 'dye to a custom color', 'different curl pattern on ends')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="px-4 py-2 rounded-md border border-[#dbc4b2] bg-white/20 text-white placeholder-white/60 focus:outline-none flex-1 resize-y"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#dbc4b2] text-black px-4 py-2 rounded-md hover:bg-[#c9b199] transition"
          >
            Submit Customization
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizationPopup;