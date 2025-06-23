import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import BlogPage from "./Pages/blog/blog";
import MyList from "./Pages/MyList";
import PaymentSuccess from "./Pages/paymentSuccess";
import Contact from "./Pages/Contact/contact";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";

import ProductModel from "./Components/ProductModal";
import { MyProvider, Mycontext } from "./context/MyContext";

import { useContext } from "react";

const AppRoutes = () => {
  const { isOpenProductModel } = useContext(Mycontext);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/cat/:id" element={<MainLayout><Listing /></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/signIn" element={<AuthLayout><SignIn /></AuthLayout>} />
        <Route path="/signUp" element={<AuthLayout><SignUp /></AuthLayout>} />
        <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
        <Route path="/myList" element={<MainLayout><MyList /></MainLayout>} />
        <Route path="/payment/complete" element={<PaymentSuccess />} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      </Routes>
      {isOpenProductModel.open && <ProductModel />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <MyProvider>
        <AppRoutes />
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
