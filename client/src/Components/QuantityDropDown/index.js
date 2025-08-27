import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantityBox = () => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    if (inputVal === 1) {
      setInputVal(1);
    } else {
      setInputVal(inputVal - 1);
    }
  };
  const plus = () => {
    setInputVal(inputVal + 1);
  };
  return (
    <div>
      <div className="quantityDrop d-flex align-items-center">
        <Button onClick={minus} aria-label="Decrement">
          <FaMinus />
        </Button>
        <input type="text" value={inputVal} readOnly aria-label="Quantity"/>
        <Button onClick={plus} aria-label="Increment">
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default QuantityBox;
