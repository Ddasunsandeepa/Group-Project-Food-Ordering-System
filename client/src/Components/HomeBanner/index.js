import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
  var settings = {
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
    <>
      <div className="HomeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <div className="overlay" data-testid="slide-overlay"></div>
            <img
              src="https://marketplace.canva.com/EAFh8EnFLW4/1/0/1600w/canva-maroon-and-yellow-modern-food-promotion-banner-landscape-xPGAjV9zPS0.jpg"
              className="w-100"
              alt="image1"
            />
            <div className="banner-content">
              <h2>Delicious Meals</h2>
              <p>Enjoy the best dishes curated just for you.</p>
              <p className="text-md mt-4">
                Discover our delicious menu and find your new favorite meal!
              </p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          <div className="item">
            <div className="overlay" data-testid="slide-overlay"></div>
            <img
              src="https://marketplace.canva.com/EAF4CZw2lck/1/0/1600w/canva-red-and-white-modern-new-spicy-pizza-food-menu-banner-LgYqmrP8vdI.jpg"
              className="w-100"
              alt="image2"
            />
            <div className="banner-content">
              <h2>Spicy Pizza</h2>
              <p>Try our hot and spicy pizza for a taste sensation.</p>
              <p className="text-md mt-4">
                Discover our delicious menu and find your new favorite meal!
              </p>
              <button className="shop-now-btn">Order Now</button>
            </div>
          </div>
          <div className="item">
            <div className="overlay" data-testid="slide-overlay"></div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/030/033/459/large_2x/sushi-rolls-banner-free-space-text-mockup-fast-food-top-view-empty-professional-phonography-photo.jpg"
              className="w-100"
              alt="image3"
            />
            <div className="banner-content">
              <h2>Fresh Sushi</h2>
              <p>Savor our finest sushi made with fresh ingredients.</p>
              <p className="text-md mt-4">
                Discover our delicious menu and find your new favorite meal!
              </p>
              <button className="shop-now-btn">Order Now</button>
            </div>
          </div>
          <div className="item">
            <div className="overlay" data-testid="slide-overlay"></div>
            <img
              src="https://img.pikbest.com/backgrounds/20210514/sushi-japanese-food-banner_5964063.jpg!bwr800"
              className="w-100"
              alt="image4"
            />
            <div className="banner-content">
              <h2>Delicious Food</h2>
              <p>Indulge in our mouth-watering dishes.</p>
              <p className="text-md mt-4">
                Discover our delicious menu and find your new favorite meal!
              </p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
