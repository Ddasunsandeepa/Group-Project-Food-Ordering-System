import React from "react";
import { BlogPost } from "../types";
import BlogPostComponent from "../components/Blog/BlogPost";

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Healthy Breakfast Ideas",
      date: "March 5, 2025",
      description:
        "Start your day right with quick and nutritious breakfast recipes that are both delicious and energizing.",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop&crop=center",
      category: "Breakfast",
    },
    {
      id: 2,
      title: "Healthy Smoothies",
      date: "February 25, 2025",
      description:
        "Discover smoothie recipes packed with vitamins and energy to kickstart your day with nutritious ingredients.",
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&h=600&fit=crop&crop=center",
      category: "Health",
    },
    {
      id: 3,
      title: "Quick & Easy Desserts",
      date: "February 20, 2025",
      description:
        "Indulge in simple and tasty desserts for any occasion that require minimal time and maximum flavor.",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&crop=center",
      category: "Desserts",
    },
    {
      id: 4,
      title: "Mediterranean Cooking",
      date: "February 15, 2025",
      description:
        "Explore the vibrant flavors of the Mediterranean with fresh herbs, olive oil, and seasonal ingredients.",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop&crop=center",
      category: "Cuisine",
    },
    {
      id: 5,
      title: "Breakfast Ideas",
      date: "February 10, 2025",
      description:
        "Start your morning right with creative and nutritious breakfast recipes that fuel your entire day.",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop&crop=center",
      category: "Breakfast",
    },
    {
      id: 6,
      title: "Vegan Delights",
      date: "February 5, 2025",
      description:
        "Plant-based recipes that are both delicious and satisfying, proving vegan food can be incredibly flavorful.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&crop=center",
      category: "Vegan",
    },
  ];

  return (
    <div className="min-h-screen w-full mx-auto px-1 lg:px-6 py-6 bg-app-main/15">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-light text-gray-400 mb-4">
              Our Latest Blog Posts
            </h1>
            <p className="text-base lg:text- font-normal text-gray-500 max-w-2xl mx-auto">
              Explore our latest articles on food, recipes, and cooking tips to
              elevate your culinary journey.
            </p>
          </div>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostComponent key={post.id} post={post} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
            Load More Posts
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Blog;
