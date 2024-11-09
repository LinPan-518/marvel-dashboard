import React from "react";

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-gray-200 rounded-md ${className} animate-skeletonWave`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
        backgroundSize: "200px 100%",
      }}
    />
  );
};

export default Skeleton;
