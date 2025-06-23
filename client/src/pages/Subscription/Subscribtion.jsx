import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Subscription = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    transition: { duration: 0.3, ease: "easeOut" }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <section className="text-gray-300 bg-gray-950 w-screen h-screen overflow-auto">
      <div className="w-full min-h-full flex flex-col">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full py-8 flex flex-col items-center"
        >
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-white">Choose Your Plan</h1>
          <p className="lg:w-2/3 text-center mx-auto leading-relaxed text-lg text-gray-400">
            Select the perfect plan for your needs with flexible pricing options.
          </p>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex mx-auto border-2 border-indigo-600 rounded-lg overflow-hidden mt-8 w-fit"
          >
            <button className="py-2 px-6 bg-indigo-600 text-white focus:outline-none font-medium">
              Monthly
            </button>
            <button className="py-2 px-6 text-gray-300 hover:text-white focus:outline-none font-medium hover:bg-gray-800 transition-colors">
              Annually
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards - Full Width Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex-grow px-4 pb-12"
        >
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              variants={cardVariants}
              className="w-full h-full"
            >
                <Link to={'/dashboard'}> 
                    <motion.div 
                        whileHover={hoverEffect}
                        whileTap={tapEffect}
                        className="h-full p-6 rounded-xl border-2 border-gray-800 flex flex-col bg-gray-900/50 hover:border-gray-700 transition-all"
                    >
                        <h2 className="text-sm tracking-widest text-indigo-400 title-font mb-1 font-medium">START</h2>
                        <h1 className="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">Free</h1>
                        
                        <PlanFeature text="Basic feature access" />
                        <PlanFeature text="Limited resources" />
                        <PlanFeature text="Community support" />

                            <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center mt-auto text-white bg-gray-800 border-0 py-3 px-4 w-full focus:outline-none hover:bg-gray-700 rounded-lg transition-all"
                            > 
                                Get Started
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </motion.button>
                            <p className="text-xs text-gray-500 mt-3">Perfect for getting started</p>
                    </motion.div>
                </Link> 
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              variants={cardVariants}
              className="w-full h-full"
            >
              <Link to={'/paymentmethods'}> 
                <motion.div 
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                    className="h-full p-6 rounded-xl border-2 border-indigo-600 flex flex-col relative bg-gray-900 hover:border-indigo-500 transition-all"
                >
                    <span className="bg-indigo-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl-lg">POPULAR</span>
                    <h2 className="text-sm tracking-widest text-indigo-400 title-font mb-1 font-medium">PRO</h2>
                    <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-800">
                    <span>$38</span>
                    <span className="text-lg ml-1 font-normal text-gray-400">/mo</span>
                    </h1>
                    
                    <PlanFeature text="All basic features" />
                    <PlanFeature text="Enhanced resources" />
                    <PlanFeature text="Priority support" />
                    <PlanFeature text="Advanced analytics" />
                    
                    <motion.button 
                    whileHover={{ scale: 1.03, backgroundColor: "#4f46e5" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center mt-auto text-white bg-indigo-600 border-0 py-3 px-4 w-full focus:outline-none hover:bg-indigo-700 rounded-lg transition-all"
                    >
                    Upgrade Now
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    </motion.button>
                    <p className="text-xs text-gray-500 mt-3">Best for professionals</p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Business Plan */}
            <motion.div 
              variants={cardVariants}
              className="w-full h-full"
            >
              <Link to={'/paymentmethods'}> 
                <motion.div 
                  whileHover={hoverEffect}
                  whileTap={tapEffect}
                  className="h-full p-6 rounded-xl border-2 border-gray-800 flex flex-col bg-gray-900/50 hover:border-gray-700 transition-all"
                >
                  <h2 className="text-sm tracking-widest text-indigo-400 title-font mb-1 font-medium">BUSINESS</h2>
                  <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-800">
                    <span>$56</span>
                    <span className="text-lg ml-1 font-normal text-gray-400">/mo</span>
                  </h1>
                  
                  <PlanFeature text="All pro features" />
                  <PlanFeature text="Unlimited resources" />
                  <PlanFeature text="24/7 dedicated support" />
                  <PlanFeature text="Team collaboration" />
                  <PlanFeature text="Custom integrations" />
                  
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center mt-auto text-white bg-gray-800 border-0 py-3 px-4 w-full focus:outline-none hover:bg-gray-700 rounded-lg transition-all"
                  >
                    Get Business Plan
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </motion.button>
                  <p className="text-xs text-gray-500 mt-3">Ideal for growing teams</p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              variants={cardVariants}
              className="w-full h-full"
            >
              <Link to={'/paymentmethods'}> 
                <motion.div 
                  whileHover={hoverEffect}
                  whileTap={tapEffect}
                  className="h-full p-6 rounded-xl border-2 border-purple-600 flex flex-col bg-gray-900 hover:border-purple-500 transition-all"
                >
                  <h2 className="text-sm tracking-widest text-purple-400 title-font mb-1 font-medium">ENTERPRISE</h2>
                  <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-800">
                    <span>$72</span>
                    <span className="text-lg ml-1 font-normal text-gray-400">/mo</span>
                  </h1>
                  
                  <PlanFeature text="All business features" />
                  <PlanFeature text="Enterprise-grade security" />
                  <PlanFeature text="Custom solutions" />
                  <PlanFeature text="Personal account manager" />
                  <PlanFeature text="API access" />
                  
                  <motion.button 
                    whileHover={{ scale: 1.03, backgroundColor: "#7c3aed" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center mt-auto text-white bg-purple-600 border-0 py-3 px-4 w-full focus:outline-none hover:bg-purple-700 rounded-lg transition-all"
                  >
                    Contact Sales
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </motion.button>
                  <p className="text-xs text-gray-500 mt-3">Tailored for large organizations</p>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlanFeature = ({ text }) => (
  <p className="flex items-center text-gray-300 mb-3">
    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-indigo-400 rounded-full flex-shrink-0">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
    {text}
  </p>
);

export default Subscription;

