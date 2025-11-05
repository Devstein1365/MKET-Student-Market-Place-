import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onKeyPress,
  onFocus,
  placeholder,
  icon,
  iconPosition = "left",
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className = "",
}) => {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#111827] mb-2 font-inter"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg font-instrument transition-all outline-none
            ${icon && iconPosition === "left" ? "pl-12" : ""}
            ${icon && iconPosition === "right" ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]">
            {icon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={`text-xs mt-1 font-instrument ${
            error ? "text-red-500" : "text-[#4B5563]"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
