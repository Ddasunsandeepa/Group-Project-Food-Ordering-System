import React, { PureComponent, useContext, useEffect } from "react";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Box from "./components/Box";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { GiStarsStack } from "react-icons/gi";
import { Button, Menu, MenuItem } from "@mui/material";
import { Chart } from "react-google-charts";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaPencil } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Mycontext } from "../../context/MyContext";
import { Link } from "react-router-dom";

export const chartData = [
  ["Category", "Amount"],
  ["2021", 4000],
  ["2022", 2000],
  ["2023", 2500],
  ["2024", 2500],
];

export const chartOptions = {
  title: "Anual sale",
  pieHole: 0.5, // Donut style
  is3D: false,
  colors: ["#ff6b6b", "#f8c372", "#4ecdc4", "#1feec9"],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "#fff",
      fontSize: 14,
    },
  },
  pieSliceTextStyle: {
    color: "#fff",
  },
  backgroundColor: "transparent",
  animation: {
    startup: true,
    easing: "inAndOut",
    duration: 1000, // Duration of animation in milliseconds
  },
  tooltip: {
    textStyle: {
      color: "#000",
      fontSize: 14,
    },
    showColorCode: true,
  },
  chartArea: { width: "90%", height: "80%" },
};
const itemsPerPage = 5; // Number of items per page
const Home = () => {
  const demoUrl = "https://codesandbox.io/p/sandbox/tiny-area-chart-gq23nh";

  const [showBy, setshowBy] = React.useState("");
  const [catBy, setCatBy] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const menuOptions = ["Last Day", "Last Week", "Last Month", "Last Year"];
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(Mycontext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event) => {
    setshowBy(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const data = [
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    {
      uid: "001",
      product: "Margherita Pizza...",
      category: "Pizza",
      type: "Vegetarian",
      price: "$12.99",
      stock: 20,
      rating: "4.5(16)",
      order: 50,
      sales: "$49.50",
      imgSrc:
        "https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg",
    },
    // Add more products here
  ];
  const filteredData = data.filter((item) => {
    let isValid = true;

    // Filter by 'showBy' value
    if (showBy && item.someProperty !== showBy) {
      isValid = false;
    }

    // Filter by 'catBy' value
    if (catBy && item.category !== catBy) {
      isValid = false;
    }

    return isValid;
  });

  const paginatedFilteredData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const information = [
    { name: "Day 1", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Day 2", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Day 3", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Day 4", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Day 5", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Day 6", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Day 7", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="right-content ">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex flex-wrap">
            <Box
              color={["#1da256", "#48d483"]}
              icon={<FaUserCircle />}
              grow={true}
            />
            <Box color={["#c012e2", "#eb64fe"]} icon={<FaCartShopping />} />
            <Box color={["#2c78e5", "#60aff5"]} icon={<IoBagHandleSharp />} />
            <Box color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
          </div>
        </div>
        <div className="col-md-4 pl-0 topPart2">
          <div
            className="box graphBox"
            style={{
              backgroundImage: "linear-gradient(#1a50b5, #2a6ff7)",
              borderRadius: "10px",
              padding: "25px",
              position: "relative",
              overflow: "hidden",
              height: "390px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
            }}
          >
            <div className="d-flex align-items-center w-100">
              <h6
                className="text-white mb-0 mt-0"
                style={{ fontSize: "24px", fontWeight: "550" }}
              >
                Order Statistics
              </h6>
              <Button
                className="ml-auto toggleicon"
                onClick={handleClick}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "26px",
                  color: "#fff",
                  minWidth: "auto",
                }}
              >
                <HiDotsVertical />
              </Button>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {menuOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={handleClose}
                    style={{ fontSize: "16px" }}
                  >
                    <IoIosTimer
                      style={{
                        marginRight: "10px",
                        fontSize: "22px",
                      }}
                    />{" "}
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <h3 className="text-white font-weight-bold mt-2">$3,787,681.00</h3>
            <p className="text-white">$3,000.00 in last month</p>

            <div style={{ width: "100%", height: "240px", overflow: "hidden" }}>
              <Chart
                chartType="PieChart"
                data={chartData}
                options={chartOptions}
                width={"100%"}
                height="220px"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Best Selling Products</h3>

        {/* //there is an issue */}
        <div className="row cardFilters mt-3">
          <div className="col-md-3 ">
            <h4 style={{ fontSize: "17px" }}>SHOW BY</h4>
            <FormControl size="small" className="w-100">
              <Select
                value={showBy}
                onChange={(e) => setshowBy(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                labelId="demo-simple-select-label"
                className="w-100"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3 ">
            <h4 style={{ fontSize: "17px" }}>CATEGORY BY</h4>
            <FormControl size="small" className="w-100">
              <Select
                value={catBy}
                onChange={(e) => setCatBy(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                labelId="demo-simple-select-label"
                className="w-100"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered align-items-center v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th style={{ width: "300px" }}>PRODUCT</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ORDER</th>
                <th>SALES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.uid}>
                  <td>{item.uid}</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img src={item.imgSrc} alt="" className="w-100" />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>{item.product}</h6>
                        <p>Product description here.</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.rating}</td>
                  <td>{item.order}</td>
                  <td>{item.sales}</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button color="secondary">
                        <FaPencil />
                      </Button>
                      <Link to="/product/details">
                        <Button color="success">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex tableFooter">
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
              className="pagination"
            />
          </div>
        </div>
      </div>
      <div className="card shadow mt-3">
        <div
          style={{
            background: "#1a50b5",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#fff", textAlign: "center" }}>
            Orders and Revenue
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={information}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#48d483" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#48d483" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" stroke="#ffffff" tick={{ fontSize: 12 }} />
              <YAxis stroke="#ffffff" tick={{ fontSize: 12 }} />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#a9a9a9"
                opacity={0.3}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  borderRadius: "5px",
                  color: "#fff",
                  fontSize: "14px",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />

              <Area
                type="monotone"
                dataKey="uv"
                stroke="#ff6b6b"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={3}
                animationDuration={2000}
                dot={{ stroke: "#ff6b6b", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#48d483"
                fillOpacity={1}
                fill="url(#colorPv)"
                strokeWidth={3}
                animationDuration={2000}
                dot={{ stroke: "#48d483", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
