import { 
    CodeBracketIcon,
    ServerStackIcon,
    CloudArrowUpIcon,
    ShieldCheckIcon,
    Cog6ToothIcon,
    ChartBarSquareIcon
  } from '@heroicons/react/24/outline';
  import { motion } from 'framer-motion';
  import { Link } from 'react-router-dom';
  
  const Services = () => {
    const services = [
      {
        icon: CodeBracketIcon,
        title: "Custom Development",
        description: "Tailored software solutions designed to meet your specific business requirements and workflows.",
        features: [
          "Bespoke application development",
          "API integration services",
          "Legacy system modernization",
          "Cross-platform solutions"
        ]
      },
      {
        icon: ServerStackIcon,
        title: "DevOps & Cloud",
        description: "Streamlined deployment and infrastructure management for optimal performance and scalability.",
        features: [
          "CI/CD pipeline implementation",
          "Containerization & orchestration",
          "Cloud migration services",
          "Infrastructure as Code (IaC)"
        ]
      },
      {
        icon: CloudArrowUpIcon,
        title: "Digital Transformation",
        description: "Comprehensive strategies to modernize your technology stack and business processes.",
        features: [
          "Process automation",
          "Data-driven decision making",
          "Workflow optimization",
          "Change management"
        ]
      },
      {
        icon: ShieldCheckIcon,
        title: "Security Solutions",
        description: "Enterprise-grade security measures to protect your data and infrastructure.",
        features: [
          "Penetration testing",
          "Compliance auditing",
          "Threat monitoring",
          "Security training"
        ]
      },
      {
        icon: Cog6ToothIcon,
        title: "Managed Services",
        description: "Proactive monitoring and maintenance to ensure system reliability and performance.",
        features: [
          "24/7 system monitoring",
          "Performance optimization",
          "Incident response",
          "Regular health checks"
        ]
      },
      {
        icon: ChartBarSquareIcon,
        title: "Data Analytics",
        description: "Transform raw data into actionable insights with our advanced analytics solutions.",
        features: [
          "Business intelligence dashboards",
          "Predictive analytics",
          "Data visualization",
          "ETL pipeline development"
        ]
      }
    ];
  
    const stats = [
      { value: "200+", label: "Projects Completed" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Availability" },
      { value: "5+", label: "Years Experience" }
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Our <span className="text-purple-400">Professional</span> Services
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                Comprehensive technology solutions designed to drive your business forward in today's digital landscape.
              </p>
            </motion.div>
          </div>
        </section>
  
        {/* Services Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Enterprise <span className="text-purple-400">Solutions</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                We deliver cutting-edge services tailored to your unique business challenges.
              </p>
            </motion.div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:ring-1 hover:ring-purple-500"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-900/50 text-purple-400 mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-4 bg-gray-700/50">
                    <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-purple-900/40 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <p className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.value}</p>
                  <p className="text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-8 md:p-10 shadow-xl"
            >
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Ready to discuss your project?
                  </h2>
                  <p className="text-gray-400">
                    Our team of experts is ready to help you navigate your digital transformation journey.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white shadow-lg transition-all duration-300 flex items-center"
                    >
                      Contact Us
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Services;