import { Link } from "react-router-dom";
import logo from "../../assets/images/images.png";
import CountryDropdown from "../CountryDropdown";
import { IoIosSearch } from "react-icons/io";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useContext } from "react";
import { Mycontext } from "../../App";

const Header = () => {
  const context = useContext(Mycontext);
  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Get <b>free delivery</b> on orders over <b>$100</b>
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
                {context.countryList.length !== 0 && <CountryDropdown />}

                <SearchBox />

                <div className="part3 d-flex align-items-center ml-6">
                  {context.isLogin !== true ? (
                    <Link to="/SignIn">
                      <Button className="btn-blue btn-round ml-4 mr-2">
                        Sign In
                      </Button>
                    </Link>
                  ) : (
                    <Button className="circle mr-3 ml-5">
                      <FiUser />
                    </Button>
                  )}

                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">$3.29</span>
                    <div className="position-relative ml-2">
                      <Link to="/Cart">
                        <Button className="circle ml-2">
                          <BsCart3 />
                        </Button>
                      </Link>
                      <span className="count  d-flex align-items-center justify-content-center">
                        1
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
