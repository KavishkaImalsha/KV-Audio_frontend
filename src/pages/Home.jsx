import { useEffect, useState, useContext } from "react"
import { motion } from "framer-motion"
import BackendApi from "../api/BackendApi"
import toast from "react-hot-toast"
import Slider from "react-slick"
import HeroSliderHome from "../components/sliders/HeroSliderHome"
import NewArrivalsCard from "../components/cards/NewArrivalsCard"
import Footer from "../components/Footer"
import speakerImg from "../assets/category card images/speaker.jpeg"
import mic from "../assets/category card images/mic.jpeg"
import mixer from "../assets/category card images/mixer.jpeg"
import amplify from "../assets/category card images/amplify.jpeg"
import { ArrowRight, CheckCircle, Star, Music, Zap } from "lucide-react"
import { Audio } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom"
import ProductDetailsPopUpModel from "../components/models/productDetails/ProductDetailsPopUpModel"
import CartContext from "../context/CartContext"
const Home = () => {
    const [newArrivals, setNewArrivals] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModelShow, setIsModelShow] = useState(false)
    const [clickedProduct, setClickedProduct] = useState(null)
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetchNewArrivals()
    }, [])

    const fetchNewArrivals = async () => {
        try {
            const newArrivalsRes = await BackendApi.get('/products/newArrivals')
            if (newArrivalsRes.status === 200) {
                setNewArrivals(newArrivalsRes.data.products || [])
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const handleOnClose = () => {
        setIsModelShow(false)
    }

    const handelCategoryClick = (categoryName) => {
        navigate(`/items?category=${encodeURIComponent(categoryName)}`)
    }

    // --- DATA ---
    const categories = [
        { name: "Speakers", image: speakerImg, desc: "Powerful sound for any venue" },
        { name: "Microphones", image: mic, desc: "Crystal clear vocals" },
        { name: "Mixers", image: mixer, desc: "Control the beat" },
        { name: "Amplifiers", image: amplify, desc: "Boost your performance" }
    ]

    const feedbacks = [
        { name: "Nimal Perera", comment: "Excellent service! The equipment was in perfect condition." },
        { name: "Samantha Jayasinghe", comment: "Friendly support and quick response. Will rent again!" },
        { name: "Dinesh Fernando", comment: "Everything worked smoothly. Highly recommended." },
        { name: "Anushka Silva", comment: "Impressed by the sound quality. Easy pickup." }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">
        <Audio
                  height="50"
                  width="50"
                  color="#2E4DFF"
                  ariaLabel="audio-loading"
                  wrapperClass="wrapper-class"
                  visible={true}
                  />
    </div>
    
    return (
        <div className="overflow-hidden bg-white">
            <div className="relative z-10">
                <HeroSliderHome />
            </div>

            <section className="py-20 px-5 max-w-7xl mx-auto">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Browse by Type</h2>
                    <h1 className="text-4xl font-bold font-quicksand text-gray-900">Explore Our <span className="text-blue-600">Collection</span></h1>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {categories.map((cat, index) => (
                        <motion.div 
                            key={index} 
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                            onClick={() => {handelCategoryClick(cat.name)}}
                        >
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold font-quicksand">{cat.name}</h3>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                    {cat.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20"></div>
                
                <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-blue-500 font-bold tracking-wide uppercase mb-2">Why Choose Us?</h2>
                        <h1 className="text-4xl md:text-5xl font-bold font-quicksand mb-6 leading-tight">
                            Professional Audio, <br/> Zero Hassle.
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            We provide top-tier audio equipment for concerts, weddings, and private parties. Experience studio-quality sound with our meticulously maintained gear.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2">
                            Learn More <ArrowRight size={20}/>
                        </button>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        variants={staggerContainer}
                    >
                        {[
                            { title: "Premium Quality", desc: "Top brands like JBL, Sony, Shure", icon: <Music className="text-blue-400"/> },
                            { title: "24/7 Support", desc: "Technical assistance whenever you need", icon: <CheckCircle className="text-blue-400"/> },
                            { title: "Fast Delivery", desc: "Setup and delivery to your venue", icon: <Zap className="text-blue-400"/> },
                        ].map((item, i) => (
                            <motion.div key={i} variants={fadeInUp} className="bg-gray-800 p-6 rounded-xl flex items-start gap-4 hover:bg-gray-750 transition-colors border border-gray-700">
                                <div className="p-3 bg-gray-900 rounded-lg">{item.icon}</div>
                                <div>
                                    <h3 className="font-bold text-xl">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-5 max-w-7xl mx-auto">
                <motion.div 
                    className="flex justify-between items-end mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-quicksand">New <span className="text-blue-600">Arrivals</span></h1>
                        <p className="text-gray-500 mt-2">Latest gear added to our inventory</p>
                    </div>
                    <button className="hidden md:block text-blue-600 font-semibold hover:underline"
                        onClick={() => {
                            navigate('/items')
                        }}
                    >View All</button>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newArrivals.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <NewArrivalsCard product={product} index={index} setIsModelShow={setIsModelShow} setClickedProduct={setClickedProduct}/>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-5">
                    <h1 className="text-center text-3xl font-bold font-quicksand mb-12">What People <span className="text-blue-600">Think About Us</span></h1>
                    
                    <Slider {...sliderSettings} className="pb-10">
                        {feedbacks.map((feedback, index) => (
                            <div key={index} className="px-4 py-4">
                                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-[280px] flex flex-col relative">
                                    <div className="absolute top-6 right-8 opacity-10">
                                        <img src="https://img.icons8.com/ios-filled/50/000000/quote-left.png" alt="quote"/>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-6">
                                        <img 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" 
                                            src="https://img.icons8.com/?size=100&id=2zQuuMM0XuM9&format=png&color=000000" 
                                            alt="avatar"
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{feedback.name}</h4>
                                            <div className="flex text-yellow-400 text-xs">
                                                <Star fill="currentColor" size={14} />
                                                <Star fill="currentColor" size={14} />
                                                <Star fill="currentColor" size={14} />
                                                <Star fill="currentColor" size={14} />
                                                <Star fill="currentColor" size={14} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 italic leading-relaxed flex-grow">
                                        "{feedback.comment}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>


            <section className="py-20 bg-blue-600 text-white text-center px-5">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl font-bold font-quicksand mb-6">Ready to Amplify Your Event?</h1>
                    <p className="text-blue-100 text-lg mb-8">Get the best equipment at the best prices.</p>
                    <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                        onClick={() => {
                            navigate('/items')
                        }}
                    >
                        Browse Equipment
                    </button>
                </motion.div>
            </section>

            <Footer/>

            {isModelShow && clickedProduct &&<ProductDetailsPopUpModel onAddToCart={addToCart} onClose={handleOnClose} product={clickedProduct}/>}
        </div>
    )
}

export default Home