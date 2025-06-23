import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Add your API call or form handling logic
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative w-[100vw] h-[100vh]">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap w-[100vw] h-[100vh]">
        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative"
        >
          <iframe 
            width="100%" 
            height="100%" 
            title="map" 
            className="absolute inset-0" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0" 
            scrolling="no" 
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" 
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.450)' }}
          ></iframe>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md"
          >
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">OFFICE</h2>
              <p className="mt-1">123 Project Management Blvd, Suite 400</p>
              <p className="mt-1">Tech City, TC 12345</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">SUPPORT</h2>
              <a className="text-indigo-400 leading-relaxed hover:text-indigo-300 transition-colors duration-300">
                support@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">HELPLINE</h2>
              <p className="leading-relaxed">(555) 123-4567</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:mt-0"
        >
          <h2 className="text-white text-lg mb-1 font-medium title-font">Contact Our Team</h2>
          <p className="leading-relaxed mb-5 text-gray-400">
            Have questions about our project management solutions? Reach out to our experts.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-400">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                required
              ></textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg transition-colors duration-300"
            >
              Send Message
            </motion.button>
            
            <p className="text-xs text-gray-500 mt-3">
              We'll get back to you within 24 business hours.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;