import React from "react";
import { FaUser } from "react-icons/fa";

const Avatar = ({
  src,
  alt = "User",
  size = "md",
  status,
  className = "",
  onClick,
}) => {
  const sizes = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  const statusSizes = {
    xs: "w-2 h-2 border",
    sm: "w-2.5 h-2.5 border",
    md: "w-3 h-3 border-2",
    lg: "w-4 h-4 border-2",
    xl: "w-5 h-5 border-2",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className={`
          ${sizes[size]} rounded-full overflow-hidden
          bg-gradient-to-br from-[#7E22CE] to-[#14B8A6]
          flex items-center justify-center text-white font-inter font-semibold
          ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}
        `}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <FaUser className="opacity-70" />
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full border-white
            ${statusSizes[size]} ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

export default Avatar;
