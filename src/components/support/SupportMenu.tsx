import { motion } from 'motion/react';
import { MessageCircle, MessageSquare, X } from 'lucide-react';

interface SupportMenuProps {
  onClose: () => void;
  onOpenChat: () => void;
  onWhatsApp: () => void;
}

export function SupportMenu({ onClose, onOpenChat, onWhatsApp }: SupportMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Menu - positioned above button */}
      <motion.div
        className="fixed bottom-24 left-6 z-50 bg-white rounded-[15px] shadow-2xl w-80 overflow-hidden border border-gray-100"
        initial={{ scale: 0, opacity: 0, originX: 0, originY: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-4 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-white/10 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 border border-white/10 rounded-full" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">كيف يمكننا مساعدتك؟</h3>
              <p className="text-emerald-50 text-xs">اختر طريقة التواصل المناسبة</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">
          {/* WhatsApp Option */}
          <motion.button
            onClick={onWhatsApp}
            className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-[5px] transition-all group border border-gray-100 hover:border-emerald-200 hover:shadow-md relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle decorative element */}
            <div className="absolute top-2 left-2 w-12 h-12 border border-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-right relative z-10">
              <h4 className="font-bold text-gray-800 mb-0.5">واتساب</h4>
              <p className="text-gray-500 text-sm">تواصل معنا عبر الواتساب</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Chat Option */}
          <motion.button
            onClick={onOpenChat}
            className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-[5px] transition-all group border border-gray-100 hover:border-emerald-200 hover:shadow-md relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle decorative element */}
            <div className="absolute top-2 left-2 w-12 h-12 border border-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-right relative z-10">
              <h4 className="font-bold text-gray-800 mb-0.5">تواصل معنا</h4>
              <p className="text-gray-500 text-sm">محادثة مباشرة مع الدعم الفني</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            نحن هنا لمساعدتك في أي وقت 💚
          </p>
        </div>
      </motion.div>
    </>
  );
}