import { motion } from "framer-motion";

const PaymentMethods = () => {
  const paymentOptions = [
    { name: "Credit Card", icon: "💳", color: "from-blue-500 to-blue-600" },
    { name: "PayPal", icon: "🔵", color: "from-blue-400 to-indigo-500" },
    { name: "Apple Pay", icon: "🍏", color: "from-gray-700 to-gray-900" },
    { name: "Google Pay", icon: "🔴", color: "from-red-400 to-yellow-500" },
    { name: "Bank Transfer", icon: "🏦", color: "from-green-500 to-emerald-600" },
    { name: "Crypto", icon: "🪙", color: "from-purple-500 to-pink-600" },
  ];

  return (
    <div 
      onClick={() => {alert('Our payment processing system is currently undergoing scheduled maintenance to improve performance and security.')}}
      className="max-h-[500vh] min-h-screen w-screen max-w-[500vw] bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 20% 30%, rgba(55, 65, 81, 0.2) 0%, rgba(17, 24, 39, 1) 60%)"
      }}
    >
      {/* Dynamic background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-purple-600 rounded-full filter blur-[80px] opacity-30 animate-float1"></div>
        <div className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] bg-indigo-600 rounded-full filter blur-[90px] opacity-20 animate-float2"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[28vw] h-[28vw] max-w-[280px] max-h-[280px] bg-blue-600 rounded-full filter blur-[70px] opacity-20 animate-float3"></div>
      </div>

      {/* Fluid main container - now narrower and centered */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-900/80 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl"
        style={{
          width: "calc(100% - 2rem)",
          maxWidth: "800px", // Reduced from 1200px
          minHeight: "60vh",
          maxHeight: "80vh",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-gray-700/50"></div>
        
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
        >
          Select Payment Method
        </motion.h2>

        {/* Responsive grid - made more compact */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-full overflow-y-auto custom-scrollbar px-2">
          {paymentOptions.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${method.color} p-3 sm:p-4 rounded-lg cursor-pointer border border-gray-700/50 hover:border-indigo-400 transition-all relative overflow-hidden h-full min-h-[100px]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex flex-col items-center justify-center h-full relative z-10 p-1">
                <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{method.icon}</span>
                <span className="font-medium text-gray-100 text-xs sm:text-sm text-center">{method.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-5 md:pt-6 border-t border-gray-800 flex items-center justify-center flex-wrap"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs sm:text-sm text-gray-300 text-center">256-bit SSL encrypted secure payments</span>
        </motion.div>
      </motion.div>

      {/* Custom styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(165, 180, 252, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(165, 180, 252, 0.6);
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-5%, -5%) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(4%, 4%) rotate(-1deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(3%, -3%) rotate(3deg); }
        }
        .animate-float1 { animation: float1 15s ease-in-out infinite; }
        .animate-float2 { animation: float2 12s ease-in-out infinite; }
        .animate-float3 { animation: float3 18s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PaymentMethods;