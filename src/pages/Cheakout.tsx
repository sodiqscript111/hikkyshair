import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomizationPopup from "../components/CustomizationPopup";
import type { Product} from "../data/products";
import { products } from "../data/products";
import { useCart } from "../CartContext";

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCustomizationChecked, setIsCustomizationChecked] = useState(false);
  const [showCustomizationPopup, setShowCustomizationPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    } else {
      setProduct(null);
    }
  }, [id]);

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
      alert(`${quantity} x ${product.name} (Size: ${selectedSize}) added to cart!`);
    } else {
      alert('Please select a size before adding to cart.');
    }
  };

  const handleBuyNow = () => {
    if (product && selectedSize) {
      console.log(`Buying ${quantity} of ${product.name} (Size: ${selectedSize}) now.`);
    } else {
      alert('Please select a size before proceeding.');
    }
  };

  const handleCustomizationCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomizationChecked(e.target.checked);
    if (e.target.checked) setShowCustomizationPopup(true);
  };

  const handleCustomizationSubmit = (data: { name: string; email: string; description: string }) => {
    console.log("Customization Request Submitted:", data);
    alert("Your customization request has been submitted!");
    setShowCustomizationPopup(false);
  };

  if (!product) {
    return <div className="text-center mt-20 text-xl text-gray-700">Product not found</div>;
  }

  return (
    <div className="flex flex-col mt-[100px] md:flex-row min-h-screen w-full font-sans bg-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-10 flex flex-col justify-start space-y-6 bg-[#f2e7dd]/20">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#121212]">{product.name}</h1>
        <p className="text-gray-700 text-base md:text-lg">{product.description}</p>
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
          <div className="flex flex-row space-x-4">
            <button
              onClick={handleAddToCart}
              className="w-1/2 bg-[#f2e7dd] text-[#121212] py-2 rounded-md text-base font-semibold hover:bg-[#e8d9cc] transition-colors duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-1/2 bg-white text-[#121212] border border-[#f2e7dd] py-2 rounded-md text-base font-semibold hover:bg-[#f2e7dd]/50 transition-colors duration-300 transform hover:scale-105"
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
      {/* Right Section - Bento Grid */}
      <div className="w-full md:w-1/2 h-[70vh] overflow-y-scroll scrollbar-hide border-l border-[#f2e7dd] p-4">
        <div className="grid grid-cols-2 gap-4 auto-rows-[minmax(120px, auto)]">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`
                ${idx === 0 ? "col-span-2 row-span-2" : ""}
                cursor-pointer relative overflow-hidden shadow-lg group hover:scale-[1.03] transition-transform duration-300 ease-in-out
              `}
            >
              <img
                src={img}
                alt={`Product view ${idx + 1} of ${product.name}`}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            alt={`Full view of ${product.name}`}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl object-contain"
          />
        </div>
      )}
      {showCustomizationPopup && (
        <CustomizationPopup
          onClose={() => setShowCustomizationPopup(false)}
          onSubmit={handleCustomizationSubmit}
        />
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