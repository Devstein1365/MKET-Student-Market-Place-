import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can use MKET?",
      answer:
        "Only verified students with valid .edu.ng email addresses can join MKET. This ensures a safe, trusted community where you're only trading with real classmates.",
    },
    {
      question: "Is MKET really free?",
      answer:
        "Yes! MKET is completely free for all students. No listing fees, no transaction fees, no hidden charges. We're building a student-first platform that grows with you.",
    },
    {
      question: "How does the AI listing feature work?",
      answer:
        "Simply upload a photo of your item and provide basic details. Our AI automatically generates a professional description, suggests appropriate tags, and optimizes your listing to help it sell faster.",
    },
    {
      question: "Is it safe to meet buyers/sellers?",
      answer:
        "Yes! All users are verified students from your campus. We recommend meeting in public campus locations like the library, cafeteria, or main gate. Every user has a reputation score based on reviews.",
    },
    {
      question: "What can I buy or sell on MKET?",
      answer:
        "Textbooks, electronics, furniture, clothes, study materials, and any campus-related items. As long as it's legal and follows our community guidelines, you can list it!",
    },
    {
      question: "How do payments work?",
      answer:
        "MKET supports multiple payment methods including cash meetups, bank transfers, and integrated Paystack payments for secure transactions. Choose what works best for you.",
    },
    {
      question: "What if I have a problem with a transaction?",
      answer:
        "We have a dispute resolution system and community moderators to help resolve any issues. You can also leave reviews to help other students make informed decisions.",
    },
    {
      question: "Can I use MKET on my phone?",
      answer:
        "Absolutely! MKET is a progressive web app that works seamlessly on mobile, tablet, and desktop. Install it on your phone for an app-like experience.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#7E22CE] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#14B8A6] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FaQuestionCircle className="text-[#7E22CE] text-3xl" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] font-zen">
              Frequently Asked{" "}
              <span className="bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-transparent bg-clip-text">
                Questions
              </span>
            </h2>
          </div>
          <p className="text-lg text-[#4B5563] font-instrument">
            Everything you need to know about MKET
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#7E22CE]/30 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/50 transition-colors"
              >
                <span className="text-lg font-semibold text-[#111827] font-inter pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <FaChevronDown className="text-[#7E22CE] text-xl" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[#4B5563] leading-relaxed font-instrument">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-[#4B5563] mb-4 font-instrument">
            Still have questions?
          </p>
          <a
            href="mailto:support@mket.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
