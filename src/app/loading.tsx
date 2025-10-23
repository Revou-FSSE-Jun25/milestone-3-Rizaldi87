export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-6"></div>
      <p className="text-lg font-medium">Loading awesome products for you...</p>
    </div>
  );
}
