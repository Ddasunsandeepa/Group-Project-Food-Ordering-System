import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";

const HeaderLogo = () => {
  return (
    <Link to={"/"} id="header-logo" className="w-[180px] h-auto flex justify-center items-center">
      <AspectRatio ratio={16 / 9}>
        <img
          src="/logo.png"
          alt="Auth Logo"
          className="rounded-md object-contain w-full h-full"
        />
      </AspectRatio>
    </Link>
  );
};

export default HeaderLogo;
