import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Import icons for testing

type ButtonProps = {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "icon-only"; // New variant for icon-only
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode; // New prop to pass an icon for the button
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon,
}) => {
  const baseStyles = "px-4 py-2 outline-none border-none rounded font-semibold transition duration-200";
  const variantStyles = {
    primary: "bg-primary-dark text-white hover:bg-primary-light",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    "icon-only": "bg-transparent border-none p-0",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon || label} {/* If icon is passed, it will be rendered, otherwise fallback to label */}
    </button>
  );
};

export default Button;
