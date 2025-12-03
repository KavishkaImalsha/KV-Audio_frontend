import React, { useState, useEffect } from "react";
import ProductCard from "../components/cards/ItemCard.jsx"; 
import BackendApi from "../api/BackendApi.jsx";
import toast from "react-hot-toast";
import { Audio } from 'react-loader-spinner'
// import BackendApi from "../api/BackendApi"; // Uncomment when connecting to DB

const AllProducts = () => {
  // Mock Data (Replace with your API data)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(100);

  useEffect(() => {
    fetchAllProducts()
  },[])

  const fetchAllProducts = async() => {
    try{
      const productRes = await BackendApi.get('/products/')
      setProducts(productRes?.data || [])
    }catch(error){
      toast.error("Something went wrong, Please Try Again!!")
    }finally{
      setLoading(false)
    }
  }

  const categories = products.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
          acc.push(product.category);
      }
      return acc;
  }, ["All"])

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    return categoryMatch;
  });

  return (
    <>
      {loading ? 
              (<div className="flex justify-center items-center h-screen">
                <Audio
                  height="100"
                  width="100"
                  color="#2E4DFF"
                  ariaLabel="audio-loading"
                  wrapperClass="wrapper-class"
                  visible={true}
                  />
        </div>) 
        : 
      (<div className="bg-gray-50 min-h-screen py-10 px-5 md:px-10 font-quicksand">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Rent Audio Gear</h1>
          <p className="text-gray-500 mt-2">Professional equipment for your next event.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 lg:w-1/5 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button 
                  onClick={() => {setSelectedCategory("All"); setPriceRange(100)}} 
                  className="text-sm text-blue-600 hover:underline"
              >
                  Reset
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="w-full md:w-3/4 lg:w-4/5">
              {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <img src="https://img.icons8.com/ios/100/nothing-found.png" className="opacity-50 mb-4" alt="Empty"/>
                      <p>No products found matching your filters.</p>
                  </div>
              )}
          </main>

        </div>
    </div>)}
    </>
  );
};

export default AllProducts;