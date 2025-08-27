import ProductSection from "../components/Home/ProductSection";
import FeaturedCategories from "../components/Home/FeaturedCategories";
import HomeBanner from "../components/Home/HomeBanner";
import HomeSwiperDemo from "../components/Home/SpecialOffersSection";

export default function Home() {
  return (
    <div className="w-full">
      <HomeBanner />
      <section className="px-4 mx-auto py-10 text-center">
        <FeaturedCategories />
        <HomeSwiperDemo />
        <ProductSection title="MEALS" subtitle="Do not miss the current offers until the end of November" categoryFilter={["meal"]} />
        <ProductSection title="POPULAR PRODUCTS" subtitle="Check out our most popular products with top ratings! ⭐" categoryFilter={["combos","meal", "drinks"]} />
        <ProductSection title="DESSERTS" subtitle="Do not miss the current offers until the end of March!..." categoryFilter={["dessert"]} />
        <ProductSection title="DRINKS" subtitle="Stay refreshed with our amazing drinks selection! 🍹" categoryFilter={["drinks"]} />
      </section>
    </div>
  );
}
