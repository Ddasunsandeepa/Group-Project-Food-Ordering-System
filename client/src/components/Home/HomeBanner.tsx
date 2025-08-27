import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeBanner.css"; 

const HomeBanner: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="relative text-center text-white h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-black/70 z-10" />
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-5 max-w-[300px] md:max-w-full mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{banner.title.toUpperCase()}</h2>
              <p className="mt-2 text-sm md:text-xl font-light">{banner.subtitle}</p>
              <p className="text-sm md:text-base mt-1 max-w-xl font-light">{banner.description}</p>
              <button className="mt-8 px-5 py-2 bg-app-bannerbtn hover:bg-app-bannerbtnhover text-black font-semibold rounded-full transition">
                {banner.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBanner;

const banners = [
  {
    title: "Delicious Meals",
    subtitle: "Enjoy the best dishes curated just for you.",
    description: "Discover our delicious menu and find your new favorite meal!",
    buttonText: "Shop Now",
    image:
      "https://marketplace.canva.com/EAFh8EnFLW4/1/0/1600w/canva-maroon-and-yellow-modern-food-promotion-banner-landscape-xPGAjV9zPS0.jpg",
  },
  {
    title: "Spicy Pizza",
    subtitle: "Try our hot and spicy pizza for a taste sensation.",
    description: "Discover our delicious menu and find your new favorite meal!",
    buttonText: "Order Now",
    image:
      "https://marketplace.canva.com/EAF4CZw2lck/1/0/1600w/canva-red-and-white-modern-new-spicy-pizza-food-menu-banner-LgYqmrP8vdI.jpg",
  },
  {
    title: "Fresh Sushi",
    subtitle: "Savor our finest sushi made with fresh ingredients.",
    description: "Discover our delicious menu and find your new favorite meal!",
    buttonText: "Order Now",
    image:
      "https://static.vecteezy.com/system/resources/previews/030/033/459/large_2x/sushi-rolls-banner-free-space-text-mockup-fast-food-top-view-empty-professional-phonography-photo.jpg",
  },
  {
    title: "Delicious Food",
    subtitle: "Indulge in our mouth-watering dishes.",
    description: "Discover our delicious menu and find your new favorite meal!",
    buttonText: "Shop Now",
    image:
      "https://img.pikbest.com/backgrounds/20210514/sushi-japanese-food-banner_5964063.jpg!bwr800",
  },
];
