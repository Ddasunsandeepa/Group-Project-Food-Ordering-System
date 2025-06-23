import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout" id='auth-layout'>
        {children}
    </div>
  );
};

export default AuthLayout;
