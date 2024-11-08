import Skeleton from "@/component/skeleton";

const SkeletonLoader = () => (
  <div className="p-6">
    <Skeleton className="h-8 w-32 mb-4" />
    <Skeleton className="w-full h-48  mb-4" />
    <Skeleton className="h-6 w-64 " />
  </div>
);

export default SkeletonLoader;
