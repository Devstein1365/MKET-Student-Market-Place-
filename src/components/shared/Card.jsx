import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  onClick,
}) => {
  const variants = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-md",
    glass: "bg-white/80 backdrop-blur-lg border border-gray-200/50",
    gradient:
      "bg-gradient-to-br from-[#7E22CE]/5 to-[#14B8A6]/5 border border-[#7E22CE]/10",
  };

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const hoverClass = hoverable
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg transition-all duration-300
        ${variants[variant]} ${paddings[padding]} ${hoverClass} ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
