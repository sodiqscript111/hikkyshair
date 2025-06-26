import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { products } from '../data/products'; // Assuming products data is exported from this file

// ProductCard component (reused from ProductSlider) - No changes needed here, as it's for ShopAll/Collections
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <Link
      to={`/checkout/${product.id}`}
      className="flex flex-col w-full overflow-hidden cursor-pointer"
    >
      <div
        className="relative w-full overflow-hidden pt-[133.33%] sm:pt-[100%]"
      >
        <img
          src={currentImage}
          alt={`${product.name} hair extension`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
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

// ShopAllPage component
const ShopAllPage: React.FC = () => {
  // State to manage the products currently displayed, which will be sorted
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  // State to manage the current sorting order selected by the user
  const [sortOrder, setSortOrder] = useState<string>(''); // Default empty or a specific initial sort

  // useEffect to initialize products when the component mounts
  // and to re-sort them whenever the sortOrder changes
  useEffect(() => {
    // Create a mutable copy of the products array for sorting
    const sorted = [...products];

    switch (sortOrder) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sort (e.g., by ID or original order if no sort is selected)
        // For now, it will maintain the order as it is in the imported 'products' array
        break;
    }
    setDisplayedProducts(sorted); // Update the state with the sorted products
  }, [sortOrder]); // Re-run this effect whenever sortOrder changes

  // Event handler for when the user selects a new sorting option
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value); // Update the sortOrder state
  };

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8 mt-[70px] font-inter">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-[#121212] font-serif font-normal text-4xl sm:text-5xl"
          style={{
            lineHeight: '1.2',
            letterSpacing: '1px',
          }}
        >
          Shop All
        </h1>
        <p className="text-[#808080c7] text-lg mt-4 max-w-2xl mx-auto">
          Browse our complete collection of premium hair extensions and styles crafted for elegance and durability.
        </p>
      </div>

      {/* Optional Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <p className="text-[#444] text-sm font-semibold">
          {displayedProducts.length} Products {/* Display count based on sorted products */}
        </p>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 w-full sm:w-auto"
          value={sortOrder} // Control the select element with state
          onChange={handleSortChange} // Attach the change handler
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Map over displayedProducts instead of original 'products' */}
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopAllPage;