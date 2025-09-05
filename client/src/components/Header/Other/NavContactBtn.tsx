import React from 'react'
import NavButton from './NavButton'
import { RiContactsFill } from "react-icons/ri";

const NavContactBtn =() => {
  return (
    <NavButton name={'Contact'} icon={<RiContactsFill size={19} />} link={'/contact'} />
  )
}

export default NavContactBtn
