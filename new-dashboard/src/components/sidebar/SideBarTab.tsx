import {NavLink } from "react-router-dom";

interface SideBarTabProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const SideBarTab: React.FC<SideBarTabProps> = ({ to, icon, label }) => {
  return (
    <NavLink to={to} className={({ isActive }) => 
        `w-full flex flex-row justify-start items-center  gap-5 p-4 rounded-2xl border-[3px] hover:shadow-md transition duration-200 ${
          isActive ? 'bg-orange-100 text-orange-600  border-orange-200' : 'text-gray-600  border-gray-200'
        }`
      }>
        <div >
          {icon}
        </div>
        <div className="text-xl font-semibold">{label}</div>
    </NavLink>
  );
};

export default SideBarTab;



