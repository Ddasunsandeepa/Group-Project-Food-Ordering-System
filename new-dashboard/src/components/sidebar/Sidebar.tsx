import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Tag, ShoppingCart, Star, User, Cog } from "lucide-react";

interface SideBarTabProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const SideBarTab: FC<SideBarTabProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white ${
        isActive ? "bg-gray-900 text-white font-semibold" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const SideBar: FC<{ isSidebarVisible?: boolean }> = ({ isSidebarVisible = true }) => {
  if (!isSidebarVisible) return null;

  return (
    <aside className="sticky top-0 left-0 h-screen w-72 bg-gray-900 text-gray-300 shadow-xl flex flex-col p-6 gap-6">
      <div className="flex items-center gap-2 mb-10">
        <Home className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold text-white">TasteNest Admin</span>
      </div>

      <nav className="flex flex-col gap-2">
        <SideBarTab to="/dashboard" icon={<Home className="w-5 h-5" />} label="Dashboard" />
        <SideBarTab to="/dashboard/products" icon={<Package className="w-5 h-5" />} label="Products" />
        <SideBarTab to="/dashboard/categories" icon={<Tag className="w-5 h-5" />} label="Categories" />
        <SideBarTab to="/dashboard/orders" icon={<ShoppingCart className="w-5 h-5" />} label="Orders" />
        <SideBarTab to="/dashboard/reviews" icon={<Star className="w-5 h-5" />} label="Reviews" />
        <SideBarTab to="/dashboard/admins" icon={<User className="w-5 h-5" />} label="Admins" />
        <SideBarTab to="/dashboard/settings" icon={<Cog className="w-5 h-5" />} label="Settings" />
      </nav>
    </aside>
  );
};

export default SideBar;
