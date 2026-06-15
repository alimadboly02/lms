import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headset, X, MessageSquare } from 'lucide-react';
import { SupportMenu } from './SupportMenu';
import { WhatsAppMenu } from './WhatsAppMenu';
import { ChatBot } from './ChatBot';

interface FloatingSupportProps {
  triggerOpen?: boolean;
  onTriggerHandled?: () => void;
}

export function FloatingSupport({ triggerOpen, onTriggerHandled }: FloatingSupportProps = {}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Handle external trigger
  useEffect(() => {
    if (triggerOpen) {
      handleOpenMenu();
      if (onTriggerHandled) {
        onTriggerHandled();
      }
    }
  }, [triggerOpen, onTriggerHandled]);

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleOpenWhatsAppMenu = () => {
    setShowMenu(false);
    setShowWhatsAppMenu(true);
  };

  const handleCloseWhatsAppMenu = () => {
    setShowWhatsAppMenu(false);
  };

  const handleBackToMainMenu = () => {
    setShowWhatsAppMenu(false);
    setShowMenu(true);
  };

  const handleOpenChat = () => {
    setShowMenu(false);
    setShowWhatsAppMenu(false);
    setShowChat(true);
    setUnreadCount(0);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const handleWhatsApp = () => {
    const phone = '962799999999'; // رقم الواتساب
    const message = 'مرحباً، أحتاج مساعدة بخصوص المنصة';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    setShowMenu(false);
    setShowWhatsAppMenu(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        dir="ltr"
      >
        <motion.button
          onClick={showMenu || showWhatsAppMenu || showChat ? (showChat ? handleCloseChat : showWhatsAppMenu ? handleCloseWhatsAppMenu : handleCloseMenu) : handleOpenMenu}
          className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-emerald-500/50 transition-all group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-emerald-400 rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {showMenu || showWhatsAppMenu || showChat ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread Badge */}
          {unreadCount > 0 && !showChat && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}

          {/* Pulse Ring */}
          {unreadCount > 0 && !showChat && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Support Menu */}
      <AnimatePresence>
        {showMenu && (
          <SupportMenu
            onClose={handleCloseMenu}
            onOpenChat={handleOpenChat}
            onWhatsApp={handleOpenWhatsAppMenu}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Menu */}
      <AnimatePresence>
        {showWhatsAppMenu && (
          <WhatsAppMenu
            onClose={handleCloseWhatsAppMenu}
            onWhatsApp={handleWhatsApp}
            onBack={handleBackToMainMenu}
          />
        )}
      </AnimatePresence>

      {/* ChatBot */}
      <AnimatePresence>
        {showChat && <ChatBot onClose={handleCloseChat} />}
      </AnimatePresence>
    </>
  );
}