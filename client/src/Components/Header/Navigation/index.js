import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import { RiDrinksFill } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { FaBloggerB } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { fetchDataFromApi } from "../../../utils/Api";

const Navigation = (props) => {
  const [mealsProducts, setmealsProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isopenSidebarVal, setisopenSidebar] = useState(false);
  const [catData, setCatdata] = useState([]);
  useEffect(() => {
    fetchDataFromApi("/api/category") // Fetch categories from the API
      .then((res) => {
        console.log(res); // Log the response to verify data
        setCatdata(res);
        setCategoryData(res); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error("Error fetching category data:", error); // Handle any fetch errors
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
    <nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <div className="cartWrapper">
              <Button
                className="allCatTab align-items-center"
                onClick={() => setisopenSidebar(!isopenSidebarVal)}
              >
                <span className="icon1 mr-2">
                  <IoIosMenu />
                </span>
                <span class="text">ALL CATEGORIES</span>
                <span className="icon2 ml-4">
                  <FaAngleDown />
                </span>
              </Button>
              <div
                className={`sidebarNav ${
                  isopenSidebarVal === true ? "open" : ""
                }`}
              >
                <ul>
                  {categoryData.map((category) => (
                    <li key={category._id}>
                      <Link to={`/cat/${category._id}`}>
                        <Button>
                          {category.name} <FaAngleRight className="ml-auto" />
                        </Button>
                      </Link>
                      <div className="submenu1">
                        {mealsProducts
                          .filter((product) => product.catName == category.name) // Filter products by category
                          .map((product) => (
                            <Link
                              key={product._id}
                              to={`/product/${product._id}`}
                            >
                              <Button>{product.name}</Button>
                            </Link>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list list-inline ">
              <li className="list-inline-item">
                <Link to="/">
                  {" "}
                  <Button>
                    <FaHome /> &nbsp; Home
                  </Button>
                </Link>
              </li>
              {/* {
                props.navData?.length!== 0&& props.navData?.map((item,index)=>{
                  return(
                    
                  )
                })
              } */}

              {["Meal", "Dessert", "Drinks", "Combo"].map(
                (categoryName, index) => {
                  // Find the matching category in categoryData
                  const category = categoryData.find(
                    (cat) => cat.name === categoryName
                  );

                  return (
                    <li className="list-inline-item" key={index}>
                      <Link to={category ? `/cat/${category._id}` : "#"}>
                        {" "}
                        {/* Link to ID if found */}
                        <Button>
                          {categoryName === "Meal" && <IoFastFood />}
                          {categoryName === "Dessert" && <LuDessert />}
                          {categoryName === "Drinks" && <RiDrinksFill />}
                          {categoryName === "Combo" && <GiHotMeal />}
                          &nbsp; {categoryName}
                        </Button>
                      </Link>

                      <div className="subMenu shadow">
                        {mealsProducts
                          .filter((product) => product.catName === categoryName) // Filter products by category
                          .map((product) => (
                            <Link
                              key={product._id}
                              to={`/product/${product._id}`}
                            >
                              <Button>{product.name}</Button>
                            </Link>
                          ))}
                      </div>
                    </li>
                  );
                }
              )}

              <li className="list-inline-item">
                <Link to="/blog">
                  <Button>
                    <FaBloggerB />
                    &nbsp;Blog
                  </Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    <RiContactsFill />
                    &nbsp;Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
