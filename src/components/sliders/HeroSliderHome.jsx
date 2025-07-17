import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide_1 from "../../assets/slide_1.jpg"
import slide_2 from "../../assets/banner_2_new.jpeg"
import { useNavigate } from "react-router-dom";

const HeroSliderHome = () => {
  const navigate = useNavigate()
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    dots: true,
  }

  return (
    <div className="w-full overflow-hidden h-[600px]">
      <Slider {...settings}>
        <div className="w-full">
          <div className="relative">
            <img
              src={slide_1}
              alt="Banner 1"
              className="w-full h-full"
            />
            <div className="absolute z-50 top-[30%] left-[8%]">
              <h1 className="text-4xl text-white font-bold">Power Your Sound Like a Pro</h1>
              <p className="text-lg text-gray-400 w-[70%] mt-5">Rent high-end speakers, subwoofers, and audio gear for events, studios, and shows.</p>
              <button
                onClick={() => {navigate('/items')}}
               className="border border-white text-white p-5 mt-5 rounded-lg font-semibold hover:cursor-pointer hover:bg-gray-100 hover:text-black">Browse Equipment</button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative">
            <img
              src={slide_2}
              alt="Banner 2"
              className="w-full h-full"
            />
            <div className="absolute z-50 right-[10%] top-[20%]">
              <h1 className="text-4xl text-white font-bold">We Power Your Event Sound</h1>
              <p className="text-lg text-gray-50 w-[70%] mt-5">Rent high-end speakers, subwoofers, and audio gear for events, studios, and shows.</p>
              <button
                onClick={() => {navigate('/contact')}}
               className="border border-white text-white p-5 mt-5 rounded-lg font-semibold hover:cursor-pointer hover:bg-gray-100 hover:text-black">Contact Us Now</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default HeroSliderHome;
