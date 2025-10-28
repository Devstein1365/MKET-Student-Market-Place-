import { FaLock, FaBolt, FaUsers, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyMket = () => {
  const values = [
    {
      icon: <FaLock className="text-primary text-4xl mb-3" />,
      title: "Trust First",
      desc: "Every user is verified — because trust isn’t optional, it’s the foundation.",
    },
    {
      icon: <FaBolt className="text-primary text-4xl mb-3" />,
      title: "Simplicity Wins",
      desc: "From listing to meetup, MKET keeps everything frictionless. Fast. Familiar. Fun.",
    },
    {
      icon: <FaUsers className="text-primary text-4xl mb-3" />,
      title: "Community Over Competition",
      desc: "Every deal builds connection. Every connection shapes the next generation of student entrepreneurs.",
    },
    {
      icon: <FaBrain className="text-primary text-4xl mb-3" />,
      title: "Innovation for Impact",
      desc: "From AI-powered listings to secure transactions, we use technology to make campus life smarter, not harder.",
    },
  ];

  return (
    <section id="why-mket" className="bg-white py-24 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50 opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-zendots text-gray-900 mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why MKET?
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-lg font-instrument text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Because every campus deserves its own economy — built by students, powered by trust, and designed for tomorrow.
        </motion.p>

        {/* Brand Story */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-instrument text-gray-700 text-lg leading-relaxed">
            MKET started with one frustration — students getting scammed, ignored, or overcharged
            on platforms never built for them. Born from real campus experience, MKET was designed
            from the ground up to make student trade smarter, safer, and community-driven.
          </p>

          <p className="font-instrument text-gray-700 text-lg leading-relaxed mt-4">
            Our vision is simple — to power a trusted, student-led economy across every African university,
            where ideas, goods, and opportunities flow as freely as friendships.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                {value.icon}
                <h3 className="font-inter text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-instrument text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-zendots text-2xl text-primary mb-3">
            More Than a Marketplace — A Movement.
          </h3>
          <p className="font-instrument text-gray-700 text-lg mb-8">
            MKET isn’t just where students trade — it’s where they belong, build, and begin.
            This is the foundation of the next-generation student economy.
          </p>

          <a
            href="/auth"
            className="inline-block px-8 py-3 bg-primary text-white font-inter rounded-lg hover:bg-blue-700 transition"
          >
            Join the Movement
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMket;
