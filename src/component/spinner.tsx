import React from "react";

type SpinnerProps = {
  size?: number;
  color?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = "border-blue-500" }) => {
  return (
    <div
      className={`border-4 border-t-transparent rounded-full animate-spin ${color}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Spinner;
