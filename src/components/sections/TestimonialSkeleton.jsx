// src/components/sections/TestimonialSkeleton.jsx
export default function TestimonialSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse space-y-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-3xl"
    >
      <div className="flex space-x-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
    </div>
  );
}
