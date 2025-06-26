import { useState, useEffect, useRef } from 'react';

// Define the Product interface based on your provided data structure
export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  hoverImage: string;
  sizes: string[];
  description: string;
  details: string;
  images: string[];
}

// Your provided product data
export const products: Product[] = [
  {
    id: 1,
    name: 'Argentine Straight Closure',
    price: 230000,
    currency: 'NGN',
    image: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
    hoverImage: 'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"'],
    description: 'A luxurious, silky-straight human hair closure known for its softness and durability.',
    details: 'Made from 100% unprocessed virgin human hair. Tangle-free and easy to maintain.',
    images: [
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
      'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg',
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
    ],
  },
  {
    id: 2,
    name: 'Argentine Straight',
    price: 2550000,
    currency: 'NGN',
    image: 'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
    hoverImage: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
    sizes: ['12"', '14"', '16"', '18"', '20"', '22"'],
    description: 'Premium straight hair bundles with a natural shine and smooth texture.',
    details: '100% virgin human hair, perfect for sleek and elegant styles.',
    images: [
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
    ],
  },
  {
    id: 3,
    name: 'Argentine Wavy',
    price: 270000,
    currency: 'NGN',
    image: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
    hoverImage: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"'],
    description: 'Soft, wavy hair extensions with a natural bounce and volume.',
    details: 'Crafted from high-quality virgin hair, ideal for versatile styling.',
    images: [
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    ],
  },
  {
    id: 4,
    name: 'South American Kinky Curly',
    price: 3200000,
    currency: 'NGN',
    image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
    hoverImage: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Vibrant kinky curly hair with a full, voluminous texture.',
    details: 'Made from 100% virgin human hair, perfect for bold and natural looks.',
    images: [
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
    ],
  },
  {
    id: 5,
    name: 'South American Kinky Straight',
    price: 300000,
    currency: 'NGN',
    image: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
    hoverImage: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"'],
    description: 'Sleek kinky straight hair with a natural, textured finish.',
    details: 'High-quality virgin hair, ideal for low-maintenance styles.',
    images: [
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
    ],
  },
  {
    id: 6,
    name: 'Customised Closure',
    price: 245000,
    currency: 'NGN',
    image: 'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg',
    hoverImage: 'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
    sizes: ['4x4"', '5x5"', '6x6"'],
    description: 'Customizable closure for a seamless and natural hairline.',
    details: 'Made from premium virgin hair, perfect for protective styles.',
    images: [
      'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg',
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
    ],
  },
  {
    id: 7,
    name: 'Deep Wave Bundle',
    price: 2800000,
    currency: 'NGN',
    image: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    hoverImage: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Lush deep wave bundles with a rich, flowing texture.',
    details: '100% virgin human hair, ideal for glamorous styles.',
    images: [
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
    ],
  },
  {
    id: 8,
    name: 'Body Wave Weave',
    price: 260000,
    currency: 'NGN',
    image: 'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
    hoverImage: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
    sizes: ['10"', '12"', '14"', '16"', '18"'],
    description: 'Soft body wave weave with a natural, flowing pattern.',
    details: 'Crafted from virgin human hair, perfect for everyday wear.',
    images: [
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
    ],
  },
  {
    id: 9,
    name: 'Silky Straight Extensions',
    price: 2900000,
    currency: 'NGN',
    image: 'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
    hoverImage: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
    sizes: ['12"', '14"', '16"', '18"', '20"', '22"'],
    description: 'Ultra-smooth straight extensions for a polished look.',
    details: '100% virgin human hair, tangle-free and long-lasting.',
    images: [
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
    ],
  },
  {
    id: 10,
    name: 'Loose Wave Frontal',
    price: 330000,
    currency: 'NGN',
    image: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
    hoverImage: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
    sizes: ['13x4"', '13x6"'],
    description: 'Versatile loose wave frontal for a natural hairline.',
    details: 'Made from premium virgin hair, ideal for protective styles.',
    images: [
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    ],
  },
  {
    id: 11,
    name: 'Afro Kinky Clip-ins',
    price: 220000,
    currency: 'NGN',
    image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
    hoverImage: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    sizes: ['10"', '12"', '14"', '16"'],
    description: 'Bold afro kinky clip-ins for a natural, textured look.',
    details: '100% virgin human hair, easy to install and remove.',
    images: [
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
    ],
  },
  {
    id: 12,
    name: 'Coily Hair Bundles',
    price: 3100000,
    currency: 'NGN',
    image: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    hoverImage: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Tightly coiled hair bundles for a bold, natural style.',
    details: 'Made from 100% virgin human hair, perfect for textured looks.',
    images: [
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
    ],
  },
];

