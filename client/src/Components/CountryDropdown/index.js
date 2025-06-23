import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Mycontext } from "../../context/MyContext";

// Slide transition for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Debounce utility
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [cityList, setCityList] = useState([]);

  const { countrList, setSelectCity, selectCity } = useContext(Mycontext);

  useEffect(() => {
    // Set full city list on initial load
    setCityList(countrList || []);
  }, [countrList]);

  const handleSelectCity = (index, city) => {
    setSelectedTab(index);
    setSelectCity(city);
    setIsOpenModal(false);
  };

  const filterList = debounce((e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword) {
      const filtered = countrList.filter((city) =>
        city.toLowerCase().includes(keyword)
      );
      setCityList(filtered);
    } else {
      setCityList(countrList);
    }
  }, 300);

  return (
    <>
      <Button className="countryDrop" onClick={() => setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">
            {selectCity
              ? selectCity.length > 15
                ? selectCity.substr(0, 15) + "..."
                : selectCity
              : "Select City"}
          </span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="locationModel"
        TransitionComponent={Transition}
      >
        <div className="modal-header">
          <h4>Choose Your Delivery Location</h4>
          <p>Enter your address and we will specify the offer for your area.</p>
          <Button className="close" onClick={() => setIsOpenModal(false)}>
            <IoMdClose />
          </Button>
        </div>

        <div className="headerSearch w-100">
          <input
            type="text"
            placeholder="Search your area"
            onChange={filterList}
          />
          <Button>
            <IoIosSearch />
          </Button>
        </div>

        <ul className="countryList mt-3">
          {cityList.length > 0 ? (
            cityList.map((city, index) => (
              <li key={index}>
                <Button
                  onClick={() => handleSelectCity(index, city)}
                  className={selectedTab === index ? "active" : ""}
                >
                  {city}
                </Button>
              </li>
            ))
          ) : (
            <li>No cities available</li>
          )}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
