import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import QuantityBox from "../QuantityDropDown";
import { FaHeart } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import ProductZoom from "../ProductZoom";
import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../context/MyContext";
import { fetchDataFromApi, postData } from "../../utils/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModel = (props) => {
  const { addtoCart } = useContext(Mycontext);
  const [activeSize, setActiveSize] = useState(null); // Track selected size
  const [sizePrice, setSizePrice] = useState(props?.data?.price);
  const [catData, setCatData] = useState([]);
  const content = useContext(Mycontext);
  const [inputVal, setInputVal] = useState(1); // Initialize the quantity as 1
  const [totalPrice, setTotalPrice] = useState(props?.data?.price);
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [cartFields, setCartFields] = useState({});

  useEffect(() => {
    // Ensure props.data is available before accessing its properties
    if (props?.data) {
      setSizePrice(props.data.price);
      setTotalPrice(props.data.price * inputVal);
      setCurrentPrice(props.data.price);
    }
  }, [props?.data, inputVal]); // Ensure useEffect runs when props.data is available

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res) {
        setCatData(res);
      }
    });
  }, []);
  const categoryName =
    props?.data?.category && catData.length > 0
      ? catData.find((cat) => cat._id === props.data.category)?.name ||
        "Unknown Category"
      : "Unknown Category";

  console.log("Category Name:", categoryName);
  useEffect(() => {
    // Update total price whenever quantity or size changes
    if (props?.data) {
      setTotalPrice(sizePrice * inputVal);
    }
  }, [inputVal, sizePrice, props?.data]);

  const sizePriceIncrements = [0, 4, 6, 12];
  // const handleSizeChange = (index) => {
  //   setActiveSize(index);
  //   if (props?.data) {
  //     setCurrentPrice(
  //       (props.data.price + sizePriceIncrements[index]) * quantity
  //     );
  //   }
  // };
  const handleSizeChange = (index) => {
    setActiveSize(index);
    if (props?.data) {
      const newPrice = props.data.price + sizePriceIncrements[index];
      setSizePrice(newPrice); // Set new size-based price
      setCurrentPrice(newPrice * quantity); // Update total price
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (props?.data && activeSize !== null) {
      const newPrice = props.data.price + sizePriceIncrements[activeSize];
      setCurrentPrice(newPrice * newQuantity);
    }
  };
  // const handleAddToCart = () => {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const existingItemIndex = cart.findIndex(
  //     (item) =>
  //       item.id === props?.data?._id &&
  //       item.size === props?.data?.size[activeSize]
  //   );

  //   if (existingItemIndex !== -1) {
  //     // If item exists, update its quantity and total price
  //     cart[existingItemIndex].quantity += quantity;
  //     cart[existingItemIndex].totalPrice =
  //       cart[existingItemIndex].quantity * sizePrice;
  //   } else {
  //     // Add new item
  //     cart.push({
  //       id: props?.data?._id,
  //       name: props?.data?.name,
  //       size: props?.data?.size[activeSize],
  //       price: sizePrice,
  //       totalPrice: currentPrice,
  //       quantity,
  //       image: props?.data?.images[0],
  //     });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };
  const addtoCartfunc = (data) => {
    if (activeSize !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      cartFields.productTitle = props?.data?.name;
      cartFields.images = props?.data?.images[0];
      cartFields.rating = props?.data?.rating;
      cartFields.price = props?.data?.price;
      cartFields.quantity = quantity;
      cartFields.subTotal = currentPrice;
      cartFields.productId = props?.data?._id;
      cartFields.userId = user?.id;
      cartFields.size = props?.data?.size[activeSize];
      console.log("Add to Cart clicked");

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

  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const data = {
  //     productTitle: props?.data?.name,
  //     images: props?.data?.images[0],
  //     rating: Number(props?.data?.rating),
  //     price: currentPrice,
  //     productId: id,
  //     userId: user?._id,
  //   };
  //   console.log(data);
  //   postData(`/api/myList/add/`, data).then((res) => {
  //     alert("success")
  //   });
  // };
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
        productTitle: props?.data?.name,
        images: props?.data?.images[0],
        rating: Number(props?.data?.rating),
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
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Dialog
        open={true}
        onClose={props.closeProductModel}
        disableScrollLock={true}
        className="productModel"
      >
        <Button className="close" onClick={props.closeProductModel}>
          <IoMdClose />
        </Button>
        <h4 className="mb-2 font-weight-bold">
          {props?.data?.name}
          {/* {props?.data?._id}
          {props?.data?.size} */}
        </h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Category:</span>
            <span className="ml-2">
              <b>{categoryName}</b>
            </span>
          </div>
          <Rating
            name="read-only"
            value={Number(props?.data?.rating)}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>
        <hr />
        <div className="row mt-2 productDetaileModel">
          <div className="col-md-5">
            <ProductZoom
              images={props?.data?.images}
              discount={props?.data?.discount}
            />
          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice lg mr-3">${props?.data?.oldPrice}</span>
              <span className="netPrice lg text-danger">
                ${currentPrice}
                {/* Display the dynamically calculated total price */}
              </span>
            </div>
            <span className="badge bg-success">
              {props?.data?.countInStock}
            </span>
            <p className="mt-3">{props?.data?.description}</p>
            <div className="productSize d-flex align-items-center">
              <span>Size</span>
              <ul className="list list-inline mb-0 pl-4">
                {props?.data?.size.map((size, index) => (
                  <li className="list-inline-item" key={index}>
                    <a
                      className={`tag ${activeSize === index ? "active" : ""}`}
                      onClick={() => handleSizeChange(index)}
                    >
                      {size}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <QuantityBox
                inputVal={quantity}
                setInputVal={handleQuantityChange}
              />

              <Button
                className="btn-blue btn-lg btn-big btn-round ml-1"
                onClick={() => addtoCartfunc(props.data)}
              >
                Add to Cart
              </Button>
            </div>
            <div className="d-flex align-items-center mt-5 actions">
              <Button
                className="btn-round btn-sml"
                variant="outlined"
                onClick={() => addToMyList(props.data?._id)}
              >
                <FaHeart /> &nbsp; ADD TO WISHLIST
              </Button>
              <Button className="btn-round btn-sml ml-3" variant="outlined">
                <MdCompareArrows /> &nbsp; COMPARE
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModel;
