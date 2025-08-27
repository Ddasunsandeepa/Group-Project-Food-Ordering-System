import React from 'react'
import NavButton from './NavButton'
import { FaHome } from "react-icons/fa"

const NavHomeBtn =() => {
  return (
    <NavButton name={'Home'} icon={<FaHome size={19} />} link={'/'} />
  )
}

export default NavHomeBtn
