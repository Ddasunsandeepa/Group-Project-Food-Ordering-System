import React from "react";
import  WishlistIndicator  from "./Other/WishlistIndicator";
import  CartSummary  from "./Other/CartSummary";
import  CartLink  from "./Other/CartLink";

const ActionContainer: React.FC = () => {
  return (
    <div className="flex items-center space-x-6">
      <WishlistIndicator />
      <CartSummary />
      <CartLink />
    </div>
  );
};

export default ActionContainer;
