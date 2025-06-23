import React, { useContext, useEffect, useRef, useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import LoadingBar from "react-top-loading-bar";
import DOMPurify from "dompurify";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import { Button, Checkbox, LinearProgress } from "@mui/material";
import { FaCloudArrowUp } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataFromApi, postData } from "../../utils/Api";
import { Mycontext } from "../../context/MyContext";
import {} from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails = () => {
  const [typeVal, setTypeVal] = useState("");
  const [featuredVal, setFeaturedVal] = useState(null);
  const [productImagesArr, setproductImages] = useState([]);
  const productImages = useRef();
  const loadingBarRef = useRef("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabel, setIsDisable] = useState(true);

  const [catData, setCatData] = useState([]);
  const imagesArr = [];

  const context = useContext(Mycontext);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    category: "",
    catName: "",
    type: "",
    price: 0,
    oldPrice: 0,
    isFeatured: false,
    countInStock: "",
    discount: "",
    size: "",
    rating: 0,
    images: [],
  });

  const handleChangeType = (event) => {
    setTypeVal(event.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      type: event.target.value,
    }));
  };

  const handleChangeFeatured = (event) => {
    const value = event.target.value;
    setFeaturedVal(value);
    setFormFields((prevFields) => ({
      ...prevFields,
      isFeatured: value === "true", // Convert to boolean
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const validateForm = () => {
    // Basic checks for empty fields
    if (
      !formFields.name ||
      !formFields.description ||
      !productImagesArr.length
    ) {
      toast.error("Please fill all the required fields!");
      return false;
    }

    // Check for malicious inputs (basic example for script tags)
    const regex = /<script.*?>.*?<\/script>/gi;
    if (regex.test(formFields.name) || regex.test(formFields.description)) {
      toast.error("Invalid characters detected in the input!");
      return false;
    }

    return true;
  };

  const handleRatingChange = (event, newValue) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      rating: newValue,
    }));
  };
  const handleCategoryChange = (event) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      category: event.target.value,
    }));
  };
  const handleSizeChange = (event) => {
    const value = event.target.value; // Get selected values

    setFormFields((prev) => ({
      ...prev,
      size: typeof value === "string" ? value.split(",") : value, // Ensure array format
    }));
  };

  const addProductImage = () => {
    const image = productImages.current.value;
    if (image && isValidImageUrl(image)) {
      setFormFields((prevFields) => ({
        ...prevFields,
        images: [...prevFields.images, image],
      }));

      setproductImages((prevImages) => [...prevImages, image]);

      productImages.current.value = "";
      toast.success("Image added successfully!");
    } else {
      toast.warning("Please enter a valid image URL");
    }
  };

  const isValidImageUrl = (url) => {
    return /^(ftp|http|https):\/\/[^ "]+(\.(jpg|jpeg|png|gif|bmp|webp))$/.test(
      url
    );
  };
  const navigate = useNavigate();

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);

    loadingBarRef.current.continuousStart();

    fetchDataFromApi("/api/category")
      .then((res) => {
        if (res) {
          setCatData(res);
        }
      })
      .finally(() => {
        // Complete loading
        loadingBarRef.current.complete();
      });
  }, [context]);

  useEffect(() => {
    fetchDataFromApi(`/api/products`).then((res) => {
      setFormFields((prev) => ({
        ...prev,
        size: res.size || [], // Default to an empty array if undefined
      }));
    });
  }, []);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    formFields.images = productImagesArr;

    setIsLoading(true);
    loadingBarRef.current.continuousStart();
    setProgress(50);

    try {
      const res = await postData("/api/products/create", formFields);
      if (res) {
        toast.success("Product added successfully!");
        setProgress(100);
        loadingBarRef.current.complete();
        navigate("/product/list");
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error while adding product:", error);
    } finally {
      setProgress(100);
      loadingBarRef.current.complete();
      setIsLoading(false);
    }
  };
  const selectcat = (cat) => {
    formFields.catName = cat;
  };
  return (
    <>
      <LoadingBar
        color="#3446eb"
        height={"4px"}
        ref={loadingBarRef}
        progress={progress}
      />
      <ToastContainer position="bottom-right" autoClose={3000} />
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1201, // Higher than most UI elements
          }}
        >
          <LinearProgress />
        </Box>
      )}
      <div className="right-contentt w-100">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="cardd shadow border-0 w-100"
        >
          <h5 className="m-3 p-2">Food Item Upload</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Products"
              component="a"
              href="/product/details"
            />
            <StyledBreadcrumb label="Food Item Upload" />
          </Breadcrumbs>
        </Box>

        <form className="form mt-4 formform" onSubmit={addProduct}>
          <div className="row ml-3">
            <div className="col-md-9 ml-3">
              <div className="card p-4 mt-0">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group">
                  <h6>Food-Item Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={formFields.name}
                    onChange={handleInputChange}
                    placeholder="Enter food item name"
                  />
                </div>

                <div className="form-group">
                  <h6>Description</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    value={formFields.description}
                    onChange={handleInputChange}
                    placeholder="Enter food item description"
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Category</h6>
                      <Select
                        value={formFields.category}
                        onChange={handleCategoryChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {catData.length !== 0 &&
                          catData?.map((cat, index) => {
                            return (
                              <MenuItem
                                value={cat.id}
                                key={index}
                                onClick={() => selectcat(cat.name)}
                              >
                                {cat.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Type</h6>
                      <Select
                        value={typeVal}
                        onChange={handleChangeType}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Non-Vegetarian">
                          Non-Vegetarian
                        </MenuItem>
                        <MenuItem value="Vegan">Vegan</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Regular Price</h6>
                      <input
                        type="text"
                        name="price"
                        value={formFields.price}
                        onChange={handleInputChange}
                        placeholder="Enter regular price"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Old Price (if any)</h6>
                      <input
                        type="text"
                        name="oldPrice"
                        value={formFields.oldPrice}
                        onChange={handleInputChange}
                        placeholder="Enter old price"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Featured</h6>
                      <Select
                        value={featuredVal}
                        onChange={handleChangeFeatured}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Product Stock</h6>
                      <input
                        type="text"
                        name="countInStock"
                        value={formFields.countInStock}
                        onChange={handleInputChange}
                        placeholder="Enter Availability"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>Discount (%)</h6>
                      <input
                        type="text"
                        name="discount"
                        value={formFields.discount}
                        onChange={handleInputChange}
                        placeholder="Enter discount percentage"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>Size</h6>
                      <Select
                        multiple
                        value={
                          formFields.size.length > 0 ? formFields.size : []
                        } // Default empty array
                        onChange={handleSizeChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Select sizes" }}
                        className="w-100"
                        renderValue={
                          (selected) =>
                            selected.length === 0 ? "None" : selected.join(", ") // Show "None" if empty
                        }
                      >
                        <MenuItem value="None" disabled>
                          <em>None</em>
                        </MenuItem>

                        {["Small", "Medium", "Large", "Supreme"].map((size) => (
                          <MenuItem key={size} value={size}>
                            <Checkbox
                              checked={formFields.size.includes(size)}
                            />
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col-md-3 ml-3">
                    <div className="form-group mt-3 ml-3">
                      <h6>Rating</h6>
                      <Rating
                        name="rating"
                        value={formFields.rating}
                        onChange={handleRatingChange}
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div className="form-group">
                      <h6 className="text-uppercase">Product Images</h6>
                      <div className="position-relative inputBtn">
                        <input
                          ref={productImages}
                          type="text"
                          style={{ paddingRight: "100px" }}
                          placeholder="Enter image URL"
                        />
                        <Button className="btn-blue" onClick={addProductImage}>
                          ADD
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="btn-blue btn-lg btn-big"
                  variant="contained"
                  disabled={isLoading}
                >
                  <FaCloudArrowUp /> &nbsp;
                  {isLoading ? (
                    <CircularProgress size={24} color="#ffffff" />
                  ) : (
                    "Publish and View"
                  )}
                </Button>
              </div>
            </div>

            <div className="col-md-3">
              <div className="stickybox">
                {productImagesArr?.length !== 0 && (
                  <h4 className="mt-3 mb-3" style={{ fontWeight: "700" }}>
                    Product Images
                  </h4>
                )}

                <div className="imgGrid d-flex">
                  {productImagesArr?.length !== 0 &&
                    productImagesArr?.map((item, index) => {
                      return (
                        <div className="img">
                          <img src={item} alt="" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductDetails;
