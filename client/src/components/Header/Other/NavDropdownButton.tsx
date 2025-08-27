import React from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";

interface NavDropdownButtonProps {
  name: string;
  icon?: React.ReactNode;
  link?: string;
}

const NavDropdownButton: React.FC<NavDropdownButtonProps> = ({
  name,
  icon,
  link = "#",
}) => {
  return (
    <Link to={link} className="flex items-center">
      <NavButton name={name} icon={icon} link={link} />
    </Link>
  );
};

export default NavDropdownButton;
