import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const SignOutPage = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
        localStorage.removeItem('token')
        navigate('/adminpannel')
    }, 1500);

  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col w-[100vw]">
      {/* Navigation */}
      <nav className="bg-black py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/dashboard" className="flex items-center space-x-2">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-lg font-medium">Back to Dashboard</span>
            </a>
          </motion.div>
          <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            ProManage
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!isSigningOut ? (
            <motion.div
              key="signout-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
            >
              <div className="p-8 text-center">
                {!isConfirming ? (
                  <>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="mx-auto h-16 w-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mb-6"
                    >
                      <ExclamationTriangleIcon className="h-8 w-8 text-purple-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">Ready to leave?</h2>
                    <p className="text-gray-400 mb-6">
                      You'll need to sign in again to access your account.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsConfirming(true)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition-all"
                      >
                        Sign Out
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.history.back()}
                        className="w-full bg-gray-700 text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mx-auto h-16 w-16 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mb-6"
                    >
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
                    <p className="text-gray-400 mb-6">
                      This will end your current session and log you out of the system.
                    </p>
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignOut}
                        className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-red-500/20 transition-all"
                      >
                        Yes, Sign Out
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsConfirming(false)}
                        className="flex-1 bg-gray-700 text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signing-out"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mx-auto h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full mb-6"
              />
              <h2 className="text-2xl font-bold mb-2">Signing Out...</h2>
              <p className="text-gray-400">Please wait while we secure your account</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-black py-4 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ProManage. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignOutPage;