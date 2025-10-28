import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import WhyMket from "../components/WhyMket";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* header section  */}
      <Nav />
      {/* Hero section  */}
      <Hero />
      {/* Why Choose Us section  */}
      <WhyChoose />
      <WhyMket/>
    </div>
  );
};

export default Home;
