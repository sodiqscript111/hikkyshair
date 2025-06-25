import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { products } from '../data/products';

// ProductCard component to display individual products
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <Link to={`/checkout/${product.id}`} className="flex flex-col flex-shrink-0 w-[335px] overflow-hidden cursor-pointer">
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

    const cards = scrollContainer.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full py-1 px-10 mt-[70px] md:px-1 lg:px-2 font-inter">
      <h2
        className="text-[#121212]  font-serif font-normal"
        style={{
          fontSize: '38px',
          lineHeight: '37px',
          letterSpacing: '0.8px',
          marginBottom: '24px',
          marginLeft:'40px'
        }}
      >
        Our new arrival
      </h2>
      <p className="text-[#121212c7] text-lg md:text-lg mb-10 max-w-2xl ml-[40px]">
        Discover the latest additions to our exquisite collection of premium hair extensions.
        Fresh styles, superior quality.
      </p>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-5 space-x-5 custom-scrollbar-hide"
        >
          {products.map((product) => (
            <div key={product.id} id={`product-${product.id}`} className="snap-start product-card">
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