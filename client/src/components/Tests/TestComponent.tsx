import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface Category {
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  category: Category;
}

interface HomeSwiperProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  showTabs?: boolean;
  categories?: Category[];
  products?: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showDoubleRow?: boolean;
  itemsPerRow?: number;
  className?: string;
  headerClassName?: string;
  swiperClassName?: string;
}

// Updated Tab Component with scrollable functionality
const ScrollableTabs: React.FC<{
  categories: Category[];
  activeTab: number;
  onTabChange: (index: number) => void;
}> = ({ categories, activeTab, onTabChange }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const Tab: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, [categories]);

  useEffect(() => {
    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm max-w-md relative">
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`flex-shrink-0 p-1 rounded-md mr-2 transition-colors ${
            canScrollLeft
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable Tab Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-1 overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-1 min-w-max">
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={category.name}
                isActive={activeTab === index}
                onClick={() => onTabChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`flex-shrink-0 p-1 rounded-md ml-2 transition-colors ${
            canScrollRight
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ProductItem Component
const ProductItem: React.FC<{ item: Product }> = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
      <span className="text-4xl">🍽️</span>
    </div>
    <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-blue-600">${item.price}</span>
        {item.discount && (
          <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}
      </div>
    </div>
  </div>
);

// NoProductsFound Component
const NoProductsFound: React.FC = () => (
  <div className="text-center py-8">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
    <p className="text-gray-500">Try selecting a different category</p>
  </div>
);

// Simple Swiper Component
const SimpleSwiper: React.FC<{
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay?: number;
}> = ({ children, slidesPerView, spaceBetween, autoplay, autoplayDelay = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const maxSlide = Math.max(0, totalSlides - slidesPerView);

  React.useEffect(() => {
    if (!autoplay || totalSlides <= slidesPerView) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, maxSlide, totalSlides, slidesPerView]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center">
        {totalSlides > slidesPerView && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            ←
          </button>
        )}
        
        <div className="overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
              gap: `${spaceBetween}px`
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{ 
                  minWidth: `calc(${100 / slidesPerView}% - ${spaceBetween * (slidesPerView - 1) / slidesPerView}px)`,
                  marginRight: index < slides.length - 1 ? `${spaceBetween}px` : '0'
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {totalSlides > slidesPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

// HomeSwiper Component
const HomeSwiper: React.FC<HomeSwiperProps> = ({
  title,
  subtitle,
  showViewAllButton = false,
  onViewAllClick,
  showTabs = false,
  categories = [],
  products = [],
  slidesPerView = 4,
  spaceBetween = 12,
  autoplay = false,
  autoplayDelay = 3000,
  showDoubleRow = false,
  itemsPerRow = 6,
  className = "",
  headerClassName = "",
  swiperClassName = ""
}) => {
  // console.log("Received products in HomeSwiper:", products);
  const [activeTab, setActiveTab] = useState(0);

  const getFilteredProducts = () => {
    // console.log('Filtering products for active tab:', products);
    if (!showTabs || categories.length === 0) return products;
    
    const activeCategory = categories[activeTab];
    if (activeCategory.name.toLowerCase() === 'all') return products;
    
    return products.filter(item =>
      item.category?.name?.toLowerCase() === activeCategory.name?.toLowerCase()
    );
  };

  const filteredProducts = getFilteredProducts();
  // console.log('Filtered products:', filteredProducts);

  const renderProducts = () => {
    if (filteredProducts.length === 0) return <NoProductsFound />;

    if (showDoubleRow) {
      const rows = Math.ceil(filteredProducts.length / itemsPerRow);
      const chunks = Array.from({ length: rows }, (_, i) =>
        filteredProducts.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
      );

      return chunks.map((chunk, rowIdx) => (
        <div className={`w-full mt-4 ${swiperClassName}`} key={rowIdx}>
          <SimpleSwiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} autoplay={autoplay} autoplayDelay={autoplayDelay}>
            {chunk.map((item, idx) => (
              <div key={idx}>
                <ProductItem item={item} />
              </div>
            ))}
          </SimpleSwiper>
        </div>
      ));
    }

    return (
      <div className={`w-full mt-4 ${swiperClassName}`}>
        <SimpleSwiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} autoplay={autoplay} autoplayDelay={autoplayDelay}>
          {filteredProducts.map((item, index) => (
            <div key={index}>
              <ProductItem item={item} />
            </div>
          ))}
        </SimpleSwiper>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex flex-row justify-between items-center mt-3 ${headerClassName}`}>
        <div className="flex-grow flex flex-col items-start">
          {title && <h3 className="mb-0 text-2xl font-bold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-gray-600 text-sm mb-0">{subtitle}</p>}
        </div>
        <div className="ml-auto flex items-center">
          {showTabs && categories.length > 0 ? (
            <ScrollableTabs
              categories={categories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          ) : (
            showViewAllButton && (
              <button
                onClick={onViewAllClick}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View All →
              </button>
            )
          )}
        </div>
      </div>
      {renderProducts()}
    </div>
  );
};

// Demo Component
const HomeSwiperDemo: React.FC = () => {
  const categories: Category[] = [
    { name: 'All' },
    { name: 'Pizza' },
    { name: 'Burger' },
    { name: 'Drinks' },
    { name: 'Desserts' },    
    { name: 'Combos' },
    { name: 'Appetizers' },
    { name: 'Salads' },
    { name: 'Pasta' },
    { name: 'Soups' },
    { name: 'Sandwiches' }
  ];

  const specialOfferProducts: Product[] = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, discount: 10, category: { name: 'Pizza' } },
    { id: 2, name: 'Cheeseburger', price: 8.99, discount: 12, category: { name: 'Burger' } },
    { id: 3, name: 'Coca Cola', price: 2.99, discount: 5, category: { name: 'Drinks' } },
    { id: 4, name: 'Chocolate Cake', price: 5.99, discount: 8, category: { name: 'Desserts' } },
    { id: 5, name: 'Pepperoni Pizza', price: 14.99, discount: 15, category: { name: 'Pizza' } },
    { id: 6, name: 'Chicken Burger', price: 10.99, category: { name: 'Burger' } },
    { id: 7, name: 'Supreme Pizza', price: 16.99, discount: 20, category: { name: 'Pizza' } },
    { id: 8, name: 'Fish Burger', price: 9.99, discount: 8, category: { name: 'Burger' } }
  ];

  // console.log('Products being passed to HomeSwiper:', specialOfferProducts);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <HomeSwiper
          title="SPECIAL OFFERS"
          subtitle="Do not miss the current offers until the end of March"
          showTabs={true}
          categories={categories}
          products={specialOfferProducts}
          autoplay={true}
          autoplayDelay={5000}
          className="mb-8"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={3}
        />        
      </div>
    </div>
  );
};

export default HomeSwiperDemo;