import { Button } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "swiper/css";
import "swiper/css/navigation";
import { TfiFullscreen } from "react-icons/tfi";
import { Rating } from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductModel from "../ProductModal";
import { Link } from "react-router-dom";
import { Mycontext } from "../../context/MyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataFromApi, postData } from "../../utils/Api";

const ProductItem = (props) => {
  const { setisOpenProductModel, isOpenProductModal } = useContext(Mycontext);
  const viewProductDetails = (_id) => {
    setisOpenProductModel({ _id: _id, open: true }); // Correct function call
  };

  const closeProductModel = () => {
    setisOpenProductModel({ id: "", open: false });
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToMyList = useCallback(async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please log in to add items to your wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "login-toast", // Unique toastId to prevent duplicates
      });
      return;
    }

    try {
      const myListData = await fetchDataFromApi("/api/myList/");

      const isAlreadyInWishlist = myListData.some(
        (item) => item.productId === id
      );

      if (isAlreadyInWishlist) {
        toast.info("This item is already in your wishlist! ❤️", {
          position: "bottom-right",
          autoClose: 3000,
          toastId: "wishlist-toast", // Unique toastId to prevent duplicates
        });

        return;
      }

      const data = {
        productTitle: props.item?.name,
        images: props.item?.images[0],
        rating: Number(props.item?.rating),
        price: props.item?.price,
        productId: id,
        userId: user?._id,
      };

      const res = await postData("/api/myList/add/", data);

      if (res) {
        toast.success("Item added to wishlist! ❤️", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
          toastId: "success-toast", // Unique toastId to prevent duplicates
        });
      } else {
        toast.error("Failed to add item. Try again!", {
          position: "bottom-right",
          autoClose: 3000,
          toastId: "error-toast", // Unique toastId to prevent duplicates
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 3000,
        toastId: "error-toast", // Unique toastId to prevent duplicates
      });
    } finally {
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className={`item productItem ${props.itemView}`}>
        <div className="imgWrapper" style={{ position: "relative", zIndex: 1 }}>
          <img
            src={props.item?.images[0]}
            alt="Product"
            className="w-100"
            style={{ objectFit: "cover", display: "block" }}
          />
          <span
            className="badge badge-primary"
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            {props.item?.discount}%
          </span>
          <div
            className="actions"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <Button onClick={() => viewProductDetails(props.item?._id)}>
              <TfiFullscreen />
            </Button>
            <Button onClick={() => addToMyList(props.item?._id)}>
              <IoMdHeartEmpty style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </div>
        <Link to={`/product/${props.item?._id}`} onClick={handleLinkClick}>
          <div className="info">
            <h3 style={{ fontSize: 20, textAlign: "left" }}>
              {props.item?.name?.substr(0, 22) + "..."}
            </h3>
            <h4>{props.item?.description?.substr(0, 80) + "..."}</h4>
            <span className="text-success d-block">
              {props.item?.countInStock}
            </span>
            <Rating
              name="read-only"
              value={Number(props.item?.rating)}
              readOnly
              size="small"
              precision={0.5}
              className="rating mt-2 mb-2"
            />
            <div className="d-flex txt">
              <span className="oldPrice">${props.item?.price}</span>
              <span className="netPrice text-danger ml-2">
                ${props.item?.oldPrice}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {isOpenProductModal && (
        <ProductModel closeProductModel={closeProductModel} />
      )}
    </>
  );
};

export default ProductItem;
