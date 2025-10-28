// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-purple-50 pt-20 pb-32 md:pt-24 md:pb-40">
      {/* Floating Background Icons - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 left-10 text-purple-400"
        >
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-32 right-16 text-purple-600"
        >
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Trade Smart.<br />
              <span className="text-purple-700">No Scams.</span><br />
              Just FUTMINNA.
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
              Tired of WhatsApp stress? MKET is the{" "}
              <span className="font-semibold text-purple-700">only verified student marketplace</span> — post, chat, meet, pay. All on campus. All safe.
            </p>

            <p className="mt-4 text-sm text-gray-500 italic">
              Only FUTMINNA emails. No outsiders. Ever.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-purple-700 hover:bg-purple-900 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200"
                onClick={() => {
                  const emailInput = prompt("Enter your FUTMINNA email to get early access:");
                  if (emailInput && emailInput.includes("@futminna.edu.ng")) {
                    alert(`Welcome, ${emailInput.split("@")[0]}! You're in. Launch: Dec 2025.`);
                  } else if (emailInput) {
                    alert("Please use your valid FUTMINNA email.");
                  }
                }}
              >
                Get Early Access
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Launching <span className="font-semibold">December 2025</span> — Be the first.
            </p>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative transform -rotate-12 hover:rotate-0 transition-transform duration-500">
              {/* Phone Frame */}
              <div className="relative w-64 h-[520px] md:w-72 md:h-[580px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-8 border-black">
                {/* Screen */}
                <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden p-4">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-800">MKET</span>
                    </div>
                    <div className="text-xs text-gray-500">9:41 AM</div>
                  </div>

                  {/* Listing Card */}
                  <div className="bg-gray-50 rounded-xl p-3 shadow-sm">
                    <div className="flex space-x-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">PHY 112 Textbook</h3>
                        <p className="text-xs text-gray-600">Like New • Bosso Hostel</p>
                        <p className="text-lg font-bold text-purple-700">₦2,500</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubble */}
                  <div className="absolute bottom-20 left-6 bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-lg max-w-[180px]">
                    <p className="text-sm font-medium">Is this still available?</p>
                    <p className="text-xs opacity-80">Just now</p>
                  </div>

                  {/* Input Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-sm outline-none"
                      disabled
                    />
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-purple-600 opacity-20 blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 50C480 40 600 50 720 60C840 70 960 80 1080 75C1200 70 1320 50 1380 40L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;