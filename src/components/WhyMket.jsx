import {
  FaLock,
  FaBolt,
  FaUsers,
  FaBrain,
  FaLeaf,
  FaRocket,
  FaHeart,
  FaLightbulb,
} from "react-icons/fa";
import { motion } from "framer-motion";

const WhyMket = () => {
  const pillars = [
    {
      icon: <FaLock className="text-purple-600 text-5xl mb-5" />,
      title: "Verified Students Only",
      desc: "We don't just verify emails — we verify *reality*. Only students. Only your campus. Scammers get auto-blocked before they type “hello”.",
      color: "from-purple-100 to-purple-50",
    },
    {
      icon: <FaBolt className="text-purple-600 text-5xl mb-5" />,
      title: "Trade in Minutes, Not Days",
      desc: "Post in 30 seconds. Find in 10. Meet in 5. No apps. No shipping. Just walk to the gate. Done.",
      color: "from-indigo-100 to-indigo-50",
    },
    {
      icon: <FaBrain className="text-purple-600 text-5xl mb-5" />,
      title: "Smart Listings, Written for You",
      desc: "Upload a blurry photo → get a pro description. “Used laptop, 8GB, minor scratch” — AI writes it. You just click post.",
      color: "from-violet-100 to-violet-50",
    },
    {
      icon: <FaUsers className="text-purple-600 text-5xl mb-5" />,
      title: "Campus-First Connections",
      desc: "Every sale is a connection. Every review is reputation. This isn’t eBay — it’s your campus social network with prices.",
      color: "from-purple-100 to-purple-50",
    },
    {
      icon: <FaLeaf className="text-purple-600 text-5xl mb-5" />,
      title: "Every Sale, One Less Waste",
      desc: "Reuse > Recycle > Regret. One textbook resold = one tree saved. One dorm chair = one less landfill trip.",
      color: "from-emerald-100 to-emerald-50",
    },
    {
      icon: <FaRocket className="text-purple-600 text-5xl mb-5" />,
      title: "Free Forever — Until You Grow",
      desc: "No fees. No ads. No tricks. We grow with you — monetization only when you demand premium tools.",
      color: "from-pink-100 to-pink-50",
    },
  ];

  return (
    <section
      id="why-mket"
      className="py-32 bg-linear-to-b from-white via-purple-50 to-white relative overflow-hidden"
    >
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Hero Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-purple-700 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-6 font-zendots leading-tight">
            Why We Built MKET?
          </h2>
          <p className="text-[19px] md:text-2xl text-gray-700 font-medium max-w-4xl  mx-auto leading-relaxed">
            Because{" "}
            <span className="text-purple-700 font-bold">
              campus trading isn't safe on WhatsApp
            </span>
            . <br />
            Because{" "}
            <span className="text-purple-700 font-bold">
              you deserve a marketplace made for you
            </span>
            . <br />
          </p>
        </motion.div>

        {/* Origin Story — Short, Fast, Real */}
        <motion.div
          className="max-w-4xl mx-auto mb-20 bg-white p-8 rounded-3xl shadow-md border border-purple-100"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <FaLightbulb className="text-yellow-500 text-3xl mt-1 shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-inter">
                It Started With the Stress of Buying
              </h3>
              <p className="text-gray-700 leading-relaxed font-instrument">
                Finding simple things on campus was exhausting — too many
                groups, too much noise. <br /> So we built {"  "}
                <strong className="text-purple-700">MKET- </strong>{" "}
                <span className="text-purple-500">
                  one trusted place where students can buy and sell easily,
                  without stress or endless group searches.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillars Grid — Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className={`relative bg-linear-to-br ${pillar.color} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="inline-block p-4 bg-white rounded-2xl shadow-md mb-6 group-hover:shadow-lg transition-shadow">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-inter">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-instrument">
                  {pillar.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaHeart className="text-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision Statement — Full Bleed */}
        <motion.div
          className="bg-linear-to-r from-purple-600 via-purple-700 to-indigo-700 text-white p-12 rounded-3xl shadow-2xl max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 font-zendots">
              This Isn’t Just an App
            </h3>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-instrument text-purple-50">
              MKET is{" "}
              <strong>
                building an Africa's student-driven digital economy
              </strong>
              . where every sale fuels the next entrepreneur. Every review
              builds reputation. Every transaction builds trust.
              <span className="block mt-4 text-yellow-300 text-[20px]">
                This is where the next generation of campus founders begin.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <a
            href="/auth"
            aria-label="Join the MKET platform"
            className="inline-flex items-center gap-3 px-8 py-5 bg-purple-600 text-white text-[16px] font-bold rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <FaRocket className="text-xl" />
            Start Trading Smarter on Campus
          </a>
          <p className="mt-6 text-gray-600 font-instrument">
            <em>Free for students. Built in FUTMINNA.</em>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMket;
