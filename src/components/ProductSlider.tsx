import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import type { Variants } from 'framer-motion';
import type { Product } from '../data/products';
import { products } from '../data/products';

// ------------------ Animation Variants ------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ------------------ Product Card ------------------
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Link
        to={`/checkout/${product.id}`}
        className="flex flex-col flex-shrink-0 w-full overflow-hidden cursor-pointer"
      >
        <div className="relative w-[298px] overflow-hidden" style={{ height: '373.323px' }}>
          <img
            src={currentImage}
            alt={`${product.name} hair extension`}
            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = product.image;
            }}
            onMouseEnter={() => setCurrentImage(product.hoverImage)}
            onMouseLeave={() => setCurrentImage(product.image)}
          />
        </div>
        <div className="w-full p-3 text-left">
          <p className="text-[#121212] text-lg font-normal leading-tight tracking-wide truncate">
            {product.name}
          </p>
          <p className="text-[#121212] text-base font-light mt-1.5">
            ₦{product.price.toLocaleString('en-NG')} {product.currency}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

// ------------------ Product Slider ------------------
const ProductSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [firstVisibleProductIndex, setFirstVisibleProductIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6)
          .sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left);

        if (visibleEntries.length > 0) {
          const firstVisibleId = visibleEntries[0].target.id;
          const productIndex = products.findIndex(
            (p) => `product-${p.id}` === firstVisibleId
          );
          if (productIndex !== -1) {
            setFirstVisibleProductIndex(productIndex);
          }
        }
      },
      {
        root: container,
        threshold: [0.6],
      }
    );

    const cards = container.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-1 px-4 mt-[30px] mb-[48px] md:px-1 lg:px-30 font-inter">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[#121212] font-serif font-normal text-3xl md:text-4xl lg:text-5xl text-center mb-6"
      >
        Our new arrival
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[#121212c7] text-base md:text-lg mb-10 max-w-2xl mx-auto text-center"
      >
        Discover the latest additions to our exquisite collection of premium hair extensions. Fresh styles, superior quality.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-0 custom-scrollbar-hide px-4 sm:px-0"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              id={`product-${product.id}`}
              className="snap-start product-card flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[335px]"
              variants={fadeInUp}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="w-full text-center mt-0">
        <p className="text-[#121212] text-lg font-extralight">
          {firstVisibleProductIndex + 1}/{products.length}
        </p>
      </div>

      <div className="w-full text-center mt-6">
        <Link
          to="/shop-all"
          className="inline-block px-8 py-3 bg-[#f2e7dd] text-[#121212] text-lg font-medium hover:bg-[#e8d9cc] transition-colors duration-300"
        >
          View All
        </Link>
      </div>

      <style>{`
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
