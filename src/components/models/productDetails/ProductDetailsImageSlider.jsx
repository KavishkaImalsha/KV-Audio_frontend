import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const ProductDetailsImageSlider = ({product}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageList = product.image && product.image.length > 0 
    ? product.image 
    : [product.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };
    return(<>
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6 relative select-none">
          <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center group">
            <img 
              src={imageList[currentImageIndex]} 
              alt={`${product.name} view ${currentImageIndex + 1}`} 
              className="max-h-full max-w-full object-contain drop-shadow-lg transition-opacity duration-300"
            />

            {imageList.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-0 p-2 bg-white/80 rounded-full shadow-md hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={24} /> {/* or < */ }
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-0 p-2 bg-white/80 rounded-full shadow-md hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} /> {/* or > */ }
                </button>
              </>
            )}
          </div>

          {imageList.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2 px-2 max-w-full">
              {imageList.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 
                    ${currentImageIndex === index ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
    </>)
}

export default ProductDetailsImageSlider