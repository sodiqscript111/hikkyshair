import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <div className="w-full py-16 px-6 sm:px-12 lg:px-24 mt-[60px] font-inter bg-[#f2e7dd] max-h-[1000px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20 h-full">
        {/* Right Section: Image - Moved to appear first on mobile (flex-col) */}
        <div className="flex-1 w-full md:w-auto flex justify-center items-center h-full">
          <div className="w-full max-w-lg md:max-w-none rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://i.ibb.co/1f5K4xXx/south-american-straight-clip-in-569393-webp-v-1739871833-width-3840.jpg"
              alt="Luxurious South American Straight Clip-In Hair Extension"
              className="w-full h-auto object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
                e.currentTarget.src = "https://placehold.co/800x600/f0f0f0/333?text=Image+Not+Found"; // Placeholder fallback
              }}
            />
          </div>
        </div>

        {/* Left Section: Text Content - Now appears after the image on mobile */}
        <div className="flex-1 text-center md:text-left max-w-2xl md:max-w-none flex flex-col justify-center h-full">
          <h2 className="text-[#121212] font-serif font-normal text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Unveiling Your Perfect Look
          </h2>
          <p className="text-[#121212c7] text-lg md:text-xl leading-relaxed mb-4">
            At Hikky's Hair, we celebrate the art of transformation, where exquisite hair meets personalized style.
          </p>
          <p className="text-[#121212c7] text-lg md:text-xl leading-relaxed mb-4">
            Our premium collection of hair extensions and wigs is meticulously crafted from the finest, ethically sourced human hair. Each piece promises unparalleled quality, a seamless blend, and a natural, lustrous finish that redefines elegance.
          </p>
          <p className="text-[#121212c7] text-lg md:text-xl leading-relaxed">
            Our aspiration is to empower your everyday confidence, providing you with beautiful, durable hair that you'll cherish for years to come, truly enhancing your unique identity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;