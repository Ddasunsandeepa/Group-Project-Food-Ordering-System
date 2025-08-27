// components/skeletons/ProductSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex justify-center flex-col items-center">
      <div className="bg-white w-full lg:w-[90%] mx-auto p-2 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Image Section */}
          <div className="space-y-4 lg:col-span-1">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="flex space-x-2 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-16 h-16 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-5 lg:col-span-3 lg:pl-12">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
              <Skeleton className="h-12 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 bg-app-bannerbtnhover/15">
          <h2 className="text-2xl font-bold text-gray-500 mb-6">
            Product Details
          </h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <Skeleton className="h-12 w-32 px-6 py-3 rounded-full" />
            <Skeleton className="h-12 w-32 px-6 py-3 rounded-full" />
            <Skeleton className="h-12 w-32 px-6 py-3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
