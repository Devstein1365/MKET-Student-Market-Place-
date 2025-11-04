import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import WhyMket from "../components/WhyMket";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <WhyChoose />

      {/* Why MKET Section */}
      <WhyMket />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
