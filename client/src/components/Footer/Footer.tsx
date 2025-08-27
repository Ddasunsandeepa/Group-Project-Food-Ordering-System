import React from 'react';
import { Leaf, Truck, DollarSign, Tag, Facebook, Twitter, Instagram } from 'lucide-react';

interface MenuLink {
  id: string;
  name: string;
}

interface MenuSection {
  title: string;
  links: MenuLink[];
}

const RestaurantFooter: React.FC = () => {
  const handleLinkClick = (linkId: string, linkName: string) => {
    console.log(`Navigating to: ${linkName} (ID: ${linkId})`);
    // Here you would typically use router navigation
    // For example: router.push(`/${linkId}`) or navigate(`/${linkId}`)
  };

  const menuSections: MenuSection[] = [
    {
      title: "MEALS & FAVOURITES",
      links: [
        { id: "grilled-chicken", name: "Grilled Chicken" },
        { id: "pasta-dishes", name: "Pasta Dishes" },
        { id: "seafood-specials", name: "Seafood Specials" },
        { id: "desserts-pastries", name: "Desserts & Pastries" },
        { id: "beverages-drinks", name: "Beverages & Drinks" },
        { id: "vegan-options", name: "Vegan Options" },
        { id: "special-offers", name: "Special Offers" }
      ]
    },
    {
      title: "DESSERTS & FAVOURITES",
      links: [
        { id: "chocolate-lava-cake", name: "Chocolate Lava Cake" },
        { id: "cheesecake", name: "Cheesecake" },
        { id: "tiramisu", name: "Tiramisu" },
        { id: "fruit-tart", name: "Fruit Tart" },
        { id: "brownie-sundae", name: "Brownie Sundae" },
        { id: "apple-pie", name: "Apple Pie" },
        { id: "panna-cotta", name: "Panna Cotta" }
      ]
    },
    {
      title: "DRINKS & FAVOURITES",
      links: [
        { id: "vanilla-ice-cream", name: "Vanilla Ice Cream" },
        { id: "iced-tea", name: "Iced Tea" },
        { id: "cappuccino", name: "Cappuccino" },
        { id: "sparkling-water", name: "Sparkling Water" },
        { id: "milkshake", name: "Milkshake" },
        { id: "hot-cider", name: "Hot Cider" },
        { id: "lemonade", name: "Lemonade" }
      ]
    },
    {
      title: "COMBO & FAVOURITES",
      links: [
        { id: "chicken-salad-combo", name: "Chicken Salad + Lava Cake + Ice Cream" },
        { id: "beef-tacos-combo", name: "Beef Tacos + Cheesecake + Iced Tea" },
        { id: "veg-stir-fry-combo", name: "Veg Stir-Fry + Tiramisu + Coffee" },
        { id: "margherita-pizza-combo", name: "Margherita Pizza + Fruit Tart + Sparkling Water" },
        { id: "pasta-primavera-combo", name: "Pasta Primavera + Brownie + Milkshake" },
        { id: "pulled-pork-combo", name: "Pulled Pork Sandwich + Apple Pie + Cider" },
        { id: "shrimp-scampi-combo", name: "Shrimp Scampi + Panna Cotta + Wine" }
      ]
    }
  ];

  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Everyday Fresh Meals",
      description: ""
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Delivery for order over",
      description: "LKR 100.00"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Best price on the market",
      description: ""
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Daily Mega Discounts",
      description: ""
    }
  ];

  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="text-gray-400">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-gray-600 font-medium text-sm">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-gray-500 font-medium text-sm">
                    {feature.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Menu Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-gray-800 font-semibold text-sm mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleLinkClick(link.id, link.name)}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200 text-sm text-left w-full"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            Copyright 2024 ©. All rights reserved. Powered by android.
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <button 
              onClick={() => handleLinkClick('facebook', 'Facebook')}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleLinkClick('twitter', 'Twitter')}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleLinkClick('instagram', 'Instagram')}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;