import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTimes } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const phoneNumber = '+254743869564';
  const message = 'Hello! I\'m interested in Emil AI services. Can you help me get started?';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Emil AI Support</h3>
                  <p className="text-xs text-gray-600">We're online now!</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Hi! 👋 Need help with Emil AI? We're here to assist you with any questions about our AI-powered recruitment platform.
            </p>
            <button
              onClick={handleClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              Start Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <FontAwesomeIcon 
          icon={isExpanded ? faTimes : faWhatsapp} 
          className={`text-xl transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
        />
      </motion.button>

      {/* Pulse animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-green-500 rounded-full opacity-30"
      />
    </div>
  );
}
