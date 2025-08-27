import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const HomeCat = () => {
  const [itemBg, setItemBg] = useState([
    "#fde4e1", // Very Light Coral
    "#ffe6e6", // Very Light Pink
    "#fff2e5", // Very Light Peach
    "#f7f3fc", // Very Light Lavender
    "#faf8d8", // Very Light Khaki
    "#fff8cc", // Light Gold
    "#e0f7ff", // Very Light Blue
    "#e6ffe6", // Very Light Green
    "#ffe4ec", // Very Light Pink
    "#fff5f5", // Very Light Misty Rose
    "#fdfde1", // Very Light Goldenrod
    "#f0ffff", // Very Light Cyan
    "#f8f0f8", // Very Light Thistle
    "#fff4e0", // Very Light Wheat
    "#fff8f0", // Very Light Linen
  ]);

  return (
    <section className="homeCat">
      <div className="container">
        <h3 className=" hd" style={{ color: "balck" }}>
          FEATURED DISHES
        </h3>
        <p className="text-light text-sml mb-4 mt-0">
          Do not miss the current offers until the end of November
        </p>
        <Swiper
          slidesPerView={7}
          autoplay={true}
          spaceBetween={16}
          slidesPerGroup={2}
          navigation={true}
          autoplaySpeed={3000}
          speed={500}
          modules={[Navigation]}
          className="mySwiper"
        >
          {itemBg?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="item text-center cursor"
                  style={{ background: item }}
                >
                  <img
                    src="https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg"
                    alt="image1"
                  />
                  <h6 style={{ color: "black" }} className="mt-3">Pizza Mania</h6>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
