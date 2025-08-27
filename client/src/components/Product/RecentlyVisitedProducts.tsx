import React from "react";
import HomeSwiper from "../../components/Home/HomeSwiper";
import { useGlobalContext } from "../../contexts/GlobalContext";

const RecentlyVisitedProducts: React.FC = () => {
  const { recentlyVisited, recentsLoading } = useGlobalContext();

  return (
    <div className="bg-gray-50 px-10 w-full">
      <div className="w-full mx-auto">
        <HomeSwiper
          title="RECENTLY VIEWED PRODUCTS"
          subtitle="Items you’ve recently explored."
          showTabs={false}
          categories={[]}
          products={recentlyVisited}
          autoplay={false}
          autoplayDelay={0}
          className="mb-6"
          headerClassName="bg-white rounded-lg p-4 shadow-sm"
          slidesPerView={5}
          spaceBetween={8}
          loading={recentsLoading}
        />
      </div>
    </div>
  );
};

export default RecentlyVisitedProducts;
