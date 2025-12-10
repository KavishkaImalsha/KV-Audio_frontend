import React, { useState } from 'react';
import { X } from 'lucide-react'
import ProductDetailsImageSlider from './ProductDetailsImageSlider';

const ProductDetailsPopUpModel = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-scaleUp">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <ProductDetailsImageSlider product={product}/>

        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="mb-auto">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold font-quicksand text-gray-900 mt-4 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {product.description || "High-quality audio equipment suitable for professional events, parties, and studio recording."}
            </p>

            <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-400">Daily Rate:</span>
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            </div>

            {!product.availability && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-semibold text-center">
                    This item is currently rented out.
                </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100">
            {product.availability ? (
                <div className="flex flex-col sm:flex-row gap-4">

                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                            className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                        >-</button>
                        <span className="px-4 font-semibold w-12 text-center">{quantity}</span>
                        <button 
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => setQuantity(q => q + 1)}
                        >+</button>
                    </div>


                    <button 
                        onClick={() => {onAddToCart(product._id, quantity)}}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex justify-center items-center gap-2"
                    >
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </button>
                </div>
            ) : (
                <button disabled className="w-full bg-gray-200 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed">
                    Unavailable
                </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPopUpModel;