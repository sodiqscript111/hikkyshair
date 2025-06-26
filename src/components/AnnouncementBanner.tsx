import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface AnnouncementBannerProps {
  onShowDiscountPopup: () => void; // New prop to trigger the discount popup
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onShowDiscountPopup }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    {
      text: "🌟 Interested in an internship with us? Click here to learn more! 🌟",
      path: "/internship",
      key: "internship"
    },
    {
      text: "🎉 Get 10% off your first order! Click here to claim! 🎉", // Updated text for call to action
      path: "", // Path will be handled by onClick for popup
      key: "discount"
    },
  ];

  useEffect(() => {
    // Cycle through messages every 7 seconds (adjust as needed)
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 7000); // 7000 milliseconds = 7 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, [messages.length]); // Re-run if the number of messages changes

  const handleDismiss = () => {
    setIsVisible(false);
    // Optionally, set a localStorage item here to prevent it from showing again
    // localStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) {
    return null; // Don't render if not visible
  }

  const currentMessage = messages[currentMessageIndex];

  const handleBannerClick = (e: React.MouseEvent) => {
    if (currentMessage.key === "discount") {
      e.preventDefault(); // Prevent default link navigation for discount message
      onShowDiscountPopup(); // Trigger the discount popup
      setIsVisible(false); // Optionally dismiss the banner after clicking the discount offer
    } else {
      // For other messages, allow normal link navigation and optionally dismiss
      setIsVisible(false); // Optionally dismiss banner on click for non-discount links
    }
  };


  return (
    <div
      className="bg-[#0E0E0E] text-white text-center py-2 px-4 text-sm font-medium relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Link
        to={currentMessage.path}
        className="inline-block animate-marquee whitespace-nowrap hover:underline"
        onClick={handleBannerClick} // Use new handler
      >
        {currentMessage.text}
      </Link>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 p-1 rounded-full focus:outline-none"
        aria-label="Dismiss announcement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Tailwind CSS for marquee animation (add to your main CSS or a style block if not using JIT mode) */}
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 10s; /* Faster scroll on smaller screens */
          }
        }
        `}
      </style>
    </div>
  );
};

export default AnnouncementBanner;