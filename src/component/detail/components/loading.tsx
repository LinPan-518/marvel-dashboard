import Skeleton from "@/component/skeleton";

const SkeletonLoader = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="w-full h-[400px]" />
    <Skeleton className="w-full h-[50px]" />
    <Skeleton className="w-full h-[50px]" />
    <Skeleton className="w-full h-[50px]" />
  </div>
);

export default SkeletonLoader;