// Function to simulate fetching products (now using your `products` array)
const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(products); // Use your provided products array
    }, 500); // Shorter delay for quicker demo
  });
};

// ProductCard component to display individual products
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <div
      className="flex flex-col flex-shrink-0 w-full sm:w-[calc(50%-10px)] md:w-[335px] overflow-hidden cursor-pointer" // Adjusted width for mobile
    >
      <div className="relative w-full overflow-hidden" style={{ height: '335px' }}>
        <img
          src={currentImage}
          alt={`${product.name}`}
          className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = product.image;
          }}
          onMouseEnter={() => setCurrentImage(product.hoverImage)}
          onMouseLeave={() => setCurrentImage(product.image)}
        />
      </div>
      <div className="w-full p-4 text-center bg-white rounded-b-lg">
        <p className="text-[#121212] text-lg font-normal leading-tight tracking-wide truncate">
          {product.name}
        </p>
        <p className="text-[#121212] text-base font-light mt-2">
          ₦{product.price.toLocaleString('en-NG')} {product.currency}
        </p>
      </div>
    </div>
  );
};

// SummerCollectionSlider component
const SummerCollectionSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstVisibleProductIndex, setFirstVisibleProductIndex] = useState(0);

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setDisplayedProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  // Effect for Intersection Observer to track visible products
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || loading) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      let lowestIndex = -1;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const productIndex = displayedProducts.findIndex(
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
  }, [displayedProducts, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-inter text-xl text-[#121212]">
        Loading summer hair styles...
      </div>
    );
  }

  return (
    <div className="w-full py-1 px-4 mt-[70px] md:px-1 lg:px-2 font-inter">
      <h2
        className="text-[#121212] font-serif font-normal text-3xl md:text-4xl lg:text-5xl" // Responsive font size
        style={{
          lineHeight: '1.2', // Adjusted for responsiveness
          letterSpacing: '0.8px',
          marginBottom: '24px',
          marginLeft: '0px', // Adjusted for mobile
          textAlign: 'center', // Centered for mobile
        }}
      >
        Summer Hair Collection
      </h2>
      <p className="text-[#121212c7] text-base md:text-lg mb-10 max-w-2xl mx-auto text-center"> {/* Centered for mobile */}
        Discover our stunning hair extensions, perfect for your vibrant summer look!
      </p>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-5 space-x-4 custom-scrollbar-hide px-4 sm:px-0 justify-start sm:justify-center" // Adjusted spacing and justification
        >
          {displayedProducts.map((product) => (
            <div key={product.id} id={`product-${product.id}`} className="snap-start product-card flex-shrink-0"> {/* Added flex-shrink-0 to ensure items don't shrink */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center mt-4">
        <p className="text-[#121212] text-lg font-extralight">
          {firstVisibleProductIndex + 1}/{displayedProducts.length}
        </p>
      </div>
      <div className="w-full text-center mt-6">
        <a
          href="/shop-all-summer-hair"
          className="inline-block px-8 py-3 bg-[#f2e7dd] text-[#121212] text-lg font-medium rounded-md hover:bg-[#e8d9cc] transition-colors duration-300"
        >
          View All Hair Styles
        </a>
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

export default SummerCollectionSlider;