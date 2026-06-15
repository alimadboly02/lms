import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, User, MapPin, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AppBar } from './AppBar';
import { Footer } from './Footer';
import { PageHeader } from './PageHeader';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onHomeClick?: () => void;
}

// مدن الأردن
const jordanCities = [
  'عمان',
  'إربد',
  'الزرقاء',
  'العقبة',
  'المفرق',
  'الكرك',
  'معان',
  'الطفيلة',
  'جرش',
  'عجلون',
  'مادبا',
  'السلط'
];

export function LoginPage({ onLoginSuccess, onHomeClick }: LoginPageProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // حقول تسجيل الدخول
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // حقول إنشاء حساب
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerGeneration, setRegisterGeneration] = useState<'2008' | '2009'>('2008');
  const [registerCity, setRegisterCity] = useState('عمان');

  // رسائل الخطأ
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginPhone || !loginPassword) {
      setError('يرجى إدخال جميع الحقول');
      return;
    }

    const result = login(loginPhone, loginPassword);
    if (result) {
      setSuccess('تم تسجيل الدخول بنجاح!');
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } else {
      setError('رقم الهاتف أو كلمة المرور غير صحيحة');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!registerName || !registerPhone || !registerPassword || !registerGeneration || !registerCity) {
      setError('يرجى إدخال جميع الحقول');
      return;
    }

    // التحقق من صحة رقم الهاتف
    if (!/^07\d{8}$/.test(registerPhone)) {
      setError('يرجى إدخال رقم هاتف أردني صحيح (يبدأ بـ 07 ويتكون من 10 أرقام)');
      return;
    }

    // التحقق من طول كلمة المرور
    if (registerPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    const result = register(registerName, registerPhone, registerPassword, registerGeneration, registerCity);
    if (result) {
      setSuccess('تم إنشاء الحساب بنجاح!');
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } else {
      setError('رقم الهاتف مسجل مسبقاً');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <AppBar onHomeClick={onHomeClick} />
      
      {/* Page Header with Animations */}
      <PageHeader 
        title={isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"} 
        showBreadcrumb={false}
      />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-[5px] shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-4 text-center font-bold transition-all relative ${
                  isLogin
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                تسجيل الدخول
                {isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"
                  />
                )}
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-4 text-center font-bold transition-all relative ${
                  !isLogin
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                إنشاء حساب
                {!isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"
                  />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'مرحباً بعودتك!' : 'انضم إلينا الآن'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isLogin
                    ? 'سجل دخولك للوصول إلى المحتوى التعليمي'
                    : 'أنشئ حساباً جديداً للبدء في التعلم'}
                </p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[5px] text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-[5px] text-emerald-700 text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Login Form */}
              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLoginPhone(e.target.value)}
                        placeholder="07XXXXXXXX"
                        className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pr-11 pl-11 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 text-white font-bold rounded-[5px] hover:bg-emerald-600 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-12 h-12 border border-white/15 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
                    </div>
                    <span className="relative z-10">تسجيل الدخول</span>
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setRegisterName(e.target.value)}
                        placeholder="أدخل اسمك الكامل"
                        className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={registerPhone}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setRegisterPhone(e.target.value)}
                        placeholder="07XXXXXXXX"
                        className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={registerPassword}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                        placeholder="6 أحرف على الأقل"
                        className="w-full pr-11 pl-11 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Generation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الجيل
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={registerGeneration}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setRegisterGeneration(e.target.value as '2008' | '2009')}
                        className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="2008">جيل 2008</option>
                        <option value="2009">جيل 2009</option>
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      المدينة
                    </label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={registerCity}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setRegisterCity(e.target.value)}
                        className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                      >
                        {jordanCities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 text-white font-bold rounded-[5px] hover:bg-emerald-600 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-12 h-12 border border-white/15 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
                    </div>
                    <span className="relative z-10">إنشاء حساب</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 text-sm mt-6">
            بإنشاء حساب، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}