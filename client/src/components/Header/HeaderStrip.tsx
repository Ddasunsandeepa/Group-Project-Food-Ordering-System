import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { formatPrice } from "../../utils/helpers";

const HeaderStrip: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isHidden = localStorage.getItem("headerStripHidden");
    if (isHidden === "true") {
      setVisible(false);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("headerStripHidden", "true");
  };

  if (!visible)
    return (
      <div className="w-full h-2 bg-app-main">
        <span className="sr-only">Header strip closed</span>
      </div>
    );

  return (
    <div
      id="header-to-strip"
      className="w-full h-auto bg-header-strip flex justify-center items-center max-h-[40px] overflow-hidden relative"
    >
      <div className="text-white font-semibold py-2 text-center">
        Get free delivery on orders over {formatPrice(750)}
      </div>
      <button
        onClick={handleClose}
        className="absolute right-4 text-white hover:text-gray-300 transition"
        aria-label="Close strip"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeaderStrip;
