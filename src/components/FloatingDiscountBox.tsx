
import  { useState } from 'react';

interface FloatingDiscountBoxProps {
  onOpenPopup: () => void;
}

const FloatingDiscountBox: React.FC<FloatingDiscountBoxProps> = ({ onOpenPopup }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null; // Don't render if it's not visible
  }

  return (
    <div
      className="fixed bottom-4 left-4 bg-white text-black p-3 rounded-lg shadow-lg flex items-center cursor-pointer z-40"
      style={{ minWidth: '120px' }} // Give it a minimum width
    >
      <span onClick={onOpenPopup} className="flex-grow text-center font-bold text-lg">
        10% Off!
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-2 text-white text-xl hover:text-gray-200"
        aria-label="Close discount offer"
      >
        &times;
      </button>
    </div>
  );
};

export default FloatingDiscountBox;