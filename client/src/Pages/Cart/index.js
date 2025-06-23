import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityDropDown";
import { MdDelete } from "react-icons/md";
import { Mycontext } from "../../context/MyContext";
import { deleteData, editData, fetchDataFromApi } from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoBagCheckOutline } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [activeSize, setActiveSize] = useState(null);
  const [cartFields, setCartFields] = useState({});
  const [cartDataS, setCartDataS] = useState([]);
  const [loading, setLoaing] = useState(false);
  const [subtotal, setSubtotal] = useState("0.00");
  const { cartdata} = useContext(Mycontext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?._id}`).then((res) => {
      setCartDataS(res);
    });
  }, []);
  const updateQuantity = (productId, newQuantity) => {
    setCartDataS((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: newQuantity,
              subTotal: item.price * newQuantity, // Update subtotal
            }
          : item
      )
    );

    // Find the updated item and call selectedItem
    const updatedItem = cartDataS.find((item) => item._id === productId);
    if (updatedItem) {
      selectedItem({ ...updatedItem, quantity: newQuantity });
    }
  };

  const removeItem = (id) => {
    setLoaing(true);

    deleteData(`/api/cart/${id}`)
      .then((res) => {
        // ✅ Show toast message once before fetching new data
        toast.success("Item removed from cart successfully!");

        // ✅ Update cart optimistically
        setCartDataS((prevCart) => prevCart.filter((item) => item._id !== id));

        // ✅ Fetch new data after a delay
        setTimeout(() => {
          fetchDataFromApi(`/api/cart`).then((res) => {
            setCartDataS(res);
            setLoaing(false);
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Failed to remove item. Please try again!");
        setLoaing(false);
      });
  };

  // const selectedItem = (item) => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   cartFields.productTitle = item?.name;
  //   cartFields.images = item?.images[0];
  //   cartFields.rating = item?.rating;
  //   cartFields.price = item?.price;
  //   cartFields.quantity = item?.quantity;
  //   cartFields.subTotal = item?.currentPrice;
  //   cartFields.productId = item?._id;
  //   cartFields.userId = user?.id;
  //   cartFields.size = item?.size;

  //   editData(`/api/cart/${item?._id}`, cartFields).then((res) => {});
  // };
  const selectedItem = (item) => {
    setLoaing(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please log in to update your cart!", { autoClose: 3000 });
      setLoaing(false);
      return;
    }

    const updatedCartItem = {
      productTitle: item?.name,
      rating: item?.rating,
      price: item?.price,
      quantity: item?.quantity,
      subTotal: item?.price * item?.quantity, // Ensure updated subtotal
      productId: item?._id,
      userId: user?.id,
      size: item?.size,
    };

    editData(`/api/cart/${item?._id}`, updatedCartItem).then(() => {
      console.log("Cart updated successfully!");

      setTimeout(() => {
        setLoaing(false);

        // Fetch updated cart data from API
        fetchDataFromApi(`/api/cart`).then((cartDataS) => {
          // Save the cart data in localStorage
          localStorage.setItem("cart", JSON.stringify(cartDataS));

          // Update the state with the new cart data
          setCartDataS(cartDataS);
        });
      }, 1000);
    });
  };

  // Function to load cart from localStorage or API
  const loadCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.removeItem("cart");
      setCartDataS([]); // ✅ Clear state properly
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (savedCart && savedCart.length > 0) {
      setCartDataS(savedCart);
    } else {
      fetchDataFromApi(`/api/cart?userId=${user?._id}`).then((cartDataS) => {
        localStorage.setItem("cart", JSON.stringify(cartDataS));
        setCartDataS(cartDataS);
      });
    }
  };

  // Call loadCart when the component mounts
  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
  const newSubtotal = calculateSubtotal();
  setSubtotal(newSubtotal);
}, [cartDataS]); // make sure cartDataS is the correct cart state


 const calculateSubtotal = () => {
  if (!Array.isArray(cartDataS) || cartDataS.length === 0) {
    return "0.00";
  }

  return cartDataS
    .reduce((total, item) => total + (item.subTotal || 0), 0)
    .toFixed(2);
};


  const checkout = async () => {
    console.log("Checkout function triggered!"); // Debugging

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    const cartProducts = cartDataS.map((product) => ({
      productTitle: product?.productTitle,
      images: product?.images,
      price: parseFloat((product?.subTotal / product?.quantity).toFixed(2)),
      quantity: product?.quantity,
    }));

    console.log("Cart Products:", cartProducts); // Debugging

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      console.error("User data not found in localStorage.");
      return;
    }

    const body = {
      products: cartProducts,
      userId: userData?._id,
    };

    console.log("Sending request to checkout API...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const responseBody = await response.json();
      console.log("Response received:", responseBody); // Debugging

      if (!response.ok || !responseBody.id) {
        throw new Error("Failed to create checkout session");
      }

      const session = responseBody;
      console.log("Stripe Session:", session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log(result);

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="section cartPage">
        <div className="container">
          <h2 className="hd mb-0 ml-5">Your Cart</h2>
          <p className=" ml-5">
            There are <b className="text-red">{cartDataS?.length}</b> products in
            your cart
          </p>
          <div className="row">
            <div className="col-md-8 pr-5">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th width="15%">Unit Price</th>
                      <th width="15%">Quantity</th>
                      <th width="15%">SubTotal</th>
                      <th width="15%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDataS?.length > 0 ? (
                      cartDataS.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={`/product/${item?.productId}`}>
                              <div className="d-flex align-items-center cartItemImgWrapper">
                                <div className="imgWrapper">
                                  <img
                                    src={item?.images}
                                    alt=""
                                    className="w-100"
                                    style={{ height: "100px", width: "100px" }}
                                  />
                                </div>
                                <div
                                  className="info px-3"
                                  style={{ color: "#722222" }}
                                >
                                  <h6 className="product-name">
                                    {item?.productTitle?.substr(0, 26) + "..."}
                                  </h6>
                                  <h6 className="product-name">
                                    ({item.size})
                                  </h6>
                                  <Rating
                                    name="read-only"
                                    value={item.rating}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                  />
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td>${(item.subTotal / item.quantity).toFixed(2)}</td>
                          <td>
                            <QuantityBox
                              inputVal={item.quantity}
                              setInputVal={(newQty) =>
                                updateQuantity(item._id, newQty)
                              }
                              productId={item._id}
                            />
                          </td>
                          <td>${item.subTotal.toFixed(2)}</td>
                          <td className="d-flex align-items-inline">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeItem(item?._id)}
                            >
                              <MdDelete /> &nbsp;Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div className="empty-cart">
                            <img
                              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp"
                              alt="Empty Cart"
                              className="empty-cart-img"
                            />
                            <h4>Your Cart is Empty</h4>
                            <p>Looks like you haven't added anything yet.</p>
                            <Link to="/" className="btn btn-primary">
                              Go Shopping
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="card shadow-lg p-4 cartDetails">
                <h4 className="cart-header mb-4">CART TOTALS</h4>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>SubTotal</span>
                  <span className="amount text-success">
                    ${subtotal}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Shipping</span>
                  <span className="text-muted font-weight-bold">
                    {subtotal > 500 ? "Free" : `$${20}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Estimate For</span>
                  <span className="font-weight-bold">Colombo</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Total</span>
                  <span className="amount text-danger font-weight-bold">
                    $
                    {Number(subtotal) +
                      Number(subtotal > 500 ? 0 : 20)}
                    .00
                  </span>
                </div>

                <button
                  className="btn btn-primary btn-block btn-lg checkout-btn mt-3"
                  onClick={checkout}
                >
                  <IoBagCheckOutline /> &nbsp; Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading === true && <div className="loading"></div>}
    </>
  );
};

export default Cart;
