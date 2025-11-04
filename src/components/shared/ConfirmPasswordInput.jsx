import React, { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { checkPasswordMatch } from "../../utils/passwordStrength";

const ConfirmPasswordInput = ({
  value,
  onChange,
  name,
  placeholder = "Confirm password",
  originalPassword,
  required = false,
  label = "Confirm Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const matchInfo = checkPasswordMatch(originalPassword, value);

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
          className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all font-instrument ${
            matchInfo.matches === true
              ? "border-green-500"
              : matchInfo.matches === false
              ? "border-red-500"
              : "border-gray-300"
          }`}
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

      {/* Match Indicator */}
      {value && matchInfo.matches !== null && (
        <div className="flex items-center gap-2 mt-2">
          {matchInfo.matches ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <p className="text-xs text-green-500 font-instrument">
                {matchInfo.message}
              </p>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" />
              <p className="text-xs text-red-500 font-instrument">
                {matchInfo.message}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;
