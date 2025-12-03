import HeroSliderHome from "../components/sliders/HeroSliderHome"
import speakerImg from "../assets/category card images/speaker.jpeg"
import mic from "../assets/category card images/mic.jpeg"
import mixer from "../assets/category card images/mixer.jpeg"
import amplify from "../assets/category card images/amplify.jpeg"
import CategoryCard from "../components/cards/CategoryCard"
import WhyChooseCard from "../components/cards/WhyChooseCard"
import { useEffect, useState } from "react"
import BackendApi from "../api/BackendApi"
import toast from "react-hot-toast"
import Slider from "react-slick";
import NewArrivalsCard from "../components/cards/NewArrivalsCard"
import Footer from "../components/Footer"
const Home = () => {
    const [newArrivals, setNewArrivals] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchNewArrivals()
    }, [])

    const fetchNewArrivals = async() => {
        try{
            const newArrivalsRes = await BackendApi.get('/products/newArrivals')

            if(newArrivalsRes.status === 200){
                setNewArrivals(newArrivalsRes.data.products || [])
            }
        }catch(error){
            console.log(error);
            
            toast.error(error?.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
    
    const categories = [
        {
            name: "Speakers",
            image: speakerImg
        },
        {
            name: "Microphones",
            image: mic
        },
        {
            name: "Mixers & Controllers",
            image: mixer
        },
        {
            name: "Amplifiers",
            image: amplify
        }        
    ]

    const feedbacks = [
  {
    name: "Nimal Perera",
    comment: "Excellent service! The equipment was in perfect condition."
  },
  {
    name: "Samantha Jayasinghe",
    comment: "Friendly support and quick response. Will rent again!"
  },
  {
    name: "Dinesh Fernando",
    comment: "Everything worked smoothly. Highly recommended."
  },
  {
    name: "Anushka Silva",
    comment: "Impressed by the sound quality. Easy pickup and return process."
  },
  {
    name: "Iresha Madushani",
    comment: "Simple booking process and great value for the price."
  },
  {
    name: "Kavindu Lakmal",
    comment: "Loved the experience. Staff was very helpful."
  },
  {
    name: "Dilani Peris",
    comment: "Quick delivery and setup instructions were clear."
  },
  {
    name: "Roshan Gunathilake",
    comment: "Perfect for our event. Will definitely come back!"
  }
];

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        }
    return(
        <>
            {!loading && (<div>
                <div>
                    <HeroSliderHome/>
                </div>
                <div className="my-15 mx-15">
                    <h1 className="text-2xl font-semibold font-quicksand my-5">Category</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <CategoryCard categories={categories}/>
                    </div>
                </div>
                <div className="bg-gray-100 w-full pb-2">
                    <h1 className="mx-15 font-quicksand text-2xl font-semibold py-10">Why Choose Us?</h1>
                    <WhyChooseCard/>
                </div>
                <div className="mx-15 my-10">
                    <h1 className="font-quicksand text-2xl font-semibold py-10">New Arrivals</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {newArrivals.map((product, index) => (
                            <NewArrivalsCard product={product} index={index}/>
                        ))}
                    </div>
                </div>
                <div className="mt-15 mb-10 mx-15">
                    <h1 className="text-2xl font-semibold font-quicksand my-10">What People <span className="text-blue-600">Think About Us</span></h1>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {feedbacks.map((feedback, index) => (
                                <div key={index} className="px-1">
                                    <div className="mt-17 rounded-3xl h-[250px] w-[400px]  bg-gray-100 relative">
                                        <div><img className="w-[100px] h-[100px] rounded-full object-contain absolute top-[-25%] left-[38%]" src="https://img.icons8.com/?size=100&id=2zQuuMM0XuM9&format=png&color=000000" alt="pp"/></div>
                                        <h1 className="pt-12 text-center text-xl font-semibold font-quicksand">{feedback.name}</h1>
                                        <p className="text-center"><span className="block"><img className="w-10 h-10 px-2" src="https://img.icons8.com/?size=100&id=38968&format=png&color=228BE6"/></span>
                                            {feedback.comment}
                                            <span className="flex justify-end"><img className="w-10 h-10 px-2" src="https://img.icons8.com/?size=100&id=38970&format=png&color=228BE6"/></span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <Footer/>
            </div>)}
        </>
    )
}

export default Home