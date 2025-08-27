import { BlogPost } from '../../types';
import React from 'react';


interface BlogPostProps {
  post: BlogPost;
}

// BlogPost Component
const BlogPostComponent: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {post.date}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-200">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {post.description}
        </p>
        
        <button className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-200">
          Read More
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default BlogPostComponent;