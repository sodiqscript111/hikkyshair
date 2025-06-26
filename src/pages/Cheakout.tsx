import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomizationPopup from "../components/CustomizationPopup";
import type { Product } from "../data/products";
import { products } from "../data/products";
import { useCart } from "../CartContext";
import { XMarkIcon } from '@heroicons/react/24/outline'; // For toast close button

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCustomizationChecked, setIsCustomizationChecked] = useState(false);
  const [showCustomizationPopup, setShowCustomizationPopup] = useState(false);
  
  // State for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const { addToCart } = useCart();

  useEffect(() => {
    const productId = parseInt(id || '0', 10);
    if (isNaN(productId)) {
      setProduct(null);
      return;
    }
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0] || '');
      setCurrentImageIndex(0); // Reset slider to first image when product changes
    } else {
      setProduct(null);
    }
  }, [id]);

  // Handle toast message display and auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);


  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
  };


  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product.id, selectedSize, quantity, product.price, product.name);
      showToast(`${quantity} x ${product.name} (Size: ${selectedSize}) added to cart!`, 'success');
    } else {
      showToast('Please select a size before adding to cart.', 'error');
    }
  };

  const handleBuyNow = () => {
    if (product && selectedSize) {
      console.log(`Buying ${quantity} of ${product.name} (Size: ${selectedSize}) now.`);
      showToast(`Proceeding to buy ${quantity} of ${product.name}.`, 'info');
      // In a real app, you'd navigate to a checkout confirmation page here
    } else {
      showToast('Please select a size before proceeding.', 'error');
    }
  };

  const handleCustomizationCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomizationChecked(e.target.checked);
    if (e.target.checked) setShowCustomizationPopup(true);
  };

  const handleCustomizationSubmit = (data: { name: string; email: string; description: string }) => {
    console.log("Customization Request Submitted:", data);
    showToast("Your customization request has been submitted!", 'success');
    setShowCustomizationPopup(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const goToPrevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };


  if (!product) {
    return <div className="text-center mt-20 text-xl text-gray-700">Product not found</div>;
  }

  const currentProductImage = product.images[currentImageIndex];


  return (
    <div className="flex flex-col mt-[100px] md:flex-row min-h-screen w-full font-sans bg-white md:bg-gray-50"> {/* FIX: Changed to flex-col for mobile order */}
      
      {/* Image Slider Section (now comes first on mobile) */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 bg-white md:bg-transparent"> {/* Added flex-col for internal layout */}
        {/* Main Image */}
        <div className="relative w-full h-[50vh] md:h-full flex items-center justify-center rounded-lg overflow-hidden shadow-lg bg-gray-100"> {/* Dynamic height for slider section */}
            <img
                src={currentProductImage}
                alt={`${product.name} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            {/* Navigation Buttons */}
            <button
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full z-10 transition"
                aria-label="Previous image"
            >
                &larr;
            </button>
            <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full z-10 transition"
                aria-label="Next image"
            >
                &rarr;
            </button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 
                ${index === currentImageIndex ? 'border-[#f2e7dd] shadow-md' : 'border-transparent hover:border-gray-300'}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section (now comes second on mobile) */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-10 flex flex-col justify-start space-y-6 bg-[#f2e7dd]/20">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#121212]">{product.name}</h1>
        <p className="text-gray-700 text-base md:text-lg">{product.description}</p>
        <div className="text-3xl font-bold text-[#121212]">
            ₦{product.price.toLocaleString('en-NG')} {product.currency}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2 text-[#121212]">Choose a size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md transition duration-200 text-sm ${
                  selectedSize === size
                    ? "bg-[#f2e7dd] text-[#121212] border-[#f2e7dd]"
                    : "bg-white text-[#121212] border-[#121212] hover:bg-[#f2e7dd]/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="customize"
            checked={isCustomizationChecked}
            onChange={handleCustomizationCheckboxChange}
            className="h-5 w-5 text-[#f2e7dd] border-gray-300 rounded focus:ring-[#f2e7dd]"
          />
          <label htmlFor="customize" className="ml-2 text-lg font-medium text-[#121212]">
            Request Customization
          </label>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-lg font-medium text-[#121212]">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-[#f2e7dd]/50 rounded-l-md"
              >
                −
              </button>
              <span className="px-4 py-1 text-lg text-[#121212]">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-[#f2e7dd]/50 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"> {/* Changed to flex-col on mobile */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-1/2 bg-[#f2e7dd] text-[#121212] py-3 rounded-md text-base font-semibold hover:bg-[#e8d9cc] transition-colors duration-300 transform hover:scale-105 shadow-md"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-1/2 bg-white text-[#121212] border border-[#f2e7dd] py-3 rounded-md text-base font-semibold hover:bg-[#f2e7dd]/50 transition-colors duration-300 transform hover:scale-105 shadow-md"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-between items-center py-2 border-b border-[#f2e7dd] text-lg font-medium text-[#121212]"
            >
              Details <span>{showDetails ? "−" : "+"}</span>
            </button>
            {showDetails && (
              <p className="text-sm mt-2 text-gray-600 animate-fadeIn">{product.details}</p>
            )}
          </div>
          <div>
            <button
              onClick={() => setShowShipping(!showShipping)}
              className="w-full flex justify-between items-center py-2 border-b border-[#f2e7dd] text-lg font-medium text-[#121212]"
            >
              Shipping <span>{showShipping ? "−" : "+"}</span>
            </button>
            {showShipping && (
              <p className="text-sm mt-2 text-gray-600 animate-fadeIn">
                Standard delivery takes 3-5 business days within Nigeria. International shipping is available with delivery times varying based on location.
              </p>
            )}
          </div>
        </div>
      </div>

      {showCustomizationPopup && (
        <CustomizationPopup
          onClose={() => setShowCustomizationPopup(false)}
          onSubmit={handleCustomizationSubmit}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center justify-between z-50
          ${toastType === 'success' ? 'bg-green-500 text-white' : ''}
          ${toastType === 'error' ? 'bg-red-500 text-white' : ''}
          ${toastType === 'info' ? 'bg-gray-800 text-white' : ''}
        `}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-4 text-white">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;