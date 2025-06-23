import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaPencil, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { Mycontext } from "../../context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import { deleteData, editData, fetchDataFromApi } from "../../utils/Api";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { FaEdit } from "react-icons/fa"; // Use FaEdit instead of FaPencil
import { FaPen } from "react-icons/fa"; // Use FaPen instead of FaPencil
import LinearProgress from "@mui/material/LinearProgress"; // Import this at the top

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "15px",
    background: "linear-gradient(to bottom right, #f7f9fc, #e0e6ed)",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#3f51b5",
  borderBottom: "1px solid #d1d9e6",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
  "& .MuiInputLabel-root": {
    color: "#707070",
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: "center",
  paddingBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "1rem",
  padding: "10px 20px",
  borderRadius: "20px",
  backgroundColor: "#3279a8",
  color: "#000",
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: "#3279a8",
  },
}));

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

const itemsPerPage = 6;

const CategoryList = () => {
  const [catData, setCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: "",
    color: "",
  });
  const [productList, setproductList] = useState([]);
  const [editId, setEditId] = useState(null);
  const context = useContext(Mycontext);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false); // Controls dialog visibility
  const [deleteId, setDeleteId] = useState(null); // Tracks ID of category to delete
  const openDeleteDialog = (id) => {
    setDeleteId(id); // Set the ID of the category to delete
    setConfirmDelete(true); // Show confirmation dialog
  };
  const closeDeleteDialog = () => {
    setConfirmDelete(false); // Hide confirmation dialog
  };
  // const handleDeleteConfirm = () => {
  //   setIsLoading(true);
  //   deleteData(`/api/category/${deleteId}`)
  //     .then(() => {
  //       setCatData((prevData) =>
  //         prevData.filter((item) => item._id !== deleteId)
  //       );
  //       toast.success("Category deleted successfully!");
  //       setIsLoading(false);
  //       setConfirmDelete(false); // Close confirmation dialog
  //     })
  //     .catch(() => {
  //       toast.error("Failed to delete the category.");
  //       setIsLoading(false);
  //     });
  // };
  const handleDeleteConfirm = async () => {
    setIsLoading(true);

    try {
      // Get all products related to the category
      const relatedProducts = productList.filter(
        (product) => product.category._id === deleteId
      );

      // If products exist, delete them first
      if (relatedProducts.length > 0) {
        await Promise.all(
          relatedProducts.map((product) =>
            deleteData(`/api/products/${product._id}`)
          )
        );
      }

      // Now delete the category
      await deleteData(`/api/category/${deleteId}`);

      // Update the state after deletion
      setCatData((prevData) =>
        prevData.filter((item) => item._id !== deleteId)
      );
      setproductList((prevProducts) =>
        prevProducts.filter((product) => product.category._id !== deleteId)
      );

      toast.success("Category and related products deleted successfully!");
      setConfirmDelete(false); // Close confirmation dialog
    } catch (error) {
      toast.error("Failed to delete category or related products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);

    setIsLoading(true);

    fetchDataFromApi("/api/category").then((res) => {
      if (res) {
        setCatData(res);
        setIsLoading(false); // Hide loading indicator when data is fetched
      }
    });

    fetchDataFromApi("/api/products").then((res) => {
      setproductList(res);
      setIsLoading(false);
    });
  }, [context]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCat = (id) => {
    setFormFields({
      name: "",
      description: "",
      images: "",
      color: "",
    });
    setOpen(true);
    setEditId(id);
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      if (res) {
        setFormFields({
          name: res.name,
          description: res.description,
          images: res.images,
          color: res.color,
        });
      }
    });
  };

  const catEdit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when editing starts
    const imagesToUpdate = Array.isArray(formFields.images)
      ? formFields.images
      : [formFields.images];

    const updatedCategory = {
      ...formFields,
      images: imagesToUpdate,
    };

    editData(`/api/category/${editId}`, updatedCategory)
      .then(() => {
        fetchDataFromApi("/api/category").then((res) => {
          if (res) {
            setCatData(res);
          }
          setOpen(false);
          setIsLoading(false); // Hide loading when update is complete
          toast.success("Category updated successfully!");
        });
      })
      .catch(() => {
        toast.error("Failed to update the category.");
        setIsLoading(false); // Hide loading if there's an error
      });
  };

  const inputChange = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addimgurl = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      images: e.target.value,
    }));
  };

  const paginatedData = catData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteCat = (id) => {
    setIsLoading(true); // Set loading to true when deleting
    deleteData(`/api/category/${id}`)
      .then((res) => {
        fetchDataFromApi("/api/category").then((res) => {
          if (res) {
            setCatData(res);
            toast.success("Category deleted successfully!");
          }
          setIsLoading(false); // Hide loading once deletion is complete
        });
      })
      .catch(() => {
        toast.error("Failed to delete the category.");
        setIsLoading(false); // Hide loading if there's an error
      });
  };

  return (
    <div className="right-content">
      <ToastContainer position="bottom-right" />
      <div className="row dashboardBoxWrapperRow">
        {isLoading && <LinearProgress />}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="cardd shadow border-0 w-100 mt-3 mb-2"
        >
          <h3 className="m-3 p-2">Categories</h3>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Category List" />
          </Breadcrumbs>
          <Link to="/category/add">
            <Button className="btn-blue catbtn">Add Category</Button>
          </Link>
        </Box>
        <div className="card shadow border-0 p-3 mt-4">
          <div className="table-responsive mt-3">
            <table className="table table-bordered align-items-center v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>CATEGORY</th>
                  <th>IMAGE</th>
                  <th>COLOR</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item._id}>
                    <td>#00{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <div className="img">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-100"
                            />
                          </div>
                        </div>
                        <div className="info pl-0">
                          <h6>{item.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{ height: "60px", width: "60px" }}
                      />
                    </td>
                    <td style={{ backgroundColor: item.color }}>
                      {item.color}
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to="/category/edit/{_id}">
                          <Button
                            color="secondary"
                            onClick={() => editCat(item._id)}
                          >
                            <FaPen />
                          </Button>
                        </Link>
                        <Link to="/category/delete/{_id}">
                          <Button
                            color="error"
                            onClick={() => openDeleteDialog(item._id)}
                          >
                            <MdDelete />
                          </Button>
                        </Link>

                        <Dialog
                          open={confirmDelete}
                          onClose={closeDeleteDialog}
                        >
                          <DialogTitle>Confirm Delete</DialogTitle>
                          <DialogContent>
                            Are you sure you want to delete this category?
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={closeDeleteDialog} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm} color="error">
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(catData.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
      <StyledDialog open={open} onClose={handleClose}>
        <StyledDialogTitle>Edit Category</StyledDialogTitle>
        <DialogContent>
          <form onSubmit={catEdit}>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Category Name"
              name="name"
              value={formFields.name}
              onChange={inputChange}
              fullWidth
            />
            <StyledTextField
              autoFocus
              margin="dense"
              label="Description "
              name="description"
              value={formFields.description}
              onChange={inputChange}
              fullWidth
            />
            <StyledTextField
              margin="dense"
              label="Image URL"
              name="images"
              value={formFields.images}
              onChange={addimgurl}
              fullWidth
            />
            <StyledTextField
              margin="dense"
              label="Color"
              name="color"
              value={formFields.color}
              onChange={inputChange}
              fullWidth
            />
            <StyledDialogActions>
              <StyledButton onClick={handleClose} color="secondary">
                Cancel
              </StyledButton>

              <StyledButton type="submit" variant="contained">
                {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
              </StyledButton>
            </StyledDialogActions>
          </form>
        </DialogContent>
      </StyledDialog>
    </div>
  );
};

export default CategoryList;
