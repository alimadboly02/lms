import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export function ForgotPasswordPage({ onBack }: ForgotPasswordPageProps) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'code' | 'success'>('phone');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transform values for parallax
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const x2 = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const x3 = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const y3 = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('يرجى إدخال رقم الهاتف');
      return;
    }

    // محاكاة إرسال كود التحقق
    setStep('code');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!verificationCode || !newPassword) {
      setError('يرجى إدخال جميع الحقول');
      return;
    }

    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    // محاكاة تغيير كلمة المرور
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Background Section with Decorative Shapes */}
      <div 
        className="relative bg-gray-100 pt-16 pb-24 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Decorative Shapes - Dots Pattern Left */}
        <motion.div
          style={{ x: x1, y: y1 }}
          className="absolute top-8 left-12"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-teal-400/40">
            {[...Array(7)].map((_, row) => (
              [...Array(7)].map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 15}
                  cy={10 + row * 15}
                  r="2"
                  fill="currentColor"
                />
              ))
            ))}
          </svg>
        </motion.div>

        {/* Animated Decorative Shapes - Dots Pattern Right */}
        <motion.div
          style={{ x: x2, y: y2 }}
          className="absolute top-4 right-12"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-purple-400/40">
            {[...Array(7)].map((_, row) => (
              [...Array(7)].map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 15}
                  cy={10 + row * 15}
                  r="2"
                  fill="currentColor"
                />
              ))
            ))}
          </svg>
        </motion.div>

        {/* Animated Wave Lines - Right Side */}
        <motion.div
          style={{ x: x3, y: y3 }}
          className="absolute bottom-8 right-16"
        >
          <svg width="100" height="60" viewBox="0 0 100 60" className="text-teal-400/50">
            <path
              d="M 0 30 Q 12.5 15, 25 30 T 50 30 T 75 30 T 100 30"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 0 40 Q 12.5 25, 25 40 T 50 40 T 75 40 T 100 40"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 0 50 Q 12.5 35, 25 50 T 50 50 T 75 50 T 100 50"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Animated Small Dots - Bottom Left */}
        <motion.div
          style={{ x: x1, y: y1 }}
          className="absolute bottom-12 left-20"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-emerald-400/40">
            {[...Array(5)].map((_, row) => (
              [...Array(5)].map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 15}
                  cy={10 + row * 15}
                  r="2"
                  fill="currentColor"
                />
              ))
            ))}
          </svg>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center container mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            نسيت كلمة المرور
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <span className="text-sm hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>
              الرئيسية
            </span>
            <span className="text-sm">/</span>
            <span className="text-sm hover:text-emerald-600 cursor-pointer transition-colors" onClick={onBack}>
              تسجيل الدخول
            </span>
            <span className="text-sm">/</span>
            <span className="text-sm text-emerald-600 font-semibold">
              نسيت كلمة المرور
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-[15px] p-8 md:p-10">
              {step === 'phone' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">استعادة كلمة المرور</h2>
                  <p className="text-gray-500 text-sm mb-8">
                    أدخل رقم هاتفك المسجل وسنرسل لك كود التحقق
                  </p>

                  <form onSubmit={handleSendCode} className="space-y-6">
                    {/* Phone Field */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07XXXXXXXX"
                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>إرسال كود التحقق</span>
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Back to Login */}
                    <button
                      type="button"
                      onClick={onBack}
                      className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      <span>العودة لتسجيل الدخول</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'code' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">التحقق من الهوية</h2>
                  <p className="text-gray-500 text-sm mb-8">
                    تم إرسال كود التحقق إلى رقم {phone}
                  </p>

                  <form onSubmit={handleVerifyCode} className="space-y-6">
                    {/* Verification Code */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">
                        كود التحقق
                      </label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="أدخل الكود..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">
                        كلمة المرور الجديدة
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="6 أحرف على الأقل..."
                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>تغيير كلمة المرور</span>
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Resend Code */}
                    <p className="text-center text-gray-600 text-sm">
                      لم يصلك الكود؟{' '}
                      <button
                        type="button"
                        onClick={() => setError('')}
                        className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                      >
                        إعادة إرسال
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  {/* Success Icon */}
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">تم بنجاح!</h2>
                  <p className="text-gray-500 text-sm mb-8">
                    تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة
                  </p>

                  <button
                    onClick={onBack}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>العودة لتسجيل الدخول</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}