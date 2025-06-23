import React, { useContext, useEffect, useState } from "react";
import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityDropDown";
import Button from "@mui/material/Button";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import RelatedProducts from "./RelatedProducts";
import { useParams } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/Api";
import { Mycontext } from "../../context/MyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Reviews } from "@mui/icons-material";

const ProductDetails = () => {
  const [reviewData, setReviewData] = useState([]);
  const [reviews, setReviews] = useState({
    productId: "",
    customerName: "",
    customerId: "",
    review: "",
    customerRating: 1, // Default to 1 to avoid empty value issues
  });
  const { addtoCart } = useContext(Mycontext);
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(0);
  const [activeTabs, setActiveTabs] = useState(0);
  const [productData, setProductData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [addingCart, setaddingCart] = useState(false);
  const [cartFields, setCartFields] = useState({});
  const [reviewList, setReviewList] = useState();
  const [loading, setLoaing] = useState(false);
  const { id } = useParams();

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   fetchDataFromApi(`/api/products/${id}`).then((res) => {
  //     setProductData(res);
  //     console.log(res);
  //     setCurrentPrice(res.price); // Set initial price
  //   });
  // }, [id]); // Re-fetch when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setProductData(res);
      setCurrentPrice(res.price); // Set initial price

      if (res) {
        // Get existing recently viewed products from localStorage
        let recentlyViewed =
          JSON.parse(localStorage.getItem("recentlyViewed")) || [];

        // Remove duplicate entries
        recentlyViewed = recentlyViewed.filter((p) => p._id !== res._id);

        // Add the new product at the beginning
        recentlyViewed.unshift(res);

        // Keep only the last 5 recently viewed products
        if (recentlyViewed.length > 5) {
          recentlyViewed.pop();
        }

        // Save back to localStorage
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
      }
    });
    fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
      console.log(res);
      setReviewData(res);
    });
  }, [id]); // Re-fetch when ID changes

  if (!productData) {
    return <div>Loading...</div>;
  }
  const isActive = (index) => {
    setActiveSize(index);
  };
  const sizePriceIncrements = [0, 4, 6, 12]; // Example: Small (+$0), Medium (+$2), Large (+$4), Supreme (+$6)

  const handleSizeChange = (index) => {
    setActiveSize(index);
    setCurrentPrice(
      (productData.price + sizePriceIncrements[index]) * quantity
    );
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setCurrentPrice(
      (productData.price + sizePriceIncrements[activeSize]) * newQuantity
    );
  };

  const addtoCartfunc = () => {
    if (activeSize !== null) {
      let user = JSON.parse(localStorage.getItem("user"));

      // If no user is logged in, generate an anonymous ID
      if (!user) {
        user = { id: `anonymous-${Date.now()}` }; // Create an anonymous ID using the timestamp
        localStorage.setItem("user", JSON.stringify(user)); // Optionally save it in localStorage for future use
      }

      // Now use the user ID (either logged in or anonymous)
      cartFields.productTitle = productData?.name;
      cartFields.images = productData?.images[0];
      cartFields.rating = productData?.rating;
      cartFields.price = productData?.price;
      cartFields.quantity = quantity;
      cartFields.subTotal = currentPrice;
      cartFields.productId = productData?._id;
      cartFields.userId = user.id; // Use either logged-in or anonymous user ID
      cartFields.size = productData?.size[activeSize];

      addtoCart(cartFields);
    } else {
      toast.error("❌ Please Select a Size!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#dc3545",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "10px 15px",
        },
        icon: "⚠️",
      });
    }
  };

  const onchangeInput = (e) => {
    setReviews((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeRating = (e) => {
    setReviews((prev) => ({
      ...prev,
      customerRating: e.target.value,
    }));
  };
  // const addReview = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   const user = JSON.stringify(localStorage.getItem("user"));
  //   console.log(Reviews);
  //   setReviews(() => ({
  //     ...reviews,
  //     productId: id,
  //     customerId: user?._id,
  //   }));

  //   // formData.append("productId", id);
  //   // formData.append("customerName", user?.name);
  //   // formData.append("customerId", user?._id);
  //   // formData.append("review", reviews?.review);
  //   // formData.append("customerRating", reviews?.customerRating);

  //   // postData("api/productReviews/add", formData).then((res) => {
  //   //   console.log(res);
  //   // });
  // };
  const addReview = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if user is logged in and has a userId
    if (!user || !user._id) {
      toast.error("❌ Please log in to submit your review!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#dc3545",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "10px 15px",
        },
        icon: "⚠️",
      });
      return; // Exit the function if the user is not logged in
    }

    const reviewData = {
      ...reviews,
      productId: id,
      customerId: user?._id,
      customerName: user?.name,
    };

    setLoaing(true);

    // Optimistic UI update
    setReviewData((prevReviews) => [
      ...prevReviews,
      { ...reviewData, _id: new Date().getTime(), createdAt: new Date() }, // Temporary data
    ]);

    postData("/api/productReviews/add", reviewData).then((res) => {
      setReviews({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        customerRating: "1",
      });
      setTimeout(() => {
        setLoaing(false);
      }, 1000);
    });
  };

  const addToMyList = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please log in to add items to your wishlist!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      // Wait for the API response
      const myListData = await fetchDataFromApi("/api/myList/");

      // Check if the item is already in the wishlist
      const isAlreadyInWishlist = myListData.some(
        (item) => item.productId === id
      );

      if (isAlreadyInWishlist) {
        toast.info("This item is already in your wishlist! ❤️", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return; // Stop execution if the item is already in the wishlist
      }

      const data = {
        productTitle: productData.name,
        images: productData.images[0],
        rating: Number(productData.rating),
        price: currentPrice,
        productId: id,
        userId: user?._id,
      };

      // Add item to wishlist
      const res = await postData("/api/myList/add/", data);

      if (res) {
        toast.success("Item added to wishlist! ❤️", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        toast.error("Failed to add item. Try again!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <section className="productDetails section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 ml-5 pl-5">
              <ProductZoom
                images={productData.images}
                discount={productData.discount}
              />
            </div>
            <div className="col-md-8 ml-4 pl-4 pr-4">
              <h2
                className="hd ml-4 text-capitalize"
                style={{ color: "black" }}
              >
                {productData.name}
              </h2>

              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="ml-4">Categories</span>
                    <span className="ml-1" style={{ color: "black" }}>
                      {" "}
                      : {productData.catName}
                    </span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating
                      name="read-only"
                      value={Number(productData.rating)}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <span className="text-light cursor ml-2">
                      {Number(productData.rating)} Reviews
                    </span>
                  </div>
                </li>
              </ul>

              <div className="d-flex info mb-3 ml-4">
                <span className="oldPrice">${productData.oldPrice}</span>
                <span className="netPrice text-danger ml-2">
                  ${currentPrice}
                </span>
              </div>
              <span className="badge badge-success ml-4">IN STOCK</span>
              <p className="mt-3 ml-4" style={{ color: "black" }}>
                {productData.description}
              </p>

              <div className="productSize d-flex align-items-center">
                <span>Size</span>
                <ul className="list list-inline mb-0 pl-4">
                  {productData.size?.map((size, index) => (
                    <li className="list-inline-item" key={index}>
                      <a
                        className={`tag ${
                          activeSize === index ? "active" : ""
                        }`}
                        onClick={() => handleSizeChange(index)}
                      >
                        {size}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-flex align-items-center ml-4 mt-3">
                <QuantityBox
                  inputVal={quantity}
                  setInputVal={handleQuantityChange}
                />
                <Button
                  className="btn-blue btn-lg btn-big btn-round"
                  onClick={addtoCartfunc}
                >
                  <FaCartShopping /> &nbsp; Add to cart
                </Button>

                <Tooltip title="Add to WishList" placement="top">
                  <Button
                    onClick={() => addToMyList(productData?._id)}
                    className="btn-blue btn-lg btn-big btn-circle ml-4"
                    style={{ fontSize: "17px" }}
                  >
                    <FaRegHeart /> &nbsp;
                  </Button>
                </Tooltip>

                <Tooltip title="Add to Compare" placement="top">
                  <Button
                    className="btn-blue btn-lg btn-big btn-circle ml-2"
                    style={{ fontSize: "17px" }}
                  >
                    <MdCompareArrows /> &nbsp;
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <br />

          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 && "active"}`}
                    onClick={() => {
                      setActiveTabs(0);
                    }}
                  >
                    Description
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 && "active"}`}
                    onClick={() => {
                      setActiveTabs(1);
                    }}
                  >
                    Ingredients & Allergens
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 && "active"}`}
                    onClick={() => {
                      setActiveTabs(2);
                    }}
                  >
                    Reviews ({reviewData.length})
                  </Button>
                </li>
              </ul>
              <br />
              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>{productData.description} </p>
                </div>
              )}
              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="ingredients">
                          <th>Ingredients</th>
                          <td>
                            BBQ sauce, mozzarella, grilled chicken, red onions,
                            cilantro.
                          </td>
                        </tr>
                        <tr className="allergens">
                          <th>Allergens</th>
                          <td>
                            Contains dairy, gluten. May contain traces of nuts.
                          </td>
                        </tr>
                        <tr className="portion-size">
                          <th>Portion Size</th>
                          <td>Serves 2-4 people.</td>
                        </tr>
                        <tr className="calories">
                          <th>Calories</th>
                          <td>Approx. 450 calories per slice.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTabs === 2 && (
                <div className="tabContent">
                  <div className="row">
                    <div className="col-md-10">
                      <h3>Customer question & answers</h3>
                      <br />
                      <div className="review-section">
                        <h3
                          className="text-dark mb-4 text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer Reviews
                        </h3>
                        {reviewData.length > 0 ? (
                          reviewData.map((review, index) => (
                            <div
                              key={index}
                              className="card p-4 reviewCard flex-row mb-4"
                              style={{
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff5f7",
                                border: "1px solid #ffccd5",
                              }}
                            >
                              {/* Avatar Section */}
                              <div className="image">
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center"
                                  style={{
                                    height: "80px",
                                    width: "80px",
                                    borderRadius: "50%",
                                    backgroundColor: "#ff5a80",
                                    color: "#fff",
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  {review.customerName.charAt(0)}
                                </div>
                                <span
                                  className="text-dark d-block text-center font-weight-bold mt-2"
                                  style={{ fontSize: "14px" }}
                                >
                                  {review.customerName}
                                </span>
                              </div>

                              {/* Review Content */}
                              <div className="info pl-4" style={{ flex: "1" }}>
                                <div className="d-flex align-items-center w-100 mb-2">
                                  <h5
                                    className="text-dark m-0"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {new Date().toISOString().split("T")[0]}
                                  </h5>
                                  <div className="ml-auto">
                                    <Rating
                                      name={`rating-${index}`}
                                      value={review.customerRating}
                                      precision={0.5}
                                      readOnly
                                      size="small"
                                    />
                                  </div>
                                </div>
                                <p
                                  style={{
                                    color: "#333",
                                    fontSize: "15px",
                                    lineHeight: "1.6",
                                    backgroundColor: "#ffe6ea",
                                    padding: "10px",
                                    borderRadius: "8px",
                                  }}
                                >
                                  {review.review}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-dark">
                            No reviews yet. Be the first to review!
                          </p>
                        )}
                      </div>
                    </div>

                    <br className="res-hide" />
                    <br className="res-hide" />
                    <br />
                    <br />
                    <div className="col-md-10">
                      <form className="reviewForm" onSubmit={addReview}>
                        <h4 className="mt-4">Add a review</h4>

                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Write a Review"
                            name="review"
                            onChange={onchangeInput}
                            value={reviews.review}
                          ></textarea>
                        </div>
                        <div className="row">
                          {/* <div className="col-md-5">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="customerName"
                                onChange={onchangeInput}
                                value={reviews.customerName}
                              />
                            </div>
                          </div> */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <Rating
                                name="customerRating"
                                value={reviews.customerRating}
                                precision={0.5}
                                onChange={changeRating}
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="form-group">
                          <Button
                            type="submit"
                            className="btn-blue btn-lg btn-big btn-round buton"
                          >
                            Submit Review
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
          <RelatedProducts
            title="RELATED MEALS"
            categoryName={productData.catName}
            currentProductId={productData._id}
            type="related"
          />
          <RelatedProducts title="RECENTLY VIEWED PRODUCTS" type="recent" />
        </div>
      </section>
      {loading === true && <div className="loading"></div>}
    </div>
  );
};

export default ProductDetails;
