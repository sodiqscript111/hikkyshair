import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../CartContext';
import  { products} from "../data/products"
const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('en-NG');
  };

  // Find product image by productId
  const getProductImage = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.image : 'https://via.placeholder.com/50'; // Fallback image
  };

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8 mt-[150px] font-inter min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-[#121212] font-serif font-normal text-4xl sm:text-5xl text-center mb-10"
          style={{ lineHeight: '1.2', letterSpacing: '1px' }}
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-lg text-gray-700">
            Your cart is empty.{' '}
            <Link
              to="/shop-all"
              className="text-[#121212] underline hover:text-[#f2e7dd] transition-colors duration-300"
              aria-label="Browse all products"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="w-full text-left text-[#121212] text-sm sm:text-base">
                <thead className="bg-[#f2e7dd]/20">
                  <tr>
                    <th className="py-4 px-4 sm:px-6 font-medium">Image</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Product</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Size</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Quantity</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Unit Price</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Total</th>
                    <th className="py-4 px-4 sm:px-6 font-medium">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={`${item.productId}-${item.size}`}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-[#f2e7dd]/10 transition-colors duration-200`}
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <img
                          src={getProductImage(item.productId)}
                          alt={`${item.name} thumbnail`}
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/50';
                          }}
                        />
                      </td>
                      <td className="py-4 px-4 sm:px-6">{item.name}</td>
                      <td className="py-4 px-4 sm:px-6">{item.size}</td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="px-2 py-1 text-lg font-semibold text-gray-700 hover:bg-[#f2e7dd]/50 rounded"
                            aria-label={`Decrease quantity of ${item.name} (${item.size})`}
                            disabled={item.quantity === 1}
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="px-2 py-1 text-lg font-semibold text-gray-700 hover:bg-[#f2e7dd]/50 rounded"
                            aria-label={`Increase quantity of ${item.name} (${item.size})`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">₦{item.price.toLocaleString('en-NG')}</td>
                      <td className="py-4 px-4 sm:px-6">
                        ₦{(item.price * item.quantity).toLocaleString('en-NG')}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          aria-label={`Remove ${item.name} (${item.size}) from cart`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-lg font-medium text-[#121212]">
                Total Items: {totalItems} | Total: ₦{calculateTotal()}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 bg-gray-200 text-[#121212] text-base font-medium rounded-md hover:bg-gray-300 transition-colors duration-300"
                  aria-label="Clear all items from cart"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="px-6 py-3 bg-[#f2e7dd] text-[#121212] text-base font-medium rounded-md hover:bg-[#e8d9cc] transition-colors duration-300"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;