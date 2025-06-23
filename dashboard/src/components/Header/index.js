import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/images/906343.png";
import logo2 from "../../assets/images/thumbnail.png";
import Button from "@mui/material/Button";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import Search from "../search";
import { MdLightMode } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { FaShieldAlt } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import { Mycontext } from "../../context/MyContext";
import UserAvatar from "../UserAvatar";
import { IoMenu } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const context = useContext(Mycontext);
  const navigate = useNavigate();

  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const openAccountMenu = Boolean(accountAnchorEl);

  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const openNotifyMenu = Boolean(notifyAnchorEl);

  const handleOpenAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAccountAnchorEl(null);
  };

  const handleOpenNotifyMenu = (event) => {
    setNotifyAnchorEl(event.currentTarget);
  };
  const handleCloseNotifyMenu = () => {
    setNotifyAnchorEl(null);
  };

  const handleViewAllNotifications = () => {
    handleCloseNotifyMenu();
    navigate("/notifications");
  };
  const logout = () => {
    localStorage.clear();
    setAccountAnchorEl(null);
    context.setAlertBox({}); // Assuming this is used for alerts

    toast.info("👋 Logged out successfully. See you soon! 💨", {
      theme: "colored",
      position: "bottom-left",
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <header className="main-header d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            <div className="col-md-3 part1">
              <Link
                to={"/"}
                className="d-flex align-items-center logo flex-row"
              >
                <img src={logo1} alt="" className="logo-img" />
                <span className="ml-2">Dashboard</span>
              </Link>
            </div>
            {context.windowWidth > 992 && (
              <div className="col-md-4 d-flex align-items-center part2 res-hide">
                <Button
                  className="rounded-circle"
                  onClick={() => context.setisSidebar(!context.isSidebar)}
                >
                  {context.isSidebar === false ? (
                    <MdMenuOpen />
                  ) : (
                    <MdOutlineMenu />
                  )}
                </Button>
                <Search />
              </div>
            )}

            <div className="col-md-5 d-flex align-items-center justify-content-end part3">
              <Button
                className="rounded-circle mr-1"
                onClick={() => context.setThemeMode(!context.themeMode)}
              >
                <MdLightMode />
              </Button>
              <Button className="rounded-circle mr-1">
                <IoMdCart />
              </Button>
              <Button className="rounded-circle mr-1">
                <MdEmail />
              </Button>
              <Button
                className="rounded-circle mr-2"
                onClick={handleOpenNotifyMenu}
              >
                <FaBell />
              </Button>

              <Button
                className="rounded-circle mr-2"
                onClick={() => {
                  context.openNav();
                }}
              >
                <IoMenu />
              </Button>

              <Menu
                anchorEl={notifyAnchorEl}
                className="notifications dropdown_list"
                open={openNotifyMenu}
                onClose={handleCloseNotifyMenu}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                PaperProps={{
                  style: {
                    marginTop: "15px",
                    marginLeft: "8px",
                    minWidth: "270px",
                    maxHeight: "390px",
                    overflow: "hidden",
                  },
                }}
              >
                <div
                  className="notification-header"
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                    padding: "7 px",
                  }}
                >
                  <h5>Notifications (34)</h5>
                </div>
                <Divider style={{ backgroundColor: "black", height: "1px" }} />
                <div
                  className="notification-content"
                  style={{
                    maxHeight: "320px",
                    overflowY: "auto",
                  }}
                >
                  {/* Notification Items */}
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <UserAvatar img={"logo2"} />

                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img
                            src={logo2}
                            alt=""
                            style={{ height: "37px", width: "37px" }}
                          />
                        </span>
                      </div>
                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img
                            src={logo2}
                            alt=""
                            style={{ height: "37px", width: "37px" }}
                          />
                        </span>
                      </div>
                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img
                            src={logo2}
                            alt=""
                            style={{ height: "37px", width: "37px" }}
                          />
                        </span>
                      </div>
                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img
                            src={logo2}
                            alt=""
                            style={{ height: "37px", width: "37px" }}
                          />
                        </span>
                      </div>
                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNotifyMenu}>
                    <div className="d-flex align-items-center">
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img
                            src={logo2}
                            alt=""
                            style={{ height: "37px", width: "37px" }}
                          />
                        </span>
                      </div>
                      <div
                        className="dropdownInfo ml-1"
                        style={{ marginLeft: "8px" }}
                      >
                        <h6>
                          <span>
                            <b>Dasun</b> added to his favourite List{" "}
                            <b>Classic Margherita Pizza.</b>
                          </span>
                        </h6>
                        <p className="text-skt mb-0 ml-2">few seconds ago</p>
                      </div>
                    </div>
                  </MenuItem>
                  {/* Add more MenuItems as needed */}
                </div>
                <Button
                  className="btn-blue w-100 pt-2 pb-2"
                  onClick={handleViewAllNotifications}
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                    textTransform: "capitalize",
                    borderRadius: "5px",
                  }}
                >
                  View all notifications
                </Button>
              </Menu>
              {context.isLogin !== true ? (
                <Link to={"/login"}>
                  {" "}
                  <Button className="btn-blue btn-lg btn-round ">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <div className="myAccWrapper">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handleOpenAccountMenu}
                  >
                    <div className="userImg">
                      <span className="rounded-circle">
                        {context.user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="userInfo res-hide">
                      <h6>{context.user?.name} </h6>
                      <p className="mb-0">{context.user?.email}</p>
                    </div>
                  </Button>
                </div>
              )}

              <Menu
                anchorEl={accountAnchorEl}
                open={openAccountMenu}
                onClose={handleCloseAccountMenu}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                PaperProps={{
                  style: {
                    marginTop: "10px",
                    marginLeft: "5px",
                  },
                }}
              >
                <MenuItem onClick={handleCloseAccountMenu}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                <MenuItem onClick={handleCloseAccountMenu}>
                  <ListItemIcon>
                    <FaShieldAlt />
                  </ListItemIcon>
                  Reset Password
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
