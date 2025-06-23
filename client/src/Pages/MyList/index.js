import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { MdDelete } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QuantityBox from "../../Components/QuantityDropDown"; // Not used here — can remove
import { Mycontext } from "../../context/MyContext";
import { deleteData, fetchDataFromApi } from "../../utils/Api";

const MyList = () => {
  const [loading, setLoading] = useState(true);
  const [myListData, setMyListData] = useState([]);
  const { user } = useContext(Mycontext);

  useEffect(() => {
    const fetchMyList = async () => {
      if (!user?._id) return;
      try {
        const res = await fetchDataFromApi(`/api/myList?userId=${user._id}`);
        setMyListData(res || []);
      } catch (err) {
        console.error("Failed to fetch my list:", err);
        toast.error("Unable to load wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [user]);

  const removeItem = async (id) => {
    setLoading(true);
    try {
      await deleteData(`/api/myList/${id}`);
      toast.success("Item removed from wishlist!");

      setMyListData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="wishlist-section">
        <div className="container">
          <h2 className="wishlist-title">My Wishlist ❤️</h2>
          <p className="wishlist-subtitle">
            You have <b>{myListData?.length}</b> items in your wishlist
          </p>

          <div className="wishlist-grid">
            {loading ? (
              <p>Loading...</p>
            ) : myListData?.length > 0 ? (
              myListData.map((item) => (
                <div className="wishlist-card" key={item._id}>
                  <Link to={`/product/${item?.productId}`} className="wishlist-link">
                    <div className="wishlist-image-container">
                      <img
                        src={item?.images}
                        alt={item?.productTitle}
                        className="wishlist-image"
                      />
                    </div>
                    <div className="wishlist-info">
                      <h6 className="wishlist-product-title">
                        {item?.productTitle?.length > 26
                          ? item.productTitle.slice(0, 26) + "..."
                          : item.productTitle}
                      </h6>
                      <p className="wishlist-price">${item?.price.toFixed(2)}</p>
                      <Rating
                        name="read-only"
                        value={item.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </div>
                  </Link>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => removeItem(item?._id)}
                  >
                    <MdDelete size={20} /> Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-wishlist">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12635/12635513.png"
                  alt="Empty Wishlist"
                  className="empty-wishlist-img"
                />
                <h4>Your Wishlist is Empty</h4>
                <p>Save items you love and buy them later.</p>
                <Link to="/" className="wishlist-shop-btn btn btn-primary">
                  Go Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyList;
