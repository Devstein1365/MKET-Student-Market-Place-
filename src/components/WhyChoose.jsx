import React from "react";
import { 
  FaUserGraduate, 
  FaShieldAlt, 
  FaBolt, 
  FaUsers, 
  FaBrain, 
  FaHandshake 
} from "react-icons/fa";

const WhyChoose = () => {
  const differentiators = [
    {
      icon: <FaUserGraduate className="text-purple-600 text-4xl mb-4" />,
      title: "By Students, For Students",
      desc: "Born in the hostels, built in the lecture halls. MKET isn’t designed in a boardroom — it’s shaped by real campus hustle, late-night sales, and textbook swaps.",
    },
    {
      icon: <FaShieldAlt className="text-purple-600 text-4xl mb-4" />,
      title: "Zero Strangers. Full Trust.",
      desc: "Only verified .edu.ng emails. No fake accounts, no ghost sellers. You’re trading with classmates, not randos. Scams don’t survive here.",
    },
    {
      icon: <FaBrain className="text-purple-600 text-4xl mb-4" />,
      title: "AI That Gets You",
      desc: "Type “old laptop” — get a pro listing in seconds. AI writes, tags, and even spots wear in your photos. Less typing, more selling.",
    },
    {
      icon: <FaBolt className="text-purple-600 text-4xl mb-4" />,
      title: "From Post to Pickup in Minutes",
      desc: "List → Chat → Meet at the library gate. No shipping. No waiting. Just campus speed.",
    },
    {
      icon: <FaHandshake className="text-purple-600 text-4xl mb-4" />,
      title: "Free Forever (Until You’re Ready)",
      desc: "No fees. No commissions. No paywalls. We grow with you — monetization comes only when the community demands premium power.",
    },
    {
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
      title: "More Than a Market — A Movement",
      desc: "Every sale funds reuse. Every review builds reputation. MKET is where student entrepreneurs launch, circles close, and campuses thrive.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-linear-to-b from-purple-100 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-zendots">
          Why MKET Wins
        </h2>
        <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto mb-14 leading-relaxed">
          We didn’t copy Jiji. We didn’t clone Facebook Marketplace.  
          <span className="block mt-2 text-purple-700 font-semibold">
            We built the platform Nigerian students actually need — from the ground up.
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
            <strong> MKET treats you like the main character.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;