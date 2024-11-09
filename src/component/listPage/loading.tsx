import Skeleton from "@/component/skeleton";

const SkeletonLoader = () => (
  <div className="p-6 flex flex-col">
    <div className="w-full h-[44px] rounded mb-1 flex justify-between gap-1 ">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="flex-1" />
      ))}
    </div>
    {Array.from({ length: 10 }, (_, index) => (
      <Skeleton key={index} className="w-full h-[44px] mb-1" />
    ))}
  </div>
);

export default SkeletonLoader;
