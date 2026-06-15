import { motion } from 'motion/react';
import { MessageCircle, FileText, BookOpen, Calendar, ClipboardList, HelpCircle, ArrowRight } from 'lucide-react';

interface WhatsAppMenuProps {
  onClose: () => void;
  onBack: () => void;
  onWhatsApp: () => void;
}

const whatsappOptions = [
  {
    id: 'exams',
    icon: ClipboardList,
    title: 'الامتحانات والاختبارات',
    description: 'استفسارات عن الامتحانات',
    message: 'مرحبا، أريد الاستفسار عن الامتحانات والاختبارات'
  },
  {
    id: 'dictations',
    icon: FileText,
    title: 'الإملائيات',
    description: 'أسئلة حول الإملائيات',
    message: 'مرحبا، أريد الاستفسار عن الإملائيات'
  },
  {
    id: 'plans',
    icon: Calendar,
    title: 'الخطط الدراسية',
    description: 'معلومات عن الخطط الدراسية',
    message: 'مرحبا، أريد الاستفسار عن الخطط الدراسية'
  },
  {
    id: 'reviews',
    icon: BookOpen,
    title: 'المراجعات والخلاصات',
    description: 'مراجعات الوحدات والخلاصات',
    message: 'مرحبا، أريد الاستفسار عن المراجعات والخلاصات'
  },
  {
    id: 'general',
    icon: HelpCircle,
    title: 'استفسار عام',
    description: 'أي استفسار آخر',
    message: 'مرحبا، لدي استفسار عام'
  }
];

export function WhatsAppMenu({ onClose, onBack, onWhatsApp }: WhatsAppMenuProps) {
  const handleOptionClick = (message: string) => {
    const phoneNumber = '962791234567'; // رقم الواتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    onClose();
    onWhatsApp();
  };

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
        className="fixed bottom-24 left-6 z-50 bg-white rounded-[15px] shadow-2xl w-80 overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto border border-gray-100"
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
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <button
                onClick={onBack}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold flex-1">التواصل عبر واتساب</h3>
            </div>
            <p className="text-emerald-50 text-xs mr-11">اختر نوع الاستفسار</p>
          </div>
        </div>

        {/* Options */}
        <div className="p-4 space-y-2">
          {whatsappOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                onClick={() => handleOptionClick(option.message)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-[5px] transition-all group border border-gray-100 hover:border-emerald-200 hover:shadow-md relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle decorative element */}
                <div className="absolute top-1 left-1 w-8 h-8 border border-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-right relative z-10">
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{option.title}</h4>
                  <p className="text-gray-500 text-xs">{option.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            سيتم فتح واتساب للتواصل المباشر 💬
          </p>
        </div>
      </motion.div>
    </>
  );
}