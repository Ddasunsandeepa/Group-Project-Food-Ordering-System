import React, { useEffect, useState } from "react";

interface ButtonWithGlowProps {
  triggerGlow: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const ButtonWithGlow: React.FC<ButtonWithGlowProps> = ({
  triggerGlow,
  children,
  onClick,
  className = "",
}) => {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (triggerGlow) {
      setGlow(true);
      const timeout = setTimeout(() => setGlow(false), 800); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [triggerGlow]);

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden px-5 h-[55px] text-white text-[16px] font-medium border-0 outline-none cursor-pointer bg-gradient-to-b from-[#233a95] to-[#233a95] shadow-md ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {glow && (
        <span
          className="absolute top-[-10%] left-[-20%] w-[80px] h-[120%] rotate-[15deg] scale-y-150 bg-white/70 blur-md pointer-events-none animate-button-glow"
        />
      )}
    </button>
  );
};

export default ButtonWithGlow;
