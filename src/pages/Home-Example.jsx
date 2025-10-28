// Example structure for your Home.jsx landing page
// Add these section IDs so the navbar smooth scroll works

import React from "react";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900">
      <Nav />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-zen text-5xl md:text-7xl text-white mb-6">
            Welcome to MKET
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Your marketplace solution for students
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-zen text-4xl md:text-5xl text-white text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Add your feature cards here */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-white font-semibold text-xl mb-3">
                Fast & Secure
              </h3>
              <p className="text-white/70">
                Lightning-fast transactions with top-tier security
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-white font-semibold text-xl mb-3">
                Student-Friendly
              </h3>
              <p className="text-white/70">
                Built specifically for student needs
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-white font-semibold text-xl mb-3">
                24/7 Support
              </h3>
              <p className="text-white/70">Always here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why MKET Section */}
      <section
        id="why-mket"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-black/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-zen text-4xl md:text-5xl text-white mb-8">
            Why MKET?
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            MKET is more than just a marketplace. We're a community built by
            students, for students. Our platform makes buying and selling easy,
            safe, and convenient.
          </p>
          {/* Add more content here */}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="font-zen text-4xl md:text-5xl text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {/* FAQ Items */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-2">
                How do I get started?
              </h3>
              <p className="text-white/70">
                Simply click "Get Started" and create your account in seconds!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-2">
                Is it free to use?
              </h3>
              <p className="text-white/70">
                Yes! MKET is completely free for students.
              </p>
            </div>
            {/* Add more FAQs */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>© 2025 MKET. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
