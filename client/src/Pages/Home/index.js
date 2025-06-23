import { Button, Rating } from "@mui/material";
import HomeBanner from "../../Components/HomeBanner";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ProductItem from "../../Components/ProductItem/ProductItem";
import HomeCat from "../../Components/HomeCat";
import newsBanner from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";
import { fetchDataFromApi } from "../../utils/Api";
import { Mycontext } from "../../context/MyContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NoProductsFound from "../../Components/motionProduct";

const Home = (props) => {
  const [categoryData, setCategoryData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle category tab change and filter products
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected tab

    const selectedCategory = categoryData[newValue]; // Get selected category
    if (selectedCategory) {
      // Filter products by the selected category's ID
      const filtered = featuredProducts.filter(
        (product) => product.catName === selectedCategory.name
      );
      setFilteredProducts(filtered); // Update filtered products
    }
  };
  // Handle tab changes
  const [catData, setCatdata] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [mealsProducts, setmealsProducts] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      console.log(res);
      setCatdata(res);
    });
    fetchDataFromApi(`/api/products/featured`).then((res) => {
      setfeaturedProducts(res);
      setFilteredProducts(res);
    });
    fetchDataFromApi(`/api/products`).then((res) => {
      setmealsProducts(res);
      console.log(res);
    });
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  useEffect(() => {
    fetchDataFromApi("/api/category") // Fetch categories from the API
      .then((res) => {
        console.log(res); // Log the response to verify data
        setCategoryData(res); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching category data:", error); // Handle any fetch errors
      });

    fetchDataFromApi("/api/products/featured") // Fetch featured products
      .then((res) => {
        setfeaturedProducts(res); // Set featured products in the state
        setFilteredProducts(res);
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
      });

    fetchDataFromApi("/api/products") // Fetch all products
      .then((res) => {
        setmealsProducts(res); // Set meals products in the state
      })
      .catch((error) => {
        console.error("Error fetching all products:", error);
      });
  }, []);

  return (
    <>
      <HomeBanner />
      {catData?.length !== 0 && <HomeCat catData={catData} />}
      {/* <HomeCat /> */}
      <section className="homeProducts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 pos">
              <div className="sticky">
                <div className="banner ">
                  <img
                    src="https://img.freepik.com/free-psd/delicious-burger-food-menu-instagram-facebook-story-template_120329-4870.jpg"
                    alt=""
                    className="cursor w-100"
                  />
                </div>

                <div className="banner mt-5">
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif"
                    alt=""
                    className="cursor w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center mt-3">
                <div className="info w-75">
                  <h3 className="mb-0 hd">SPECIAL OFFERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March
                  </p>
                </div>

                <div className="ml-auto">
                  <Box
                    sx={{
                      maxWidth: { xs: 320, sm: 480 },
                      bgcolor: "background.paper",
                      padding: 2,
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      {/* Render Tab for each category */}
                      {categoryData?.map((item, index) => (
                        <Tab
                          key={index}
                          label={item.name}
                          sx={{
                            fontSize: "18px",
                            padding: "10px 20px",
                          }}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </div>
              </div>

              {/* Swiper for Featured Products */}
              <div className="productRow w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={12}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Navigation, Autoplay]} // Include Autoplay module
                  className="mySwiper"
                >
                  {filteredProducts?.length > 0 ? (
                    filteredProducts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))
                  ) : (
                    <NoProductsFound /> // Use this beautiful animated component here
                  )}
                </Swiper>
              </div>
              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">MEALS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of November
                  </p>
                </div>
                <Button className="viewAllBtn ml-9">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>
              {mealsProducts?.length !== 0 &&
                (() => {
                  const filteredMeals = mealsProducts.filter(
                    (item) => item.category?.name?.toLowerCase() === "meal"
                  );
                  const firstRow = filteredMeals.slice(0, 6); // First 6 items
                  const secondRow = filteredMeals.slice(6); // Remaining items

                  return (
                    <>
                      <div className="productRow productRow2 w-100 mt-4">
                        {/* First Swiper (Row 1) */}
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={12}
                          pagination={{ clickable: true }}
                          modules={[Navigation]}
                          className="mySwiper"
                        >
                          {firstRow.map((item, index) => (
                            <SwiperSlide key={index}>
                              <ProductItem item={item} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>

                      {secondRow.length > 0 && ( // Only show second row if there are more than 6 items
                        <div className="productRow productRow2 w-100 mt-4">
                          {/* Second Swiper (Row 2) */}
                          <Swiper
                            slidesPerView={4}
                            spaceBetween={12}
                            pagination={{ clickable: true }}
                            modules={[Navigation]}
                            className="mySwiper"
                          >
                            {secondRow.map((item, index) => (
                              <SwiperSlide key={index}>
                                <ProductItem item={item} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      )}
                    </>
                  );
                })()}

              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner">
                  <img
                    src="https://freedesignfile.com/upload/2018/11/Pizza-advertising-template-with-blackboard-vector-01.jpg"
                    alt=""
                    className="cursor "
                  />
                </div>
                <div className="banner ">
                  <img
                    src="https://img.pikbest.com/templates/20240612/special-pasta-food-offer-social-media-post-design_10613031.jpg!w700wp"
                    alt=""
                    className="cursor "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="d-flex align-items-center mt-1">
        <div className="info w-75 ml-4">
          <h3 className="mb-0 hd" style={{ color: "black" }}>
            POPULAR PRODUCTS
          </h3>
          <p className="text-light text-sml mb-0">
            Check out our most popular products with top ratings! ⭐
          </p>
        </div>
        <Button className="viewAllBtn ml-9">
          View All <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="productRow w-100 mt-4">
        {(() => {
          const popularProducts = mealsProducts?.filter(
            (item) => item.rating >= 4
          );

          return popularProducts.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ marginLeft: 15 }}
            >
              {popularProducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-items-container" style={{ marginLeft: 25 }}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg" // Add a beautiful "No Items" image
                alt="No popular products available"
                className="no-items-img"
                height={150}
                width={180}
              />
              <p className="no-items-text">
                Oops! No popular products available right now. 😔
              </p>
            </div>
          );
        })()}
      </div>
      <div className="d-flex align-items-center mt-1">
        <div className="info w-75 ml-4">
          <h3 className="mb-0 hd" style={{ color: "black" }}>
            DESSERTS
          </h3>
          <p className="text-light text-sml mb-0">
            Do not miss the current offers until the end of March!...
          </p>
        </div>
        <Button className="viewAllBtn ml-9">
          View All <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="productRow w-100 mt-4">
        {(() => {
          const desserts = mealsProducts?.filter(
            (item) => item.category?.name?.toLowerCase() === "dessert"
          );

          return desserts.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ marginLeft: 15 }}
            >
              {desserts.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-items-container" style={{ marginLeft: 25 }}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg" // Add a beautiful "No Items" image
                alt="No desserts available"
                className="no-items-img"
                height={150}
                width={180}
              />
              <p className="no-items-text">
                Oops! No delicious desserts available right now. 🍰
              </p>
            </div>
          );
        })()}
      </div>
      <br />
      <br />
      <div className="d-flex align-items-center mt-3">
        <div className="info w-75 ml-4">
          <h3 className="mb-0 hd" style={{ color: "black" }}>
            BURGERS
          </h3>
          <p className="text-light text-sml mb-0">
            Juicy and delicious! Grab your favorite burger now! 🍔
          </p>
        </div>
        <Button className="viewAllBtn ml-9">
          View All <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="productRow w-100 mt-4">
        {(() => {
          const burgers = mealsProducts?.filter(
            (item) => item.category?.name?.toLowerCase() === "burger"
          );

          return burgers.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ marginLeft: 15 }}
            >
              {burgers.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-items-container" style={{ marginLeft: 25 }}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                alt="No burgers available"
                className="no-items-img"
                height={150}
                width={180}
              />
              <p className="no-items-text">
                Oops! No tasty burgers available right now. 🍔
              </p>
            </div>
          );
        })()}
      </div>
      <br />
      <br />
      <div className="d-flex align-items-center mt-3">
        <div className="info w-75 ml-4">
          <h3 className="mb-0 hd" style={{ color: "black" }}>
            DRINKS
          </h3>
          <p className="text-light text-sml mb-0">
            Stay refreshed with our amazing drinks selection! 🍹
          </p>
        </div>
        <Button className="viewAllBtn ml-9">
          View All <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="productRow w-100 mt-4">
        {(() => {
          const drinks = mealsProducts?.filter(
            (item) => item.category?.name?.toLowerCase() === "drinks"
          );

          return drinks.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ marginLeft: 15 }}
            >
              {drinks.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-items-container" style={{ marginLeft: 25 }}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
                alt="No drinks available"
                className="no-items-img"
                height={150}
                width={180}
              />
              <p className="no-items-text">
                Oops! No refreshing drinks available right now. 🍹
              </p>
            </div>
          );
        })()}
      </div>
      <br /> <br />
      <div className="d-flex align-items-center mt-3">
        <div className="info w-75 ml-4">
          <h3 className="mb-0 hd" style={{ color: "black" }}>
            COMBOS
          </h3>
          <p className="text-light text-sml mb-0">
            Enjoy our delicious and satisfying meal combos! 🍽️
          </p>
        </div>
        <Button className="viewAllBtn ml-9">
          View All <IoIosArrowRoundForward />
        </Button>
      </div>
      <div className="productRow w-100 mt-4">
        {(() => {
          const combos = mealsProducts?.filter(
            (item) => item.category?.name?.toLowerCase() === "combo"
          );

          return combos.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={12}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
              style={{ marginLeft: 15 }}
            >
              {combos.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-items-container" style={{ marginLeft: 25 }}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg" // Add a beautiful "No Items" image
                alt="No combos available"
                className="no-items-img"
                height={150}
                width={180}
              />
              <p className="no-items-text">
                Oops! No amazing combos available right now. 🍽️
              </p>
            </div>
          );
        })()}
      </div>{" "}
      <br />
      <br />
      <section className="newsLetterSection mt-1 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">
                $25 discount for your first order
              </p>
              <h3 className="text-white">Join our newsletters and get...</h3>
              <p className="text-light">
                Join our email subscription now to get updates on
                <br /> promotions and coupons.
              </p>
              <form>
                <IoMailOutline />
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={newsBanner} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
