// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';



export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes */}
      <Route path="/" element={<div>Home</div>}/>
    </Routes>
  );
};
