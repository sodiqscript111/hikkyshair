import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { products } from '../data/products';

// ProductCard component to display individual products
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    // Adjusted width for mobile screens: calc(50% - gap) for 'sm' and larger, full width for smaller.
    // Reverts to md:w-[335px] for medium screens and up.
    <Link to={`/checkout/${product.id}`} className="flex flex-col flex-shrink-0 w-full sm:w-[calc(50%-10px)] md:w-[335px] overflow-hidden cursor-pointer">
      <div className="relative w-full overflow-hidden" style={{ height: '335px' }}>
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
      <div className="w-full p-4 text-center">
        <p className="text-[#121212] text-lg font-normal leading-tight tracking-wide truncate">
          {product.name}
        </p>
        <p className="text-[#121212] text-base font-light mt-2">
          ₦{product.price.toLocaleString('en-NG')} {product.currency}
        </p>
      </div>
    </Link>
  );
};

// ProductSlider component
const ProductSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [firstVisibleProductIndex, setFirstVisibleProductIndex] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      let lowestIndex = -1;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const productIndex = products.findIndex(
            (p) => `product-${p.id}` === entry.target.id
          );
          if (productIndex !== -1) {
            if (lowestIndex === -1 || productIndex < lowestIndex) {
              lowestIndex = productIndex;
            }
          }
        }
      });
      if (lowestIndex !== -1) {
        setFirstVisibleProductIndex(lowestIndex);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollContainer,
      rootMargin: '0px',
      threshold: 0.1,
    });

    // We need to query for elements with 'product-card' class directly under the scrollContainer
    // to ensure the observer targets the correct elements after width changes.
    const cards = scrollContainer.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full py-1 px-4 mt-[70px] md:px-1 lg:px-2 font-inter"> {/* Adjusted px-10 to px-4 for mobile */}
      <h2
        className="text-[#121212] font-serif font-normal text-3xl md:text-4xl lg:text-5xl" // Responsive font size
        style={{
          lineHeight: '1.2', // Adjusted for responsiveness
          letterSpacing: '0.8px',
          marginBottom: '24px',
          marginLeft: '0px', // Removed fixed left margin for mobile centering
          textAlign: 'center', // Centered for mobile
        }}
      >
        Our new arrival
      </h2>
      <p className="text-[#121212c7] text-base md:text-lg mb-10 max-w-2xl mx-auto text-center"> {/* Centered for mobile */}
        Discover the latest additions to our exquisite collection of premium hair extensions.
        Fresh styles, superior quality.
      </p>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-5 space-x-4 custom-scrollbar-hide px-4 sm:px-0 justify-start sm:justify-center" // Adjusted space-x and px for mobile
        >
          {products.map((product) => (
            <div key={product.id} id={`product-${product.id}`} className="snap-start product-card flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center mt-4">
        <p className="text-[#121212] text-lg font-extralight">
          {firstVisibleProductIndex + 1}/{products.length}
        </p>
      </div>
      <div className="w-full text-center mt-6">
        <Link
          to="/shop-all"
          className="inline-block px-8 py-3 bg-[#f2e7dd] text-[#121212] text-lg font-medium rounded-md hover:bg-[#e8d9cc] transition-colors duration-300"
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