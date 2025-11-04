import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Logo from "./ui/Logo";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  const navLinks = [
    { label: "Why Choose Us", id: "why-choose-us" },
    { label: "Why MKET", id: "why-mket" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always Visible */}
          <Logo />

          {/* Desktop: Logo | Nav Links (centered) | Login (right) */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#111827] hover:text-[#7E22CE] font-medium transition-colors cursor-pointer duration-200 font-inter"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop: Login (right side) */}
          <div className="flex items-center">
            <Link to="/auth">
              <button className="text-white bg-[#7E22CE] hover:bg-[#6B1FB0] px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#7E22CE] p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-[#111827] hover:text-[#7E22CE] hover:bg-white/10 font-medium px-3 py-2 rounded-md transition-colors duration-200 font-inter"
              >
                {link.label}
              </button>
            ))}
            <Link to="/auth" className="block">
              <button className="w-full text-white bg-[#7E22CE] hover:bg-[#6B1FB0] font-semibold px-3 py-2 rounded-full transition-colors duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
