'use client';

import { useState } from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import type { Variants } from 'framer-motion';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  // Define contentVariants with explicit Variants type from framer-motion
  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-4 py-4 flex justify-between items-center bg-white focus:outline-none active:bg-gray-50 transition"
        aria-expanded={isOpen}
        aria-controls={`accordion-${title.replace(/\s+/g, '-')}`}
      >
        <span className="text-base sm:text-lg font-semibold text-left text-[#0E0E0E]">
          {title}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`accordion-${title.replace(/\s+/g, '-')}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WhyChooseUsSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const accordionData = [
    {
      title: 'Worldwide Delivery & Seamless Logistics',
      content:
        'We pride ourselves on offering reliable and efficient worldwide delivery. Our robust logistics network ensures your order reaches you safely and promptly, no matter where you are.',
    },
    {
      title: 'Uncompromising Premium Quality',
      content:
        'Our commitment to quality is at the core of everything we do. We source only the finest materials, ensuring every product meets rigorous standards for durability and natural beauty.',
    },
    {
      title: 'Dedicated & Responsive Customer Support',
      content:
        'Your satisfaction is our priority. Our friendly and knowledgeable customer support team is here to assist you every step of the way—from product inquiries to after-sales care.',
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="relative flex items-center justify-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] bg-white rounded-xl border border-gray-100 p-6 md:p-12 shadow-sm">
          <h2 className="text-center md:text-left text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0E0E0E] leading-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* Right Column (Accordion) */}
        <div className="flex flex-col space-y-4">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openItem === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;