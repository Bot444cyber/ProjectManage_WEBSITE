import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 shadow-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 flex items-center justify-start">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative w-full max-w-md"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <motion.input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-white"
              placeholder="Search"
              whileFocus={{
                borderColor: "#3B82F6",
                boxShadow: "0 0 0 1px #3B82F6"
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Notification Bell */}
          <motion.button 
            whileHover={{ 
              scale: 1.1,
              color: "#3B82F6"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Feature add soon.')}
            className="p-1 rounded-full text-gray-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-900"
          >
            <BellIcon className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;