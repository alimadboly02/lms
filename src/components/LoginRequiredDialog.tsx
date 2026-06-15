import { motion } from 'motion/react';
import { Lock, X, LogIn, UserPlus } from 'lucide-react';

interface LoginRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginRequiredDialog({ isOpen, onClose, onLogin, onSignup }: LoginRequiredDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-[5px] shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with Lock Icon */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-10 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-5 -right-5 w-24 h-24 border-2 border-white/20 rounded-full"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-2 border-white/15 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">محتوى محمي</h2>
            <p className="text-white/90">يجب تسجيل الدخول للوصول إلى هذا المحتوى</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-600 text-center mb-8">
            للاستمرار في تصفح المواد التعليمية والاستفادة من جميع الخدمات، يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد.
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            {/* Login Button */}
            <button
              onClick={onLogin}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-[5px] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-12 h-12 border border-white/15 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
              </div>
              <LogIn className="w-5 h-5 relative z-10" />
              <span className="relative z-10">تسجيل الدخول</span>
            </button>

            {/* Signup Button */}
            <button
              onClick={onSignup}
              className="w-full py-4 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold rounded-[5px] transition-all flex items-center justify-center gap-3 group"
            >
              <UserPlus className="w-5 h-5" />
              <span>إنشاء حساب جديد</span>
            </button>

            {/* Continue as Guest (Cancel) */}
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
            >
              المتابعة بدون تسجيل
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
