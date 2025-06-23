import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/images.png";
import CountryDropdown from "../CountryDropdown";
import { IoIosSearch } from "react-icons/io";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import SearchBox from "./SearchBox";
import Avatar from "@mui/material/Avatar";
import Navigation from "./Navigation";
import { useContext, useEffect, useState, useMemo } from "react";
import { Mycontext } from "../../context/MyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { FaShieldAlt } from "react-icons/fa";
import { Logout, PersonAdd } from "@mui/icons-material";
import { FaHeart } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/Api";
import { AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  const [mylistdata, setmylistdata] = useState([]);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const { cartdata, isLogin, user, countrList } = useContext(Mycontext);
  const navigate = useNavigate();
  const handleAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAccountAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("user"); // Remove user from local storage
    window.location.reload(); // Refresh to apply changes
    // Assuming this is used for alerts

    toast.info("👋 Logged out successfully. See you soon! 💨", {
      theme: "colored",
      position: "bottom-left",
    });
    const handleAccountMenu = (event) => {
      setAccountAnchorEl(event.currentTarget);
    };
    const handleCloseAccountMenu = () => {
      setAccountAnchorEl(null);
    };
    setTimeout(() => {
      navigate("/SignIn");
    }, 2000);
  };

  const calculateSubtotal = () => {
    if (!Array.isArray(cartdata) || cartdata.length === 0) {
      return "0.00"; // ✅ When cart is empty, return "0.00"
    }

    return cartdata
      .reduce((total, item) => total + (item.subTotal || 0), 0)
      .toFixed(2);
  };

 const myListCount = useMemo(() => {
  if (!user || !mylistdata) return 0;
  return mylistdata.filter((item) => item.userId === user._id).length;
}, [user, mylistdata]);

const myCartCount = useMemo(() => {
  return cartdata?.length || 0;
}, [user, cartdata]);

  
  useEffect(() => {
  fetchDataFromApi("/api/myList/").then((res) => {
    setmylistdata(res);
  });
}, []); // ✅ run only once on mount

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Get <b>free delivery</b> on orders over <b>$500</b>
            </p>
          </div>
        </div>

        <header className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                {countrList.length !== 0 && <CountryDropdown />}

                <SearchBox />

                <div className="part3 d-flex align-items-center ml-6 mr-2">
                  {/* {isLogin !== true ? (
                    <Link to="/SignIn">
                      <Button className="btn-blue btn-round ml-4 mr-2">
                        Sign In
                      </Button>
                    </Link>
                  ) : (
                    <Button className="circle mr-3 ml-5">
                      <FiUser />
                    </Button>
                  )} */}

                  {isLogin ? (
                    <div className="myAccWrapper" style={{ marginRight: 20 }}>
                      <Button
                        className="myAcc d-flex align-items-center"
                        onClick={handleAccountMenu}
                      >
                        <div className="userImg">
                          <span className="rounded-circle">
                            {user?.name?.charAt(0)}
                          </span>
                        </div>
                        <div className="userInfo res-hide">
                          <h6>{user?.name}</h6>
                          <p className="mb-0">{user?.email}</p>
                        </div>
                      </Button>
                      <Menu
                        anchorEl={accountAnchorEl}
                        open={Boolean(accountAnchorEl)}
                        onClose={handleCloseAccountMenu}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        PaperProps={{
                          style: { marginTop: "10px", marginLeft: "5px" },
                        }}
                      >
                        <MenuItem onClick={handleCloseAccountMenu}>
                          <Avatar />
                          &nbsp; Profile
                        </MenuItem>
                        <Divider />
                        <Link to="/myList">
                          <MenuItem onClick={handleCloseAccountMenu}>
                            <ListItemIcon>
                              <FaHeart />
                            </ListItemIcon>
                            My List
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleCloseAccountMenu}>
                          <ListItemIcon>
                            <FaList />
                          </ListItemIcon>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={logout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Link to="/SignIn">
                      <Button className="btn-blue btn-round ml-4 mr-1">
                        Sign In
                      </Button>
                    </Link>
                  )}
                  <div className="ml-auto mr-3 cartTab d-flex align-items-center">
                    <div className="position-relative ml-2">
                      <Link to="/myList">
                        <Button className="circle ml-2">
                          <AiOutlineHeart />
                        </Button>
                      </Link>
                      <span className="count d-flex align-items-center justify-content-center">
                        {myListCount}
                      </span>
                    </div>
                  </div>

                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">${calculateSubtotal()}</span>
                    <div className="position-relative ml-2">
                      <Link to="/Cart">
                        <Button className="circle ml-2">
                          <BsCart3 />
                        </Button>
                      </Link>
                      <span className="count  d-flex align-items-center justify-content-center">
                        {myCartCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Navigation />
      </div>
    </>
  );
};

export default Header;
