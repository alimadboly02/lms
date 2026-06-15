import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, LogOut, ChevronDown, Home, BookOpen, Star, Trophy, MessageSquare, PenLine, Headset } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from "figma:asset/9fb5bb008cfa075620dedaf2d6ee1171c8069760.png";

interface TopAppBarProps {
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
  onLoginClick?: () => void;
  onHomeClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
  onAddReviewClick?: () => void;
  onSupportClick?: () => void;
}

export function TopAppBar({ 
  onProfileClick, 
  onChangePasswordClick, 
  onLoginClick,
  onHomeClick,
  onCategoryClick,
  onAddReviewClick,
  onSupportClick
}: TopAppBarProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: '2008', name: 'جيل 2008', color: 'emerald' },
    { id: '2009', name: 'جيل 2009', color: 'blue' }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategoriesMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileIconClick = () => {
    if (!isAuthenticated) {
      // إذا غير مسجل، اذهب لصفحة تسجيل الدخول
      if (onLoginClick) {
        onLoginClick();
      }
    } else {
      // إذا مسجل، افتح القائمة
      setShowMenu(!showMenu);
    }
  };

  const handleMenuItemClick = (action: () => void) => {
    setShowMenu(false);
    action();
  };

  const handleCategoryClick = (categoryId: string) => {
    setShowCategoriesMenu(false);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - على اليمين في RTL */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Logo Image */}
              <div className="w-12 h-12 rounded-md overflow-hidden shadow-lg flex items-center justify-center bg-white">
                <img 
                  src={logoImage} 
                  alt="Dr. Khaled Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text */}
              <div>
                <h1 className="text-lg font-bold text-gray-900 italic">
                  الدكتور خالد الدعجة
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  كل ما يحتاجه طالب التوجيهي باللغة الإنجليزية
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              {/* Home Button */}
              <button
                onClick={onHomeClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-semibold"
              >
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </button>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-semibold"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>الأقسام</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Categories Dropdown Menu */}
                <AnimatePresence>
                  {showCategoriesMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-[5px] shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      <div className="py-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="w-full px-4 py-3 hover:bg-emerald-50 transition-colors text-right group"
                          >
                            <p className="font-bold text-gray-800 text-sm">{category.name}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Share Review Button */}
              <button
                onClick={onAddReviewClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-semibold"
              >
                <PenLine className="w-4 h-4" />
                <span>شارك تجربتك</span>
              </button>

              {/* Support Button */}
              <button
                onClick={onSupportClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-semibold"
              >
                <Headset className="w-4 h-4" />
                <span>الدعم الفني</span>
              </button>
            </nav>
          </div>

          {/* Profile Icon - على اليسار في RTL */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleProfileIconClick}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-500 flex items-center justify-center transition-all group"
            >
              <User className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
            </button>

            {/* Dropdown Menu - يظهر فقط للمستخدمين المسجلين */}
            <AnimatePresence>
              {showMenu && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-[15px] shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {/* User Info Header */}
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/40">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-base text-white">{user?.name}</p>
                        <p className="text-xs text-white/90 mt-0.5">{user?.phone}</p>
                      </div>
                    </div>
                    
                    {/* Points & Rank */}
                    <div className="flex items-center gap-2">
                      {/* Points */}
                      <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-400/30 flex items-center justify-center">
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/80 leading-tight">النقاط</p>
                          <p className="text-sm font-bold text-white leading-tight">{user?.points.toLocaleString('ar-JO')}</p>
                        </div>
                      </div>

                      {/* Rank */}
                      <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-400/30 flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/80 leading-tight">الترتيب</p>
                          <p className="text-sm font-bold text-white leading-tight">#{user?.rank}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1.5">
                    {/* معلومات الحساب */}
                    <button
                      onClick={() => onProfileClick && handleMenuItemClick(onProfileClick)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50/70 transition-all text-right group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100 flex items-center justify-center transition-all shadow-sm">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">معلومات الحساب</p>
                        <p className="text-xs text-gray-500">عرض وتعديل بياناتك</p>
                      </div>
                    </button>

                    {/* تغيير كلمة المرور */}
                    <button
                      onClick={() => onChangePasswordClick && handleMenuItemClick(onChangePasswordClick)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50/70 transition-all text-right group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 flex items-center justify-center transition-all shadow-sm">
                        <Lock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">تغيير كلمة المرور</p>
                        <p className="text-xs text-gray-500">تحديث كلمة المرور</p>
                      </div>
                    </button>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-1.5 mx-4"></div>

                    {/* تسجيل الخروج */}
                    <button
                      onClick={() => handleMenuItemClick(() => {
                        logout();
                        if (onHomeClick) onHomeClick();
                      })}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50/70 transition-all text-right group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-50 group-hover:from-red-200 group-hover:to-red-100 flex items-center justify-center transition-all shadow-sm">
                        <LogOut className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">تسجيل الخروج</p>
                        <p className="text-xs text-gray-500">الخروج من الحساب</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tooltip for non-authenticated users */}
            {!isAuthenticated && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-[5px] whitespace-nowrap">
                  تسجيل الدخول
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}