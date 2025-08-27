import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeSwiperProps, Product } from "../../types";
import Tab from "./Tab";
import ProductItem from "./ProductItem";
import NoProductsFound from "./NoProductsFound";
import SimpleSwiper from "./SimpleSwiper";
import { Skeleton } from "../ui/skeleton";
import { useGlobalContext } from "../../contexts/GlobalContext";

const HomeSwiper: React.FC<HomeSwiperProps> = ({
  title,
  subtitle,
  showViewAllButton = false,
  onViewAllClick,
  showTabs = false,
  categories = [],
  products = [],
  slidesPerView = 5,
  spaceBetween = 12,
  autoplay = false,
  autoplayDelay = 3000,
  showDoubleRow = false,
  itemsPerRow = 6,
  className = "",
  headerClassName = "",
  swiperClassName = "",
  loading = false,
  error = "",
}) => {
  // console.log("Received products in HomeSwiper:", products);
  const [activeTab, setActiveTab] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const { isVeg } = useGlobalContext();

  // Unified scroll check function
  const checkScrollButtons = () => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current;
      const newCanScrollLeft = scrollLeft > 0;
      const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);
    }
  };
  // Initialize and set up scroll listeners
  useEffect(() => {
    const container = tabsScrollRef.current;
    if (container && categories.length > 0) {
      // Initial check
      checkScrollButtons();

      // Add scroll listener
      container.addEventListener("scroll", checkScrollButtons);

      // Add resize observer
      const resizeObserver = new ResizeObserver(checkScrollButtons);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, [categories]);

  // Scroll tabs left
  const scrollTabsLeft = () => {
    const container = tabsScrollRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll tabs right
  const scrollTabsRight = () => {
    const container = tabsScrollRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Handle tab click and auto-scroll to center
  // Handle tab click and auto-scroll to center
  const handleTabClick = (index: number) => {
    setActiveTab(index);

    // Auto-scroll to center the clicked tab
    if (tabsScrollRef.current) {
      // Get the wrapper div that contains all tabs
      const wrapperDiv = tabsScrollRef.current.querySelector(".min-w-max");
      if (wrapperDiv) {
        const tabElement = wrapperDiv.children[index] as HTMLElement;
        if (tabElement) {
          const containerWidth = tabsScrollRef.current.clientWidth;
          const tabLeft = tabElement.offsetLeft;
          const tabWidth = tabElement.offsetWidth;
          const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

          tabsScrollRef.current.scrollTo({
            left: Math.max(0, scrollLeft), // Ensure we don't scroll to negative values
            behavior: "smooth",
          });
        }
      }
    }
  };

  const getFilteredProducts = () => {
    // console.log("Filtering products for active tab:", products);

    if (!showTabs || categories.length === 0) return filterByVegan(products);

    const activeCategory = categories[activeTab];
    if (activeCategory.name.toLowerCase() === "all")
      return filterByVegan(products);

    const categoryFiltered = products.filter(
      (item) =>
        item.category?.name?.toLowerCase() ===
        activeCategory.name?.toLowerCase()
    );

    return filterByVegan(categoryFiltered);
  };

  // helper to filter by isVegan if toggle is on
  const filterByVegan = (items: Product[]) => {
    if (!isVeg) return items;
    return items.filter((item) => item.type == "Vegetarian"); // assumes product has isVegan field
  };

  const filteredProducts = getFilteredProducts();

  const renderProducts = () => {
    if (loading || error) {
      return (
        <div className="flex gap-4">
          {Array.from({ length: slidesPerView }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-start items-start gap-y-2 w-full rounded-lg shadow-md"
            >
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="py-4 px-2 w-full space-y-2 pb-12">
                <Skeleton className="h-4 w-[80%] rounded-xl" />
                <Skeleton className="h-4 w-[30%] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!loading && filteredProducts.length === 0) return <NoProductsFound />;

    if (showDoubleRow) {
      const rows = Math.ceil(filteredProducts.length / itemsPerRow);
      const chunks = Array.from({ length: rows }, (_, i) =>
        filteredProducts.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
      );

      return chunks.map((chunk, rowIdx) => (
        <div className={`w-full mt-4 ${swiperClassName}`} key={rowIdx}>
          <SimpleSwiper
            loading={loading}
            error={error}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            autoplay={autoplay}
            autoplayDelay={autoplayDelay}
          >
            {chunk.map((item, idx) => (
              <div key={idx}>
                <ProductItem product={item} />
              </div>
            ))}
          </SimpleSwiper>
        </div>
      ));
    }

    return (
      <div className={`w-full mt-4 ${swiperClassName}`}>
        <SimpleSwiper
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          autoplay={autoplay}
          autoplayDelay={autoplayDelay}
          loading={loading}
          error={error}
        >
          {filteredProducts.map((item, index) => (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          ))}
        </SimpleSwiper>
      </div>
    );
  };

  const renderTabsSection = () => {
    if (!showTabs || categories.length === 0) return null;

    return (
      <div className="bg-white p-2 rounded-lg shadow-sm max-w-lg relative">
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            onClick={scrollTabsLeft}
            disabled={!canScrollLeft}
            className={`aspect-square flex-shrink-0 p-2 rounded-full mr-3 transition-colors ${
              canScrollLeft
                ? "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                : "text-gray-300"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Scrollable Tab Container */}
          <div
            ref={tabsScrollRef}
            className="flex space-x-1 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-1 min-w-max">
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category.name}
                  isActive={activeTab === index}
                  onClick={() => handleTabClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={scrollTabsRight}
            disabled={!canScrollRight}
            className={`aspect-square flex-shrink-0 p-2 rounded-full ml-3 transition-colors ${
              canScrollRight
                ? "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                : "text-gray-300"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex flex-row justify-start items-center mt-3 ${headerClassName}`}
      >
        <div className="flex-grow flex flex-col items-start">
          {title && (
            <h3 className="mb-0 text-2xl font-bold text-gray-800">{title}</h3>
          )}
          {subtitle && <p className="text-gray-600 text-sm mb-0">{subtitle}</p>}
        </div>
        <div className="ml-auto flex items-center">
          {showTabs && categories.length > 0
            ? renderTabsSection()
            : showViewAllButton && (
                <button
                  onClick={onViewAllClick}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-gray-600 text-lg font-medium rounded-full shadow-md focus:outline-none focus:ring-2 transition-all"
                >
                  View All
                  <span className="transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              )}
        </div>
      </div>
      {renderProducts()}
    </div>
  );
};

export default HomeSwiper;
