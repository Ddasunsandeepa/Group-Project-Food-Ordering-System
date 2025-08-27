// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Blog from './pages/Blog';
import Home from './pages/Home';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import WishList from './pages/WishList';
import CategoryView from './layouts/CategoryView';
import Product from './pages/Product';
import ShoppingCartComponent from './pages/Cart';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes */}
      <Route path="/" element={<MainLayout ><Home /></MainLayout>}/>
      <Route path="/categories/:id" element={<CategoryView />} />
      <Route path="/product/:id" element={<MainLayout ><Product /></MainLayout>} />
      <Route path="/blog" element={<MainLayout ><Blog /></MainLayout>}/>
      <Route path="/contact" element={<MainLayout ><div>Contact</div></MainLayout>}/>
      <Route path="/favorites" element={<MainLayout ><WishList /></MainLayout>}/>
      <Route path="/cart" element={<MainLayout ><ShoppingCartComponent /></MainLayout>}/>
      <Route path="/sign-in" element={<AuthLayout ><SignIn /></AuthLayout>}/>
      <Route path="/sign-up" element={<AuthLayout ><SignUp /></AuthLayout>}/>
    </Routes>
  );
};
