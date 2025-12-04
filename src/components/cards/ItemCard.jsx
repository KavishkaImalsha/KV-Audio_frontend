import React from 'react';

const ItemCard = ({ product, onViewDetails}) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 w-full overflow-hidden bg-gray-50">
        <div className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
          ${product.availability 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'}`}>
          {product.availability ? 'Available' : 'Rented Out'}
        </div>

        <img 
          src={product.image[0]} 
          alt={product.name} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent">
             <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
              onClick={() => {onViewDetails(product)}}
             >
                View Details
             </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{product.category}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 font-quicksand mb-1 truncate" title={product.name}>
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
           {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400 block">Rent per day</span>
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
          </div>
          
          <button 
            disabled={!product.availability}
            className={`p-3 rounded-full transition-colors 
            ${product.availability 
                ? 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;