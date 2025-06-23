import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Since CookieIcon isn't available in v24, we'll use DocumentTextIcon as alternative
const CookieIcon = DocumentTextIcon;

const CookiePolicy = () => {
  const sections = [
    {
      icon: InformationCircleIcon,
      title: "What Are Cookies",
      content: [
        "Cookies are small text files stored on your device when you visit websites.",
        "They help websites remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.",
        "Our cookies don't store personal information like your name or address, but they do help us provide you with a better online experience."
      ]
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: "How We Use Cookies",
      content: [
        "Essential Cookies: Necessary for the website to function and cannot be switched off.",
        "Performance Cookies: Help us understand how visitors interact with our website.",
        "Functional Cookies: Enable enhanced functionality and personalization.",
        "Targeting Cookies: Set by our advertising partners to build a profile of your interests."
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Your Cookie Choices",
      content: [
        "You can manage your cookie preferences through our cookie consent banner.",
        "Most web browsers allow some control of cookies through browser settings.",
        "Disabling cookies may affect your ability to use certain features of our website.",
        "To opt out of interest-based advertising, visit aboutads.info/choices or youronlinechoices.eu."
      ]
    },
    {
      icon: CookieIcon,
      title: "Types of Cookies We Use",
      content: [
        "Session Cookies: Temporary cookies that expire when you close your browser.",
        "Persistent Cookies: Remain on your device for a set period or until deleted.",
        "First-party Cookies: Set by our website domain.",
        "Third-party Cookies: Set by domains other than ours, like analytics services."
      ]
    },
    {
      icon: ClockIcon,
      title: "Cookie Duration",
      content: [
        "Session cookies expire when you close your browser.",
        "Persistent cookies remain for varying periods from 30 days to 2 years.",
        "We regularly review cookie durations to ensure they're only stored as long as necessary.",
        "You can delete cookies at any time through your browser settings."
      ]
    }
  ];

  const cookieTable = [
    {
      name: "_ga",
      purpose: "Google Analytics - Distinguishes users",
      duration: "2 years",
      type: "Performance"
    },
    {
      name: "_gid",
      purpose: "Google Analytics - Distinguishes users",
      duration: "24 hours",
      type: "Performance"
    },
    {
      name: "_gat",
      purpose: "Google Analytics - Throttles request rate",
      duration: "1 minute",
      type: "Performance"
    },
    {
      name: "cookie_consent",
      purpose: "Remembers your cookie preferences",
      duration: "1 year",
      type: "Essential"
    },
    {
      name: "session_id",
      purpose: "Maintains your logged-in session",
      duration: "Session",
      type: "Essential"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-[98.7vw]">
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
                <CookieIcon className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Cookie <span className="text-purple-400">Policy</span>
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
              This Cookie Policy explains how we use cookies and similar tracking technologies on our website. By using our site, you consent to our use of cookies in accordance with this policy.
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

            {/* Cookie Table */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 overflow-x-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Cookies We Use
              </h2>
              <div className="rounded-lg border border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Cookie Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {cookieTable.map((cookie, index) => (
                      <motion.tr
                        key={cookie.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ backgroundColor: 'rgba(107, 33, 168, 0.1)' }}
                        className="hover:bg-purple-900/10 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-400">
                          {cookie.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {cookie.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {cookie.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cookie.type === 'Essential' ? 'bg-green-900/30 text-green-400' :
                            cookie.type === 'Performance' ? 'bg-blue-900/30 text-blue-400' :
                            'bg-purple-900/30 text-purple-400'
                          }`}>
                            {cookie.type}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

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
                If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;