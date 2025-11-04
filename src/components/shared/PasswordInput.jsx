import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { checkPasswordStrength } from "../../utils/passwordStrength";

const PasswordInput = ({
  value,
  onChange,
  name,
  placeholder = "Enter password",
  showStrengthIndicator = false,
  required = false,
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strengthInfo = showStrengthIndicator
    ? checkPasswordStrength(value)
    : null;

  const getStrengthBarColor = () => {
    if (!strengthInfo) return "";
    switch (strengthInfo.color) {
      case "red":
        return "bg-red-500";
      case "orange":
        return "bg-orange-500";
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthBarWidth = () => {
    if (!strengthInfo || !value) return "0%";
    const percentage = (strengthInfo.score / 5) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
        {label}
      </label>
      <div className="relative">
        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all font-instrument"
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563] hover:text-[#111827] transition-colors"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && value && (
        <div className="mt-2">
          {/* Strength Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getStrengthBarColor()}`}
              style={{ width: getStrengthBarWidth() }}
            />
          </div>

          {/* Strength Message */}
          <p
            className={`text-xs font-instrument mt-1 ${
              strengthInfo.color === "red"
                ? "text-red-500"
                : strengthInfo.color === "orange"
                ? "text-orange-500"
                : strengthInfo.color === "yellow"
                ? "text-yellow-600"
                : "text-green-500"
            }`}
          >
            {strengthInfo.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
