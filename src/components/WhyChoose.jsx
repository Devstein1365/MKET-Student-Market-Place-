import React from "react";
import {
  FaUserGraduate,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaBrain,
  FaHandshake,
} from "react-icons/fa";

const WhyChoose = () => {
  const differentiators = [
    {
      icon: <FaUserGraduate className="text-purple-600 text-4xl mb-4" />,
      title: "By Students, For Students",
      desc: "Born in the hostels, built in the lecture halls. MKET isn't corporate — it's built by students who understand campus hustle, midnight deals, and textbook swaps.",
    },
    {
      icon: <FaShieldAlt className="text-purple-600 text-4xl mb-4" />,
      title: "Zero Strangers. Full Trust.",
      desc: "Only verified .edu.ng emails. No ghost sellers. No randoms. Every trade happens between real classmates — safe, secure, and scam-free.",
    },
    {
      icon: <FaBrain className="text-purple-600 text-4xl mb-4" />,
      title: "AI That Gets You",
      desc: "Just type “old laptop” — MKET's AI writes your listing, adds tags, and polishes details. Less typing. More selling. Smarter trading",
    },
    {
      icon: <FaBolt className="text-purple-600 text-4xl mb-4" />,
      title: "From Post to Pickup in Minutes",
      desc: "List. Chat. Meet at the library gate. No shipping, no waiting — just campus speed.",
    },
    {
      icon: <FaHandshake className="text-purple-600 text-4xl mb-4" />,
      title: "Free Forever (Until You're Ready)",
      desc: "No fees. No commissions. No paywalls. We grow with the community — monetization only begins when students are ready for premium tools.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
      title: "More Than a Market — A Movement",
      desc: "Every sale fuels reuse. Every review builds reputation. MKET empowers student entrepreneurs, connects circles, and helps campuses thrive.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 bg-linear-to-b from-purple-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-zendots">
          Why Choose Us
        </h2>
        <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto mb-14 leading-relaxed">
          Built From Campus Up, Not From Corporate Rooms.
          <span className="block mt-2 text-purple-700 font-semibold">
            Simple. Safe. Student-first. Everything you need to buy, sell, and connect — all in one place
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-inter">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-instrument">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-purple-600 text-white p-8 rounded-3xl max-w-4xl mx-auto shadow-lg">
          <h3 className="text-2xl font-bold mb-3">The Hard Truth:</h3>
          <p className="text-purple-50 leading-relaxed">
            Other platforms treat students like side users.
            <strong> MKET makes you the main character.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
