import { FaUserGraduate, FaShieldAlt, FaBolt, FaUsers } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaUserGraduate className="text-primary text-4xl mb-4" />,
      title: "Built for Students",
      desc: "MKET understands campus life — it’s created by students, for students. Every feature solves a real student problem.",
    },
    {
      icon: <FaShieldAlt className="text-primary text-4xl mb-4" />,
      title: "Safe & Verified",
      desc: "Only verified school emails are allowed. You trade within your trusted community — no scammers, no outsiders.",
    },
    {
      icon: <FaBolt className="text-primary text-4xl mb-4" />,
      title: "Simple & Fast",
      desc: "Buy, sell, and connect effortlessly. The entire process — from listing to chat — happens seamlessly in minutes.",
    },
    {
      icon: <FaUsers className="text-primary text-4xl mb-4" />,
      title: "Community & Growth",
      desc: "More than just a marketplace — MKET builds a student ecosystem where collaboration and trust thrive.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-zendots text-gray-900 mb-6">
          Why Choose Us
        </h2>
        <p className="text-gray-600 font-instrument max-w-2xl mx-auto mb-12">
          We’re not just another platform. MKET is the new way students buy,
          sell, and connect — safely, quickly, and within their own campus.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <h3 className="font-inter text-xl font-semibold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-instrument text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
