import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { products } from '../data/products'; // Assuming products data is exported from this file

// ProductCard component (reused from ProductSlider)
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <Link
      to={`/checkout/${product.id}`}
      className="flex flex-col w-full overflow-hidden cursor-pointer"
    >
      <div
        // FIX: Use padding-top for intrinsic aspect ratio, remove fixed height
        className="relative w-full overflow-hidden pt-[133.33%] sm:pt-[100%]" // 3:4 aspect ratio (h/w = 4/3 = 1.3333 = 133.33%) for mobile, 1:1 for larger screens
      >
        <img
          src={currentImage}
          alt={`${product.name} hair extension`}
          // FIX: Position absolutely to fit container based on padding-top
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

      {/* Optional Filters (Placeholder) */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        {/* FIX: Add flex-col and space-y for better mobile stacking */}
        <p className="text-[#444] text-sm font-semibold">
          {products.length} Products
        </p>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 w-full sm:w-auto"
          // FIX: Make select full width on mobile, auto on larger
          defaultValue=""
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
        {/* FIX: Changed `sm:grid-cols-3` to `md:grid-cols-3` for better mobile 2-column layout */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopAllPage;