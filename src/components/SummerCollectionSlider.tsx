import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { products } from '../data/products'; // Assuming products data is exported from this file

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
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
            e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
            e.currentTarget.src = product.image; // Fallback to original image
          }}
          onMouseEnter={() => setCurrentImage(product.hoverImage)}
          onMouseLeave={() => setCurrentImage(product.image)}
        />
      </div>
      <div className="w-full p-3 text-left bg-white">
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


const CollectionsSection: React.FC = () => {
  const collections = [
    {
      name: 'Bob',
      image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      link: '/shop-all',
    },
    {
      name: 'Curly',
      image: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      link: '/shop-all',
    },
    {
      name: 'Kinky',
      image: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
      link: '/shop-all',
    },
    {
      name: 'Straight',
      image: 'https://i.ibb.co/zWjGS6MD/argentine-straight-178319-webp-v-1739871833-width-500.jpg',
      link: '/shop-all',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 font-inter">
      {/* Changed flex-wrap to flex and added overflow-x-auto for horizontal scrolling */}
      {/* Added snap-x and snap-mandatory for smooth snapping behavior */}
      {/* Removed justify-center to allow items to align from the start for sliding */}
      {/* Added pb-5 for some padding at the bottom of the scrollable area */}
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-6 custom-scrollbar-hide">
        {collections.map((collection, index) => (
          <Link
            key={index}
            to={collection.link}
            // Added flex-shrink-0 to prevent items from shrinking
            // Added snap-start to make each item snap to the start of the scroll container
            className="flex flex-col flex-shrink-0 w-[200px] md:w-[240px] cursor-pointer group snap-start"
          >
            <div className="w-full min-h-[280px] h-full overflow-hidden">
              <img
                src={collection.image}
                alt={`${collection.name} hair collection`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-left">
              <h3 className="text-xl font-normal text-[#cbb7a5] mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-all duration-300">
                {collection.name}
                <span className="text-lg text-[#cbb7a5] group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Added custom-scrollbar-hide style here for self-containment */}
      <style>{`
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};


const SummerCollectionSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstVisibleProductIndex, setFirstVisibleProductIndex] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setDisplayedProducts(products); // use static data directly
      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.6)
          .sort((a, b) => a.boundingClientRect.left - b.boundingClientRect.left);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          const idx = displayedProducts.findIndex((p) => `product-${p.id}` === id);
          if (idx !== -1) setFirstVisibleProductIndex(idx);
        }
      },
      {
        root: scrollContainer,
        threshold: [0.6],
      }
    );

    const cards = scrollContainer.querySelectorAll('.product-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [displayedProducts, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-inter text-xl text-[#121212]">
        Loading summer hair styles...
      </div>
    );
  }

  return (
    <div className="w-full py-1 px-4 mt-[30px] mb-[48px] md:px-1 lg:px-30 font-inter">
      <h2 className="text-[#121212] font-serif font-normal text-3xl md:text-4xl lg:text-5xl text-center mb-6">
        Summer Hair Collection
      </h2>
      <p className="text-[#121212c7] text-base md:text-lg mb-10 max-w-2xl mx-auto text-center">
        Discover our stunning hair extensions, perfect for your vibrant summer look!
      </p>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-5 gap-0 custom-scrollbar-hide px-4 sm:px-0"
        >
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className="snap-start product-card flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[335px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full text-center mt-2">
        <p className="text-[#121212] text-lg font-extralight">
          {firstVisibleProductIndex + 1}/{displayedProducts.length}
        </p>
      </div>

      <div className="w-full text-center mt-6">
        <Link
          to="/shop-all"
          className="inline-block px-8 py-3 bg-[#f2e7dd] text-[#121212] text-lg font-medium  hover:bg-[#e8d9cc] transition-colors duration-300"
        >
          View All
        </Link>
      </div>

      <CollectionsSection />

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

export default SummerCollectionSlider;