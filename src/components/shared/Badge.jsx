import React from "react";

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
}) => {
  const variants = {
    primary: "bg-[#7E22CE]/10 text-[#7E22CE] border border-[#7E22CE]/20",
    secondary: "bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    danger: "bg-red-100 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const roundedClass = rounded ? "rounded-full" : "rounded";

  return (
    <span
      className={`
        inline-flex items-center font-inter font-medium
        ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
