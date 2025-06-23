import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchDataFromApi, postData } from "../utils/Api";
import { toast } from "react-toastify";

const Mycontext = createContext();

const MyProvider = ({ children }) => {
  const [countrList, setCountrList] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [isOpenProductModel, setisOpenProductModel] = useState({ id: "", open: false });
  const [isLogin, setisLogin] = useState(false);
  const [productData, setProductData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [addingCart, setaddingCart] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", Id: "" });
  const [cartdata, setcartdata] = useState();

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res.categoryList);
    });
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setisLogin(true);
      setUser(userData);
    } else {
      setisLogin(false);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      fetchDataFromApi(`/api/cart?userId=${user._id}`).then(setcartdata);
    }
  }, []);

  useEffect(() => {
    isOpenProductModel.open &&
      fetchDataFromApi(`/api/products/${isOpenProductModel._id}`)
        .then(setProductData)
        .catch(console.error);
  }, [isOpenProductModel]);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then(res => {
      setCountrList(res.data.data[196]?.cities || []);
    });
  }, []);

  const addtoCart = (data) => {
    setaddingCart(true);
    postData(`/api/cart/add`, data).then((res) => {
      if (res) {
        toast.success("🛒 Item added to cart successfully!");
      } else {
        toast.error("❌ Failed to add item to cart!");
      }
    });
  };

  return (
    <Mycontext.Provider value={{
      countrList,
      selectCity,
      setSelectCity,
      isOpenProductModel,
      setisOpenProductModel,
      isLogin,
      setisLogin,
      categoryData,
      user,
      setUser,
      addtoCart,
      cartData,
      addingCart,
      setaddingCart,
      cartdata,
      setcartdata
    }}>
      {children}
    </Mycontext.Provider>
  );
};

export { Mycontext, MyProvider };
