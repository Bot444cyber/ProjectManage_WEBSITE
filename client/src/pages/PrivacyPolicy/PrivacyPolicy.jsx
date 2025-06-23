import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, LockClosedIcon, DocumentTextIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect personal information you provide directly to us, such as your name, email address, and contact details when you register for an account or use our services.",
        "We automatically collect certain information about your device and usage of our services through cookies and similar technologies.",
        "We may receive information from third-party sources to help us improve our services and prevent fraud."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services",
        "To communicate with you about products, services, offers, and events",
        "To monitor and analyze trends, usage, and activities in connection with our services",
        "To detect, investigate, and prevent fraudulent transactions and other illegal activities"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties.",
        "We may share information with vendors and service providers who need access to perform work on our behalf.",
        "We may disclose information if required by law or to protect the rights, property, and safety of ourselves or others."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information.",
        "All data is encrypted in transit and at rest using industry-standard protocols.",
        "We regularly audit our systems for vulnerabilities and attacks."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "You may access, correct, or delete your personal information through your account settings.",
        "You can object to processing of your personal information, ask us to restrict processing, or request portability.",
        "You may opt out of receiving promotional communications from us.",
        "You can complain to a data protection authority about our collection and use of your personal information."
      ]
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.",
        "We will let you know via email and/or a prominent notice on our service prior to changes becoming effective."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-[98.9vw]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900/30 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-purple-900/20">
                <ShieldCheckIcon className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Privacy <span className="text-purple-400">Policy</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-gray-300 mb-8">
              At our company, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our services.
            </p>

            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                  {index === 0 && <DocumentTextIcon className="h-6 w-6 mr-3 text-purple-400" />}
                  {index === 1 && <LockClosedIcon className="h-6 w-6 mr-3 text-purple-400" />}
                  {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <span className="text-purple-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-purple-400" />
                Contact Us
              </h3>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white transition-colors duration-300 text-center"
                >
                  Contact Form
                </Link>
                <a
                  href="mailto:privacy@yourcompany.com"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium text-white transition-colors duration-300 text-center"
                >
                  privacy@yourcompany.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;