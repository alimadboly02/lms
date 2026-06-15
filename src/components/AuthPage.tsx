import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import studentImage from 'figma:asset/e9a06ea81a43d4b3cec0840dcd4c4bdda9c83753.png';

interface AuthPageProps {
  onLoginSuccess: () => void;
  initialMode?: 'login' | 'signup';
  onBack?: () => void;
  onForgotPassword?: () => void;
}

const jordanianCities = [
  'عمان',
  'الزرقاء',
  'إربد',
  'العقبة',
  'السلط',
  'مادبا',
  'جرش',
  'عجلون',
  'الكرك',
  'الطفيلة',
  'معان',
  'المفرق'
];

export function AuthPage({ onLoginSuccess, initialMode = 'login', onForgotPassword }: AuthPageProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
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

  // Login States
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register States
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerGeneration, setRegisterGeneration] = useState<'2008' | '2009'>('2008');
  const [registerCity, setRegisterCity] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginPhone || !loginPassword) {
      setLoginError('يرجى إدخال رقم الهاتف وكلمة المرور');
      return;
    }

    const success = login(loginPhone, loginPassword);
    if (success) {
      onLoginSuccess();
    } else {
      setLoginError('رقم الهاتف أو كلمة المرور غير صحيح');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!registerName || !registerPhone || !registerPassword || !registerCity) {
      setRegisterError('يرجى إدخال جميع الحقول');
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    const success = register(registerName, registerPhone, registerPassword, registerGeneration, registerCity);
    if (success) {
      onLoginSuccess();
    } else {
      setRegisterError('رقم الهاتف مسجل مسبقاً');
    }
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
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <span className="text-sm hover:text-emerald-600 cursor-pointer transition-colors">الرئيسية</span>
            <span className="text-sm">/</span>
            <span className="text-sm text-emerald-600 font-semibold">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Form Section - على اليمين في RTL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <div className="bg-white rounded-[15px] p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بعودتك!</h2>
                      <p className="text-gray-500 text-sm mb-8">سجل دخولك إلى حسابك واستمر معنا</p>

                      <form onSubmit={handleLogin} className="space-y-6">
                        {/* Phone Field */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">
                            أدخل رقم هاتفك
                          </label>
                          <input
                            type="tel"
                            value={loginPhone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPhone(e.target.value)}
                            placeholder="أدخل رقم الهاتف..."
                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                          />
                        </div>

                        {/* Password Field */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">
                            أدخل كلمة المرور
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={loginPassword}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                              placeholder="أدخل كلمة المرور..."
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <div className="mt-2 text-left">
                            <button
                              type="button"
                              onClick={onForgotPassword}
                              className="text-xs text-gray-900 hover:text-gray-700 transition-colors font-medium"
                            >
                              نسيت كلمة المرور؟
                            </button>
                          </div>
                        </div>

                        {/* Error Message */}
                        {loginError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                          >
                            {loginError}
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                        >
                          <span>تسجيل الدخول</span>
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>

                        {/* Switch to Register */}
                        <p className="text-center text-gray-600 text-sm">
                          ليس لديك حساب؟{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setIsLogin(false);
                              setLoginError('');
                            }}
                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                          >
                            سجل الآن
                          </button>
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">انضم إلينا!</h2>
                      <p className="text-gray-500 text-sm mb-8">أنشئ حسابك وابدأ رحلة التعلم</p>

                      <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name Field */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">
                            الاسم الكامل
                          </label>
                          <input
                            type="text"
                            value={registerName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterName(e.target.value)}
                            placeholder="أدخل اسمك الكامل..."
                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                          />
                        </div>

                        {/* Phone Field */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">
                            رقم الهاتف
                          </label>
                          <input
                            type="tel"
                            value={registerPhone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterPhone(e.target.value)}
                            placeholder="07XXXXXXXX"
                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                          />
                        </div>

                        {/* Password Field */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">
                            كلمة المرور
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={registerPassword}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                              placeholder="6 أحرف على الأقل..."
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Generation and City in Row */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Generation */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-2">
                              الجيل
                            </label>
                            <select
                              value={registerGeneration}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegisterGeneration(e.target.value as '2008' | '2009')}
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                            >
                              <option value="2008">2008</option>
                              <option value="2009">2009</option>
                            </select>
                          </div>

                          {/* City */}
                          <div>
                            <label className="block text-xs text-gray-500 mb-2">
                              المدينة
                            </label>
                            <select
                              value={registerCity}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegisterCity(e.target.value)}
                              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                            >
                              <option value="">اختر المدينة</option>
                              {jordanianCities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Error Message */}
                        {registerError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                          >
                            {registerError}
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
                        >
                          <span>إنشاء الحساب</span>
                          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>

                        {/* Switch to Login */}
                        <p className="text-center text-gray-600 text-sm">
                          لديك حساب بالفعل؟{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setIsLogin(true);
                              setRegisterError('');
                            }}
                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                          >
                            سجل دخولك
                          </button>
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Image Section - على اليسار في RTL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center order-1 md:order-2"
            >
              <div className="relative w-96 h-96">
                {/* Circular Image */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-4">
                  <img
                    src={studentImage}
                    alt="Student Illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Simple Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full opacity-80"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}