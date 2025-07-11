import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner_1.jpg";
import banner2 from "../../assets/banner_2.jpg";

const HeroSliderHome = () => {
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
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        <div className="w-full">
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full h-[600px]"
          />
        </div>
        <div className="w-full">
          <img
            src={banner2}
            alt="Banner 2"
            className="w-full h-[600px]"
          />
        </div>
      </Slider>
    </div>
  )
}

export default HeroSliderHome;
