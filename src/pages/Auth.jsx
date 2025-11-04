import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaIdCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup state
  const [signupData, setSignupData] = useState({
    fullName: "",
    studentId: "",
    matricNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle login input
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle signup input
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Auto-generate email from name and student ID
  const generateEmail = () => {
    const { fullName, studentId } = signupData;
    if (fullName && studentId) {
      // Convert name to lowercase and get first letter + surname
      const nameParts = fullName.toLowerCase().trim().split(" ");

      let emailPrefix = "";

      if (nameParts.length >= 2) {
        // Get  full last name
        emailPrefix = `${nameParts[nameParts.length - 1]}`;
      } else {
        emailPrefix = nameParts[0];
      }

      const generatedEmail = `${emailPrefix}.${studentId}@st.futminna.edu.ng`;
      setSignupData({ ...signupData, email: generatedEmail });
    }
  };

  // Handle login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", loginData);
    // TODO: Add API call
  };

  // Handle signup submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!signupData.email.includes("@st.futminna.edu.ng")) {
      alert("Please use a valid FUTMINNA student email!");
      return;
    }

    console.log("Signup:", signupData);
    // TODO: Add API call
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#7E22CE]/10 via-white to-[#14B8A6]/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="font-zen text-4xl bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-transparent bg-clip-text mb-2 cursor-pointer hover:scale-105 transition-transform inline-block">
              MKET
            </h1>
          </Link>
          <p className="text-[#4B5563] font-instrument">
            Welcome to the student marketplace
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 font-inter ${
                activeTab === "login"
                  ? "bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white shadow-lg"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 font-inter ${
                activeTab === "signup"
                  ? "bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white shadow-lg"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLoginSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      placeholder="your.studentid@st.futminna.edu.ng"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563] hover:text-[#7E22CE] transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#7E22CE] border-gray-300 rounded focus:ring-[#7E22CE]"
                    />
                    <span className="ml-2 text-sm text-[#4B5563] font-instrument">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#7E22CE] hover:text-[#14B8A6] font-medium font-inter"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-inter"
                >
                  Log In
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignupSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type="text"
                      name="fullName"
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Student ID
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type="text"
                      name="studentId"
                      value={signupData.studentId}
                      onChange={handleSignupChange}
                      onBlur={generateEmail}
                      required
                      placeholder="m2203183"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                  </div>
                  <p className="text-xs text-[#4B5563] mt-1 font-instrument">
                    Used in your email address (e.g., m2203183)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Matric Number
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type="text"
                      name="matricNumber"
                      value={signupData.matricNumber}
                      onChange={handleSignupChange}
                      required
                      placeholder="2022/1/12345CS"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                  </div>
                  <p className="text-xs text-[#4B5563] mt-1 font-instrument">
                    Your official matriculation number for verification
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    FUTMINNA Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                      placeholder="name.studentid@st.futminna.edu.ng"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-[#14B8A6] mt-1 font-instrument">
                    ✓ Auto-generated from your name and student ID
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563] hover:text-[#7E22CE] transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2 font-inter">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4B5563]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                      placeholder="Re-enter your password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all outline-none font-instrument"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#4B5563] hover:text-[#7E22CE] transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 text-[#7E22CE] border-gray-300 rounded focus:ring-[#7E22CE]"
                  />
                  <label className="ml-2 text-sm text-[#4B5563] font-instrument">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-[#7E22CE] hover:text-[#14B8A6] font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-[#7E22CE] hover:text-[#14B8A6] font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-inter"
                >
                  Create Account
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#4B5563] font-instrument">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-[#7E22CE] hover:text-[#14B8A6] font-semibold"
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-[#7E22CE] hover:text-[#14B8A6] font-semibold"
                  >
                    Log in here
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-[#4B5563] hover:text-[#7E22CE] font-medium font-inter transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
