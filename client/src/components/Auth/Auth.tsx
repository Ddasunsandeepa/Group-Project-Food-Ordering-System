import { AspectRatio } from "../ui/aspect-ratio";
import React, { ReactNode } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
  classname :string;
}

const Auth: React.FC<AuthProps> = ({ children, title, classname }) => {
  return (
    <div className="relative w-full min-h-screen bg-auth-background flex justify-center items-center overflow-hidden">
      {/* background shape */}
      <div className="absolute left-0 bottom-0 right-0 z-0">
        <svg
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,170.7C672,149,768,107,864,85.3C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* content */}
      <div className={`flex flex-col justify-start my-[5%] items-center relative z-10 min-h-[60%] bg-white rounded-xl shadow-xl p-6 ${classname}`}>
        <div className="w-[80%] max-w-[300px] mx-auto h-auto flex justify-center items-center">
            <AspectRatio ratio={16 / 9}>
            <img
              src="/logo.png"
              alt="Auth Logo"
              className="rounded-md object-contain w-full h-full"
            />
                  </AspectRatio>
        </div>
        <div className="w-full px-8">
            <span className="text-2xl text-gray-700 font-semibold">{title}</span>
        </div>
        <div className="w-full py-8 px-2 md:px-6 md:py-8">{children}</div>
      </div>
    </div>
  );
};

export default Auth;
