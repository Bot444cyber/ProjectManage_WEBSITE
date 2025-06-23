import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ScaleIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const TermsOfService = () => {
  const sections = [
    {
      icon: ScaleIcon,
      title: "Acceptance of Terms",
      content: [
        "By accessing or using our services, you agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time, with changes effective immediately upon posting."
      ]
    },
    {
      icon: UserGroupIcon,
      title: "User Responsibilities",
      content: [
        "You must be at least 18 years old to use our services.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree not to use our services for any illegal or unauthorized purpose.",
        "You will not transmit any viruses, malware, or harmful code through our services."
      ]
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Prohibited Activities",
      content: [
        "Reverse engineering, decompiling, or disassembling our services",
        "Using automated systems to access our services in violation of our rate limits",
        "Impersonating any person or entity",
        "Engaging in any activity that interferes with other users' access to our services"
      ]
    },
    {
      icon: ArrowPathIcon,
      title: "Service Modifications",
      content: [
        "We may modify, suspend, or discontinue any aspect of our services at any time.",
        "We are not liable for any modification, suspension, or discontinuation of services.",
        "We may impose limits on certain features or restrict access to parts of our services."
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Intellectual Property",
      content: [
        "All content and materials provided through our services are our property or our licensors' property.",
        "You may not reproduce, distribute, or create derivative works without our express permission.",
        "Any feedback or suggestions you provide may be used by us without obligation to you."
      ]
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Disclaimer of Warranties",
      content: [
        "Our services are provided 'as is' without warranties of any kind.",
        "We do not guarantee that our services will be uninterrupted or error-free.",
        "We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose."
      ]
    },
    {
      icon: ScaleIcon,
      title: "Limitation of Liability",
      content: [
        "We shall not be liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability for any claims related to our services shall not exceed the amount you paid us in the past 12 months.",
        "Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you."
      ]
    },
    {
      icon: UserGroupIcon,
      title: "Governing Law",
      content: [
        "These terms shall be governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.",
        "Any disputes shall be resolved in the courts located in [Your Jurisdiction].",
        "Our failure to enforce any right or provision will not be considered a waiver of those rights."
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
                <ScaleIcon className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Terms of <span className="text-purple-400">Service</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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
              Please read these Terms of Service carefully before using our services. These terms govern your access to and use of our website, applications, and other products and services.
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
                  <section.icon className="h-6 w-6 mr-3 text-purple-400" />
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
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white transition-colors duration-300 text-center"
                >
                  Contact Form
                </Link>
                <a
                  href="mailto:legal@yourcompany.com"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium text-white transition-colors duration-300 text-center"
                >
                  legal@yourcompany.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;