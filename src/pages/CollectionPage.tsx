import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product} from '../data/products';
import { products } from '../data/products';

// Mapping of collection slugs to product keywords
const collectionFilterMap: Record<string, string[]> = {
  'manuka-honey-collection': ['Argentine Straight', 'Silky Straight Extensions'],
  'raw-bundle-collection': ['Argentine Straight', 'Deep Wave Bundle', 'Body Wave Weave'],
  'luxury-curls-collection': ['Argentine Wavy', 'South American Kinky Curly', 'Loose Wave Frontal'],
};

// ProductCard component (reused from ShopAllPage)
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <Link
      to={`/checkout/${product.id}`}
      className="flex flex-col w-full overflow-hidden cursor-pointer"
    >
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

const CollectionPage: React.FC = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!collectionSlug) {
      setFilteredProducts(products);
      return;
    }

    const keywords = collectionFilterMap[collectionSlug.toLowerCase()];
    if (keywords) {
      const filtered = products.filter((product) =>
        keywords.some((keyword) => product.name.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Show no products if collection is not found
    }
  }, [collectionSlug]);

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8 mt-[120px] font-inter">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-[#121212] font-serif font-normal text-4xl sm:text-5xl capitalize"
          style={{
            lineHeight: '1.2',
            letterSpacing: '1px',
          }}
        >
          {collectionSlug ? collectionSlug.replace(/-/g, ' ') : 'Collection'}
        </h1>
        <p className="text-[#808080c7] text-lg mt-4 max-w-2xl mx-auto">
          Discover our curated {collectionSlug ? collectionSlug.replace(/-/g, ' ') : 'collection'} of premium hair extensions, crafted for elegance and durability.
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-700">
          No products found for this collection.{' '}
          <Link
            to="/shop-all"
            className="text-[#121212] underline hover:text-[#f2e7dd] transition-colors duration-300"
          >
            Browse all products
          </Link>
        </div>
      )}

      {/* Back to Shop All Button */}
      <div className="w-full text-center mt-10">
        <Link
          to="/shop-all"
          className="inline-block px-8 py-3 bg-[#f2e7dd] text-[#121212] text-lg font-medium rounded-md hover:bg-[#e8d9cc] transition-colors duration-300"
          aria-label="Back to all products"
        >
          Back to Shop All
        </Link>
      </div>
    </div>
  );
};

export default CollectionPage;