import React from 'react'
import NavButton from './NavButton'
import { FaBloggerB } from "react-icons/fa";

const NavBlogBtn =() => {
  return (
    <NavButton name={'Blog'} icon={<FaBloggerB size={19} />} link={'/blog'} />
  )
}

export default NavBlogBtn;
